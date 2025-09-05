import { z } from 'zod/v4';

export const updateUserSettingsSchema = z
  .object({
    body: z.object({
      nickname: z.string().min(3, 'Nickname must be at least 3 characters').trim(),
      userWhy: z.string().min(10, 'Your "Why" must be at least 10 characters').trim(),
      checkinTime: z
        .string()
        .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Invalid time format, use HH:MM')
        .trim(),
    }),
  })
  .partial();
