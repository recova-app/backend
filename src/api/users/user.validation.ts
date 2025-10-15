import { z } from 'zod/v4';

export const updateUserSettingsSchema = z.object({
  body: z
    .object({
      nickname: z.string().min(3, 'Nama panggilan harus terdiri dari minimal 3 karakter').trim(),
      userWhy: z.string().min(3, 'Alasan Anda harus terdiri dari minimal 3 karakter').trim(),
      checkinTime: z
        .string()
        .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, {
          message: 'Format waktu check-in tidak valid, gunakan format HH:mm',
        })
        .trim(),
    })
    .partial(),
});
