import { NextRequest, NextResponse } from 'next/server';
import { getPineconeIndex } from '@/lib/pinecone';
import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";

export async function POST(req: NextRequest) {
    try {
        const { query } = await req.json();

        if (!query) {
            return NextResponse.json({ error: '질문(query)이 필요합니다.' }, { status: 400 });
        }

        // Safety check for API key
        if (!process.env.OPENAI_API_KEY) {
            console.error('[Chat API] OPENAI_API_KEY is missing in process.env');
            return NextResponse.json({
                error: 'OPENAI_API_KEY가 설정되지 않았습니다. .env 파일을 확인하고 서버를 재시작해 주세요.'
            }, { status: 500 });
        }

        console.log(`[Chat API] Processing query: "${query}"`);

        // Initialize model inside handler to ensure env is fresh
        const chatModel = new ChatOpenAI({
            model: "gpt-5-nano",
            apiKey: process.env.OPENAI_API_KEY,
        });

        // 1. Search Pinecone for context
        const index = getPineconeIndex();
        const searchResponse = await (index as any).searchRecords({
            query: {
                inputs: { text: query },
                topK: 10
            },
            fields: ['text', 'author', 'date', 'rating', 'verified_purchase'],
        });

        const hits = searchResponse.result?.hits || [];
        const context = hits.map((hit: any) => hit.fields?.text).filter(Boolean).join('\n\n---\n\n');

        console.log(`[Chat API] Found ${hits.length} relevant reviews for context.`);

        // 2. Generate response using OpenAI
        const systemPrompt = `당신은 쇼핑 리뷰 분석 전문가입니다. 
제공된 [리뷰 데이터]를 기반으로 사용자의 질문에 답변하세요. 

[지침]
1. 반드시 제공된 리뷰 데이터의 내용만을 근거로 답변하세요.
2. 리뷰에 없는 내용은 "관련 리뷰를 찾을 수 없습니다"라고 답변하세요.
3. 친절하고 신뢰감 있는 말투를 사용하세요.
4. 가능한 구체적인 리뷰 사례(평점, 착용감 등)를 언급하며 설명하세요.

[리뷰 데이터]
${context || '관련 리뷰가 없습니다.'}`;

        const response = await chatModel.invoke([
            new SystemMessage(systemPrompt),
            new HumanMessage(query),
        ]);

        // 3. Format results for frontend
        const formattedReferences = hits.map((hit: any) => ({
            content: hit.fields?.text || '',
            metadata: {
                author: hit.fields?.author,
                date: hit.fields?.date,
                rating: hit.fields?.rating,
                verified_purchase: hit.fields?.verified_purchase,
            }
        }));

        return NextResponse.json({
            success: true,
            answer: response.content,
            results: formattedReferences
        });
    } catch (error: any) {
        console.error('Chat API Error:', error);
        return NextResponse.json({
            success: false,
            error: error.message || '알 수 없는 오류가 발생했습니다.'
        }, { status: 500 });
    }
}
