import { z } from 'zod/v4';

export const createJournalSchema = z.object({
  body: z.object({
    content: z.string().min(1, { message: 'Konten harus diisi' }).trim(),
  }),
});
