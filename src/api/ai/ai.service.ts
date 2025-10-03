import { GoogleGenerativeAI } from '@google/generative-ai';
import { generateCoachSystemPrompt } from './ai.prompts.js';
import prisma from '../../database/prisma.js';
import config from '../../config/index.js';

const genAI = new GoogleGenerativeAI(config.gemini.apiKey);
const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

export async function getCoachResponse(userId: string, userMessage: string): Promise<string> {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  if (!user) {
    throw new Error('User not found');
  }

  const activeStreak = await prisma.streak.findFirst({
    where: {
      userId,
      isActive: true,
    },
  });
  const streakDays = activeStreak
    ? Math.floor((new Date().getTime() - activeStreak.startDate.getTime()) / (1000 * 3600 * 24))
    : 0;

  const systemPrompt = generateCoachSystemPrompt({
    nickname: user.nickname,
    streakDays: streakDays,
    userWhy: user.userWhy,
  });

  const chat = model.startChat({
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
            text: `Tentu, aku siap mendengarkan ${user.nickname}. Apa yang sedang kamu rasakan?`,
          },
        ],
      },
    ],
  });

  const result = await chat.sendMessage(userMessage);
  const response = result.response;

  return response.text();
}
