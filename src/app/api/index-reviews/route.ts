import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import Papa from 'papaparse';
import { supabase } from '@/lib/supabase';
import { getPineconeIndex } from '@/lib/pinecone';

export async function POST(req: NextRequest) {
    let step = 'start';
    try {
        const csvPath = path.join(process.cwd(), 'samples', 'review.csv');
        step = 'check csv file';
        if (!fs.existsSync(csvPath)) {
            throw new Error(`CSV 파일이 존재하지 않습니다: ${csvPath}`);
        }

        step = 'read csv';
        const csvFile = fs.readFileSync(csvPath, 'utf8');

        step = 'parse csv';
        const results = Papa.parse(csvFile, {
            header: true,
            dynamicTyping: true,
            skipEmptyLines: true,
        });

        const reviews = results.data || [];
        console.log(`[Index API] Parsed ${reviews.length} reviews from CSV.`);

        if (!Array.isArray(reviews) || reviews.length === 0) {
            return NextResponse.json({ success: true, message: '인덱싱할 데이터가 없습니다.' });
        }

        step = 'sync with supabase';
        const mappedForSupabase = reviews.map((r: any) => ({
            id: r.id,
            rating: r.rating || 5,
            title: r.title || '',
            content: r.content || '',
            author: r.author || '익명',
            date: r.date || new Date().toISOString().split('T')[0],
            helpful_votes: r.helpful_votes || 0,
            verified_purchase: String(r.verified_purchase).toLowerCase() === 'true'
        }));

        const { error: supabaseError } = await supabase.from('reviews').upsert(mappedForSupabase);
        if (supabaseError) throw new Error(`Supabase 에러: ${supabaseError.message}`);

        step = 'verify pinecone index';
        const index = getPineconeIndex();

        step = 'prepare pinecone records';
        const pineconeRecords = reviews.map((r: any) => {
            const text = `${r.title || ''}\n${r.content || ''}`.trim();
            if (!text) return null;

            return {
                id: `review_${r.id}`,
                text: text,
                review_id: r.id,
                rating: r.rating,
                author: r.author,
                date: r.date,
                verified_purchase: String(r.verified_purchase).toLowerCase() === 'true'
            };
        }).filter(Boolean);

        if (pineconeRecords.length === 0) {
            throw new Error('Pinecone에 업로드할 유효한 본문 내용이 없습니다.');
        }

        step = 'upsert to pinecone with batching';
        console.log(`[Index API] Upserting ${pineconeRecords.length} records with batching...`);

        // Pinecone Integrated Inference has a batch limit (usually around 96 records)
        const batchSize = 50;
        for (let i = 0; i < pineconeRecords.length; i += batchSize) {
            const batch = pineconeRecords.slice(i, i + batchSize);
            console.log(`[Index API] Sending batch ${Math.floor(i / batchSize) + 1} (${batch.length} records)...`);
            await index.upsertRecords({
                records: batch as any
            });
        }

        // Wait a brief moment for final sync
        await new Promise(resolve => setTimeout(resolve, 1000));
        const finalStats = await index.describeIndexStats();
        console.log('[Index API] Final Stats:', JSON.stringify(finalStats, null, 2));

        return NextResponse.json({
            success: true,
            message: `${pineconeRecords.length}개의 리뷰가 성공적으로 인덱싱되었습니다. (전체 데이터: ${finalStats.totalRecordCount}개)`
        });
    } catch (error: any) {
        console.error(`Error at step [${step}]:`, error);
        const errorMsg = error.message || JSON.stringify(error);
        return NextResponse.json({
            success: false,
            error: `[단계: ${step}] ${errorMsg}`
        }, { status: 500 });
    }
}
