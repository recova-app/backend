import { z } from 'zod/v4';

export const dailyCheckinSchema = z.object({
  body: z.object({
    mood: z.string().min(1, { message: 'Mood is required' }),
    isSuccessful: z.boolean('IsSuccessful must be a boolean'),
  }),
});
