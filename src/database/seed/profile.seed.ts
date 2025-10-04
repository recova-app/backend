import prisma from '../prisma.js';
import { faker } from '@faker-js/faker';

export async function seedProfiles() {
  const users = await prisma.user.findMany();

  for (const user of users) {
    await prisma.userProfile.create({
      data: {
        answers: {
          q1: faker.helpers.arrayElement(['Yes', 'No', 'Sometimes']),
          q2: faker.helpers.arrayElement(['Often', 'Rarely', 'Never']),
          q3: faker.helpers.arrayElement(['High', 'Medium', 'Low']),
        },
        dependencyLevel: faker.helpers.arrayElement(['Low', 'Medium', 'High']),
        aiSummary: faker.lorem.sentences(2),
        userId: user.id,
      },
    });
  }

  console.log(`[database]: Seeded ${users.length} user profiles`);
}
