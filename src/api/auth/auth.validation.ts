import { z } from 'zod/v4';

export const googleLoginSchema = z.object({
  body: z.object({
    token: z.string().min(1, 'Google token harus diisi').trim(),
  }),
});

export const onboardingSchema = z.object({
  body: z.object({
    answers: z.record(z.string(), z.unknown()),
    dependencyLevel: z.string().min(1, 'Tingkat ketergantungan harus diisi').trim(),
    userWhy: z
      .string()
      .optional()
      .refine(val => !val || val.length > 0, { message: 'Alasan pengguna harus diisi' }),
  }),
});
