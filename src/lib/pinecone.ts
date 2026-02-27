import { Pinecone } from '@pinecone-database/pinecone';

// Initialize Pinecone client
export const pinecone = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY!,
});

/**
 * Access the configured Pinecone index.
 * Version 7.1.0 supports integrated inference (upsertRecords/search).
 */
export function getPineconeIndex() {
    const indexName = process.env.PINECONE_INDEX_NAME || 'review-chatbot';
    return pinecone.index(indexName);
}
