import prisma from '../../database/prisma.js';

export async function createJournalEntry(userId: string, content: string) {
  const journalEntry = await prisma.journal.create({
    data: {
      content,
      userId,
    },
  });

  return journalEntry;
}

export async function findJournalsByUserId(userId: string) {
  const journals = await prisma.journal.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return journals;
}
