import type { Request, Response } from 'express';
import { createJournalEntry, findJournalsByUserId } from './journal.service.js';

export async function createJournalHandler(req: Request, res: Response) {
  try {
    const userId = req.user?.id;
    const { content } = req.body;

    if (!userId) {
      return res.status(401).json({
        message: 'Unauthorized',
        data: null,
        error: 'User ID not found in request',
      });
    }

    const journal = await createJournalEntry(userId, content);

    return res.status(201).json({
      message: 'Journal entry created successfully',
      data: journal,
      error: null,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Internal Server Error';

    return res.status(500).json({
      message: 'Failed to create journal entry',
      data: null,
      error: errorMessage,
    });
  }
}

export async function getJournalsHandler(req: Request, res: Response) {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({
        message: 'Unauthorized',
        data: null,
        error: 'User ID not found in request',
      });
    }

    const journals = await findJournalsByUserId(userId);

    return res.status(200).json({
      message: 'Journals fetched successfully',
      data: journals,
      error: null,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Internal Server Error';

    return res.status(500).json({
      message: 'Failed to fetch journal entries',
      data: null,
      error: errorMessage,
    });
  }
}
