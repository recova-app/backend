import { z } from 'zod/v4';

export const askCoachSchema = z.object({
  body: z.object({
    message: z.string().min(1, 'Pesan harus diisi'),
  }),
});
