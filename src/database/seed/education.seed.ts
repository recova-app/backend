import prisma from '../prisma.js';
import { faker } from '@faker-js/faker';

export async function seedEducationContent() {
  const contents = Array.from({ length: 10 }).map(() => ({
    title: faker.lorem.words(4),
    description: faker.lorem.sentences(2),
    url: faker.internet.url(),
    thumbnailUrl: faker.image.urlLoremFlickr({ category: 'education' }),
    category: faker.helpers.arrayElement([
      'Mindfulness',
      'Wellness',
      'Productivity',
      'Mental Health',
      'Self-Improvement',
    ]),
  }));

  await prisma.educationContent.createMany({
    data: contents,
  });

  console.log('[database]: Seeded education content');
}
