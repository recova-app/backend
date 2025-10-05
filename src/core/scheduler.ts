import cron from 'node-cron';
import { generateJournalSummaryPrompt } from '../api/ai/ai.prompts.js';
import prisma from '../database/prisma.js';
import { generateContent } from './ai.js';

async function updateAiSummaries() {
  console.log('[scheduler]: Running daily AI Summary job...');

  const users = await prisma.user.findMany({
    select: {
      id: true,
    },
  });

  for (const user of users) {
    try {
      const fifteenDaysAgo = new Date(Date.now() - 15 * 24 * 60 * 60 * 1000);
      const journals = await prisma.journal.findMany({
        where: {
          userId: user.id,
          createdAt: {
            gte: fifteenDaysAgo,
          },
        },
        select: {
          content: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      if (journals.length === 0) {
        // No journals found for the user in the last 15 days, skip to the next user
        continue;
      }

      const journalContents = journals.map(j => j.content);
      const prompt = generateJournalSummaryPrompt(journalContents);

      // Generate the summary using the AI model
      const summary = await generateContent(prompt);

      await prisma.userProfile.upsert({
        where: {
          userId: user.id,
        },
        update: {
          aiSummary: summary,
        },
        create: {
          answers: '', // Provide a default or appropriate value
          dependencyLevel: 'Medium', // Provide a default or appropriate value
          aiSummary: summary,
          userId: user.id,
        },
      });

      console.log(`[ai]: Successfully updated AI Summary for user ${user.id}`);
    } catch (error) {
      console.error(`[ai]: Failed to update AI Summary for user ${user.id}:`, error);
    }
  }

  console.log('[scheduler]: Daily AI Summary job finished.');
}

export function initializeSchedulers() {
  // Schedule the job to run daily at 02:00 AM Jakarta time
  cron.schedule(
    '0 2 * * *',
    () => {
      updateAiSummaries();
    },
    {
      timezone: 'Asia/Jakarta',
    }
  );

  console.log('[scheduler]: AI Summary job scheduled to run daily at 02:00 AM Jakarta time.');
}
