import { GoogleGenerativeAI } from '@google/generative-ai';
import config from '../config/index.js';

const genAI = new GoogleGenerativeAI(config.gemini.apiKey);
const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

export function startCoachChat(systemPrompt: string, nickname: string) {
  return model.startChat({
    history: [
      {
        role: 'user',
        parts: [
          {
            text: systemPrompt,
          },
        ],
      },
      {
        role: 'model',
        parts: [
          {
            text: `Tentu, aku siap mendengarkan ${nickname}. Apa yang sedang kamu rasakan?`,
          },
        ],
      },
    ],
  });
}

export async function generateContent(prompt: string): Promise<string> {
  const result = await model.generateContent(prompt);
  const response = result.response;

  return response.text();
}
