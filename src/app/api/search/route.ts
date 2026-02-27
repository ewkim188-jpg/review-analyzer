import { NextRequest, NextResponse } from 'next/server';
import { getPineconeIndex } from '@/lib/pinecone';

export async function POST(req: NextRequest) {
    try {
        const { query } = await req.json();

        if (!query) {
            return NextResponse.json({ error: '질문(query)이 필요합니다.' }, { status: 400 });
        }

        console.log(`[Search API] Searching for: "${query}" using searchRecords (v7.1.0)...`);

        const index = getPineconeIndex();

        // v7.1.0 integrated inference search method: searchRecords
        const searchResponse = await (index as any).searchRecords({
            query: {
                inputs: { text: query },
                topK: 3
            },
            fields: ['text', 'author', 'date', 'rating', 'verified_purchase'],
        });

        console.log('[Search API] Search Response:', JSON.stringify(searchResponse, null, 2));

        const hits = searchResponse.result?.hits || [];
        console.log(`[Search API] Found ${hits.length} hits.`);

        const formattedResults = hits.map((hit: any) => ({
            content: hit.fields?.text || '',
            metadata: {
                author: hit.fields?.author,
                date: hit.fields?.date,
                rating: hit.fields?.rating,
                verified_purchase: hit.fields?.verified_purchase,
                score: hit._score // v7 uses _score
            }
        }));

        return NextResponse.json({
            success: true,
            results: formattedResults
        });
    } catch (error: any) {
        console.error('Search Error:', error);
        return NextResponse.json({ success: false, error: error.message || JSON.stringify(error) }, { status: 500 });
    }
}
