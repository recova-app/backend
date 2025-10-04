import prisma from '../prisma.js';
import { faker } from '@faker-js/faker';
import { subDays } from 'date-fns';

export async function seedStreaks() {
  const users = await prisma.user.findMany();

  for (const user of users) {
    const totalStreaks = faker.number.int({ min: 1, max: 3 });

    for (let i = 0; i < totalStreaks; i++) {
      const start = subDays(new Date(), faker.number.int({ min: 10, max: 30 }));
      await prisma.streak.create({
        data: {
          startDate: start,
          endDate: faker.datatype.boolean()
            ? subDays(new Date(), faker.number.int({ min: 1, max: 5 }))
            : null,
          isActive: faker.datatype.boolean(),
          userId: user.id,
        },
      });
    }
  }

  console.log(`[database]: Seeded streaks for ${users.length} users`);
}
