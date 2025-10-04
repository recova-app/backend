import prisma from '../prisma.js';
import { faker } from '@faker-js/faker';
import { subDays } from 'date-fns';

export async function seedCheckins() {
  const users = await prisma.user.findMany();

  for (const user of users) {
    const days = Array.from({ length: 10 }).map((_, i) => subDays(new Date(), i));
    for (const day of days) {
      await prisma.checkin.create({
        data: {
          checkinDate: day,
          mood: faker.helpers.arrayElement(['Happy', 'Sad', 'Relaxed', 'Anxious', 'Motivated']),
          isSuccessful: faker.helpers.arrayElement([true, false]),
          userId: user.id,
        },
      });
    }
  }

  console.log(`[database]: Seeded checkins for ${users.length} users`);
}
