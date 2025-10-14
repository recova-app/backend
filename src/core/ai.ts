import { GoogleGenerativeAI } from '@google/generative-ai';
import config from '../config/index.js';

const genAI = new GoogleGenerativeAI(config.gemini.apiKey);
const model = genAI.getGenerativeModel({ model: config.gemini.model });

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

export async function generateJsonContent(prompt: string): Promise<object> {
  const result = await model.generateContent(prompt);
  const rawResponse = result.response.text();

  try {
    const jsonString = rawResponse
      .replace(/```json/g, '')
      .replace(/```/g, '')
      .trim();
    const parsedJson = JSON.parse(jsonString);
    return parsedJson;
  } catch (error) {
    throw new Error('AI returned an invalid JSON format');
  }
}
