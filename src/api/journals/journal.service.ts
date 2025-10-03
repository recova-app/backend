import prisma from '../../database/prisma.js';

export async function createJournalEntry(userId: string, content: string) {
  try {
    const journalEntry = await prisma.journal.create({
      data: {
        content,
        userId,
      },
    });

    return journalEntry;
  } catch (error) {
    console.error('Error creating journal entry:', error);
    throw new Error('Failed to create journal entry');
  }
}

export async function findJournalsByUserId(userId: string) {
  try {
    const journals = await prisma.journal.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return journals;
  } catch (error) {
    console.error('Error fetching journal entries:', error);
    throw new Error('Failed to fetch journal entries');
  }
}
