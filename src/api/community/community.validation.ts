import { z } from 'zod/v4';

export const createPostSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    content: z
      .string()
      .min(10, 'Konten untuk postingan harus terdiri dari minimal 10 karakter')
      .trim(),
    category: z.enum(['advice', 'motivation', 'story', 'question', 'assistance'], {
      message: 'Kategori harus salah satu dari saran, motivasi, cerita, pertanyaan, bantuan',
    }),
  }),
});

export const createCommentSchema = z.object({
  body: z.object({
    content: z.string().min(1, 'Komentar harus diisi').trim(),
  }),
});
