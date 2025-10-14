import prisma from '../prisma.js';
import { subDays } from 'date-fns';

export async function seedStreaks() {
  const users = await prisma.user.findMany();

  const streakData = [
    [
      { startDate: subDays(new Date(), 45), endDate: subDays(new Date(), 15), isActive: false },
      { startDate: subDays(new Date(), 14), endDate: null, isActive: true },
    ],
    [{ startDate: subDays(new Date(), 21), endDate: null, isActive: true }],
    [
      { startDate: subDays(new Date(), 60), endDate: subDays(new Date(), 22), isActive: false },
      { startDate: subDays(new Date(), 21), endDate: null, isActive: true },
    ],
    [
      { startDate: subDays(new Date(), 90), endDate: subDays(new Date(), 75), isActive: false },
      { startDate: subDays(new Date(), 50), endDate: subDays(new Date(), 15), isActive: false },
      { startDate: subDays(new Date(), 14), endDate: null, isActive: true },
    ],
    [{ startDate: subDays(new Date(), 28), endDate: null, isActive: true }],
    [
      { startDate: subDays(new Date(), 35), endDate: subDays(new Date(), 8), isActive: false },
      { startDate: subDays(new Date(), 7), endDate: null, isActive: true },
    ],
  ];

  for (let i = 0; i < users.length && i < streakData.length; i++) {
    const user = users[i];
    const userStreaks = streakData[i];
    if (user && userStreaks) {
      for (const streak of userStreaks) {
        await prisma.streak.create({
          data: {
            startDate: streak.startDate,
            endDate: streak.endDate,
            isActive: streak.isActive,
            userId: user.id,
          },
        });
      }
    }
  }

  console.log(`[database]: Seeded streaks for ${users.length} users`);
}
