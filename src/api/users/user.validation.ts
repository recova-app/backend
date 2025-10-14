import { z } from 'zod/v4';

export const updateUserSettingsSchema = z.object({
  body: z
    .object({
      nickname: z.string().min(3, 'Nama panggilan harus terdiri dari minimal 3 karakter').trim(),
      userWhy: z.string().min(10, 'Alasan Anda harus terdiri dari minimal 10 karakter').trim(),
      checkinTime: z
        .string()
        .refine(val => !val || !isNaN(Date.parse(val)), {
          message: 'Format tanggal dan waktu tidak valid, gunakan ISO 8601',
        })
        .trim(),
    })
    .partial(),
});
