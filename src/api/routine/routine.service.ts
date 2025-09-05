import { differenceInDays } from 'date-fns';
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

export async function getUserStatistics(userId: string) {
  try {
    const allStreaks = await prisma.streak.findMany({
      where: {
        userId,
      },
      orderBy: {
        startDate: 'desc',
      },
    });

    const successfulCheckins = await prisma.checkin.findMany({
      where: {
        userId,
        isSuccessful: true,
      },
      select: {
        checkinDate: true,
      },
    });

    let currentStreakDays = 0;
    let longestStreakDays = 0;

    const activeStreak = allStreaks.find(s => s.isActive);
    if (activeStreak) {
      currentStreakDays = differenceInDays(new Date(), activeStreak.startDate) + 1;
    }

    allStreaks.forEach(streak => {
      const endDate = streak.endDate || new Date();
      const duration = differenceInDays(endDate, streak.startDate) + 1;
      if (duration > longestStreakDays) {
        longestStreakDays = duration;
      }
    });

    const streakCalendarDates = successfulCheckins.map(
      c => c.checkinDate.toISOString().split('T')[0]
    );

    return {
      currentStreak: currentStreakDays,
      longestStreak: longestStreakDays,
      totalCheckins: successfulCheckins.length,
      streakCalendar: streakCalendarDates,
    };
  } catch (error) {
    console.error('Error retrieving user statistics:', error);
    throw new Error('Failed to retrieve user statistics');
  }
}
