import prisma from '../../database/prisma.js';

export async function getDailyContent() {
  const motivationCount = await prisma.dailyMotivation.count();
  const randomMotivationSkip = Math.floor(Math.random() * motivationCount);
  const randomMotivation = await prisma.dailyMotivation.findFirst({
    skip: randomMotivationSkip,
  });

  const challengeCount = await prisma.dailyChallenge.count();
  const randomChallengeSkip = Math.floor(Math.random() * challengeCount);
  const randomChallenge = await prisma.dailyChallenge.findFirst({
    skip: randomChallengeSkip,
  });

  return {
    motivation: randomMotivation?.content || 'Keep moving forward, no matter how small the step.',
    challenge: randomChallenge?.content || 'Write one thing you are grateful for today.',
  };
}
