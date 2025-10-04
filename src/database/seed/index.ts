import prisma from '../prisma.js';
import { seedCheckins } from './checkin.seed.js';
import { seedCommunity } from './community.seed.js';
import { seedEducationContent } from './education.seed.js';
import { seedJournals } from './journal.seed.js';
import { seedProfiles } from './profile.seed.js';
import { seedStreaks } from './streak.seed.js';
import { seedUsers } from './user.seed.js';

async function main() {
  console.log('[database]: Connecting to the database...');
  await prisma.$connect();

  console.log('[database]: Starting full seeding process...');
  await seedUsers();
  await seedProfiles();
  await seedStreaks();
  await seedCheckins();
  await seedJournals();
  await seedCommunity();
  await seedEducationContent();
  console.log('[database]: All seeds completed successfully!');
}

main()
  .catch(e => {
    console.error('[database]: Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
