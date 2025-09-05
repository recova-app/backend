import prisma from '../../database/prisma.js';

export async function processDailyCheckin(userId: string, mood: string, isSuccessful: boolean) {
  return prisma.$transaction(async tx => {
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const existingCheckin = await tx.checkin.findFirst({
        where: {
          userId,
          createdAt: {
            gte: today,
          },
        },
      });
      if (existingCheckin) {
        throw new Error('User has already checked in today');
      }

      const activeStreak = await tx.streak.findFirst({
        where: {
          userId,
          isActive: true,
        },
      });

      if (isSuccessful) {
        if (!activeStreak) {
          await tx.streak.create({
            data: {
              userId,
              startDate: new Date(),
            },
          });
        }
      } else {
        if (activeStreak) {
          await tx.streak.update({
            where: {
              id: activeStreak.id,
            },
            data: {
              endDate: new Date(),
              isActive: false,
            },
          });
        }
      }

      await tx.checkin.create({
        data: {
          userId,
          checkinDate: new Date(),
          mood,
          isSuccessful,
        },
      });

      const latestStreak = await tx.streak.findFirst({
        where: {
          userId,
        },
        orderBy: {
          startDate: 'desc',
        },
      });

      return latestStreak;
    } catch (error) {
      console.error('Error processing daily check-in:', error);
      throw new Error('Failed to process daily check-in');
    }
  });
}
