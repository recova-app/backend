import { z } from 'zod/v4';

export const dailyCheckinSchema = z.object({
  body: z.object({
    mood: z.string().min(1, { message: 'Mood harus diisi' }).trim(),
    isSuccessful: z.boolean(),
    content: z
      .string()
      .optional()
      .refine(val => !val || val.length > 0, { message: 'Content harus diisi' }),
  }),
});
