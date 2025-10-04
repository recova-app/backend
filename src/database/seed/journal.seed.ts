import prisma from '../prisma.js';
import { faker } from '@faker-js/faker';

export async function seedJournals() {
  const checkins = await prisma.checkin.findMany();

  for (const checkin of checkins) {
    await prisma.journal.create({
      data: {
        content: faker.lorem.paragraph(),
        userId: checkin.userId,
        checkinId: checkin.id,
      },
    });
  }

  console.log(`[database]: Seeded ${checkins.length} journals`);
}
