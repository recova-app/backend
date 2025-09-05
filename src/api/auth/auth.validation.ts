import { z } from 'zod/v4';

export const googleLoginSchema = z.object({
  body: z.object({
    token: z.string().min(1, 'Google token is required').trim(),
  }),
});
