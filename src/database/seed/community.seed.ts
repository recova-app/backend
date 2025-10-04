import prisma from '../prisma.js';
import { faker } from '@faker-js/faker';

export async function seedCommunity() {
  const users = await prisma.user.findMany();

  for (const user of users) {
    const postCount = faker.number.int({ min: 2, max: 4 });

    for (let i = 0; i < postCount; i++) {
      const post = await prisma.communityPost.create({
        data: {
          title: faker.lorem.sentence(),
          content: faker.lorem.paragraph(),
          userId: user.id,
        },
      });

      // Add comments to each post
      const commentCount = faker.number.int({ min: 1, max: 3 });
      for (let j = 0; j < commentCount; j++) {
        await prisma.communityComment.create({
          data: {
            content: faker.lorem.sentence(),
            userId: faker.helpers.arrayElement(users).id,
            postId: post.id,
          },
        });
      }
    }
  }

  console.log(`[database]: Seeded community posts & comments`);
}
