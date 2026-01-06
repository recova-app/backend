import { generateCoachSystemPrompt, generateOnboardingAnalysisPrompt } from './ai.prompts.js';
import prisma from '../../database/prisma.js';
import { generateJsonContent, startCoachChat } from '../../core/ai.js';

export async function getCoachResponse(userId: string, userMessage: string): Promise<string> {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  if (!user) {
    throw new Error('Pengguna tidak ditemukan');
  }

  const activeStreak = await prisma.streak.findFirst({
    where: {
      userId,
      isActive: true,
    },
  });

  const streakDays = activeStreak
    ? Math.floor((new Date().getTime() - activeStreak.startDate.getTime()) / (1000 * 3600 * 24)) + 1
    : 0;

  const systemPrompt = generateCoachSystemPrompt({
    nickname: user.nickname,
    streakDays: streakDays,
    userWhy: user.userWhy,
  });

  const dbHistory = await prisma.aiChatHistory.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: 10,
  });

  const formattedHistory = dbHistory.reverse().map(msg => ({
    role: msg.role as 'user' | 'model',
    parts: [{ text: msg.content }],
  }));

  // Start a chat session with the AI coach
  const chat = startCoachChat(systemPrompt, user.nickname, formattedHistory);

  const result = await chat.sendMessage(userMessage);
  const aiResponseText = result.response.text();

  await Promise.all([
    prisma.aiChatHistory.create({
      data: {
        userId,
        role: 'user',
        content: userMessage,
      },
    }),
    prisma.aiChatHistory.create({
      data: {
        userId,
        role: 'model',
        content: aiResponseText,
      },
    }),
  ]);

  return aiResponseText;
}

export async function findAllChatHistory(userId: string) {
  const history = await prisma.aiChatHistory.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: 'asc',
    },
  });

  return history;
}

export async function getLatestSummary(userId: string): Promise<string> {
  const userProfile = await prisma.userProfile.findUnique({
    where: {
      userId,
    },
    select: {
      aiSummary: true,
    },
  });

  if (!userProfile || !userProfile.aiSummary) {
    return 'Insight baru untukmu akan segera tersedia. Teruslah menulis jurnal harianmu!';
  }

  return userProfile.aiSummary;
}

export async function analyzeOnboardingAnswers(answers: Record<string, any>): Promise<object> {
  const prompt = generateOnboardingAnalysisPrompt(answers);
  const response = await generateJsonContent(prompt);

  return response;
}
