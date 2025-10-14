import prisma from '../prisma.js';
import { subDays } from 'date-fns';

export async function seedCheckins() {
  const users = await prisma.user.findMany();

  const checkinPatterns = [
    [
      { days: 0, mood: 'Termotivasi', isSuccessful: true },
      { days: 1, mood: 'Fokus', isSuccessful: true },
      { days: 2, mood: 'Tenang', isSuccessful: true },
      { days: 3, mood: 'Sedikit Cemas', isSuccessful: true },
      { days: 4, mood: 'Bahagia', isSuccessful: true },
      { days: 5, mood: 'Lelah', isSuccessful: false },
      { days: 6, mood: 'Termotivasi', isSuccessful: true },
      { days: 7, mood: 'Fokus', isSuccessful: true },
      { days: 8, mood: 'Tenang', isSuccessful: true },
      { days: 9, mood: 'Cemas', isSuccessful: false },
      { days: 10, mood: 'Bingung', isSuccessful: false },
      { days: 11, mood: 'Termotivasi', isSuccessful: true },
      { days: 12, mood: 'Bahagia', isSuccessful: true },
      { days: 13, mood: 'Fokus', isSuccessful: true },
    ],
    [
      { days: 0, mood: 'Segar', isSuccessful: true },
      { days: 1, mood: 'Bahagia', isSuccessful: true },
      { days: 2, mood: 'Tenang', isSuccessful: true },
      { days: 3, mood: 'Termotivasi', isSuccessful: true },
      { days: 4, mood: 'Fokus', isSuccessful: true },
      { days: 5, mood: 'Segar', isSuccessful: true },
      { days: 6, mood: 'Bahagia', isSuccessful: true },
      { days: 7, mood: 'Tenang', isSuccessful: true },
      { days: 8, mood: 'Termotivasi', isSuccessful: true },
      { days: 9, mood: 'Fokus', isSuccessful: true },
      { days: 10, mood: 'Segar', isSuccessful: true },
      { days: 11, mood: 'Bahagia', isSuccessful: true },
      { days: 12, mood: 'Termotivasi', isSuccessful: true },
      { days: 13, mood: 'Fokus', isSuccessful: true },
    ],
    [
      { days: 0, mood: 'Termotivasi', isSuccessful: true },
      { days: 1, mood: 'Fokus', isSuccessful: true },
      { days: 2, mood: 'Cemas', isSuccessful: false },
      { days: 3, mood: 'Sedih', isSuccessful: false },
      { days: 4, mood: 'Termotivasi', isSuccessful: true },
      { days: 5, mood: 'Bahagia', isSuccessful: true },
      { days: 6, mood: 'Tenang', isSuccessful: true },
      { days: 7, mood: 'Fokus', isSuccessful: true },
      { days: 8, mood: 'Termotivasi', isSuccessful: true },
      { days: 9, mood: 'Cemas', isSuccessful: false },
      { days: 10, mood: 'Termotivasi', isSuccessful: true },
      { days: 11, mood: 'Bahagia', isSuccessful: true },
      { days: 12, mood: 'Fokus', isSuccessful: true },
      { days: 13, mood: 'Tenang', isSuccessful: true },
    ],
    [
      { days: 0, mood: 'Termotivasi', isSuccessful: true },
      { days: 1, mood: 'Cemas', isSuccessful: true },
      { days: 2, mood: 'Frustasi', isSuccessful: false },
      { days: 3, mood: 'Termotivasi', isSuccessful: true },
      { days: 4, mood: 'Fokus', isSuccessful: true },
      { days: 5, mood: 'Gelisah', isSuccessful: true },
      { days: 6, mood: 'Termotivasi', isSuccessful: true },
      { days: 7, mood: 'Cemas', isSuccessful: false },
      { days: 8, mood: 'Fokus', isSuccessful: true },
      { days: 9, mood: 'Termotivasi', isSuccessful: true },
      { days: 10, mood: 'Tenang', isSuccessful: true },
      { days: 11, mood: 'Bahagia', isSuccessful: true },
      { days: 12, mood: 'Fokus', isSuccessful: true },
      { days: 13, mood: 'Termotivasi', isSuccessful: true },
    ],
    [
      { days: 0, mood: 'Segar', isSuccessful: true },
      { days: 1, mood: 'Bahagia', isSuccessful: true },
      { days: 2, mood: 'Tenang', isSuccessful: true },
      { days: 3, mood: 'Fokus', isSuccessful: true },
      { days: 4, mood: 'Lelah', isSuccessful: true },
      { days: 5, mood: 'Termotivasi', isSuccessful: true },
      { days: 6, mood: 'Bahagia', isSuccessful: true },
      { days: 7, mood: 'Tenang', isSuccessful: true },
      { days: 8, mood: 'Fokus', isSuccessful: true },
      { days: 9, mood: 'Segar', isSuccessful: true },
      { days: 10, mood: 'Termotivasi', isSuccessful: true },
      { days: 11, mood: 'Bahagia', isSuccessful: true },
      { days: 12, mood: 'Tenang', isSuccessful: true },
      { days: 13, mood: 'Fokus', isSuccessful: true },
    ],
    [
      { days: 0, mood: 'Termotivasi', isSuccessful: true },
      { days: 1, mood: 'Fokus', isSuccessful: true },
      { days: 2, mood: 'Gelisah', isSuccessful: false },
      { days: 3, mood: 'Frustasi', isSuccessful: false },
      { days: 4, mood: 'Cemas', isSuccessful: false },
      { days: 5, mood: 'Termotivasi', isSuccessful: true },
      { days: 6, mood: 'Fokus', isSuccessful: true },
      { days: 7, mood: 'Bahagia', isSuccessful: true },
      { days: 8, mood: 'Tenang', isSuccessful: true },
      { days: 9, mood: 'Termotivasi', isSuccessful: true },
      { days: 10, mood: 'Gelisah', isSuccessful: false },
      { days: 11, mood: 'Fokus', isSuccessful: true },
      { days: 12, mood: 'Termotivasi', isSuccessful: true },
      { days: 13, mood: 'Bahagia', isSuccessful: true },
    ],
  ];

  for (let i = 0; i < users.length && i < checkinPatterns.length; i++) {
    const user = users[i];
    const pattern = checkinPatterns[i];
    if (user && pattern) {
      for (const checkin of pattern) {
        await prisma.checkin.create({
          data: {
            checkinDate: subDays(new Date(), checkin.days),
            mood: checkin.mood,
            isSuccessful: checkin.isSuccessful,
            userId: user.id,
          },
        });
      }
    }
  }

  console.log(`[database]: Seeded checkins for ${users.length} users`);
}
