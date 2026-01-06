import OpenAI from 'openai';
import config from '../config/index.js';

const openai = new OpenAI({
  apiKey: config.openai.apiKey,
  baseURL: config.openai.baseUrl,
});

interface ChatHistoryMessage {
  role: 'user' | 'model';
  parts: Array<{ text: string }>;
}

interface CoachChatResponse {
  response: {
    text: () => string;
  };
}

interface CoachChat {
  sendMessage: (userMessage: string) => Promise<CoachChatResponse>;
}

export function startCoachChat(
  systemPrompt: string,
  nickname: string,
  chatHistory: ChatHistoryMessage[] = []
): CoachChat {
  const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [
    {
      role: 'system',
      content: systemPrompt,
    },
    {
      role: 'assistant',
      content: `Tentu, aku siap mendengarkan ${nickname}. Apa yang sedang kamu rasakan?`,
    },
    ...chatHistory.map(
      (message): OpenAI.Chat.ChatCompletionMessageParam => ({
        role: message.role === 'model' ? 'assistant' : 'user',
        content: message.parts[0]?.text || '',
      })
    ),
  ];

  return {
    sendMessage: async (userMessage: string): Promise<CoachChatResponse> => {
      messages.push({ role: 'user', content: userMessage });

      const response = await openai.chat.completions.create({
        model: config.openai.model,
        messages: messages,
      });

      const aiText = response.choices[0]?.message?.content || '';

      return {
        response: {
          text: (): string => aiText,
        },
      };
    },
  };
}

export async function generateContent(prompt: string): Promise<string> {
  const response = await openai.chat.completions.create({
    model: config.openai.model,
    messages: [{ role: 'user', content: prompt }],
  });

  return response.choices[0]?.message?.content || '';
}

export async function generateJsonContent(prompt: string): Promise<object> {
  const response = await openai.chat.completions.create({
    model: config.openai.model,
    messages: [{ role: 'user', content: prompt }],
    response_format: { type: 'json_object' },
  });

  const rawResponse = response.choices[0]?.message?.content || '{}';

  try {
    return JSON.parse(rawResponse);
  } catch (error) {
    throw new Error('AI mengembalikan format JSON yang tidak valid.');
  }
}
