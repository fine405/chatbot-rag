import { embedMany } from 'ai'
import { openai } from '@ai-sdk/openai'

const embeddingModel = openai.embedding('text-embedding-ada-002')

const generateChunks = (input: string): string[] => {
    return input.trim().split('.').filter(i => i !== '');
}

export const generateEmbeddings = async (value: string): Promise<Array<{embeddings: number[], content: string}>> => {
    const chunks = generateChunks(value);
    const { embeddings } = await embedMany({
        model: embeddingModel,
        values: chunks,
    });

    return embeddings.map((embedding, index) => ({
        embeddings: embedding,
        content: chunks[index]
    }));
}