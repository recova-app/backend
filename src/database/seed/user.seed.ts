import prisma from '../prisma.js';
import { faker } from '@faker-js/faker';

export async function seedUsers() {
  const usersData = Array.from({ length: 15 }).map(() => ({
    googleId: faker.string.uuid(),
    email: faker.internet.email(),
    nickname: faker.person.firstName(),
    userWhy: faker.helpers.arrayElement([
      'To improve mindfulness',
      'To manage stress',
      'To achieve better focus',
      'To sleep better',
      'To increase productivity',
      'To build healthy habits',
      'To reduce anxiety',
      'To enhance emotional well-being',
    ]),
  }));

  const users = await prisma.user.createMany({
    data: usersData,
    skipDuplicates: true,
  });

  console.log(`[database]: Seeded ${users.count} users.`);
}
