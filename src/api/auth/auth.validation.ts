import { z } from 'zod/v4';

export const googleLoginSchema = z.object({
  body: z.object({
    token: z.string().min(1, 'Google token is required').trim(),
  }),
});

export const onboardingSchema = z.object({
  body: z.object({
    answers: z.record(z.string(), z.any()),
    dependencyLevel: z.string().min(1, 'Dependency level is required'),
  }),
});
