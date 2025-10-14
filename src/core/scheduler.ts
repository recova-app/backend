import cron from 'node-cron';
import { generateJournalSummaryPrompt } from '../api/ai/ai.prompts.js';
import prisma from '../database/prisma.js';
import { generateContent } from './ai.js';

async function updateAiSummaries() {
  console.log('[scheduler]: Menjalankan job harian untuk memperbarui AI Summary...');

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
          answers: '',
          dependencyLevel: 'Medium',
          aiSummary: summary,
          userId: user.id,
        },
      });

      console.log(`[ai]: Berhasil memperbarui AI Summary untuk pengguna ${user.id}`);
    } catch (error) {
      console.error(`[ai]: Gagal memperbarui AI Summary untuk pengguna ${user.id}:`, error);
    }
  }

  console.log('[scheduler]: Job harian AI Summary selesai.');
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

  console.log(
    '[scheduler]: Job harian AI Summary dijadwalkan untuk berjalan setiap hari pada pukul 02:00 WIB.'
  );
}
