import { z } from 'zod/v4';

export const createPostSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    content: z.string().min(10, 'Post content must be at least 10 characters'),
    category: z.enum(['advice', 'motivation', 'story', 'question', 'assistance'], {
      message: 'Category must be one of advice, motivation, story, question, assistance',
    }),
  }),
});

export const createCommentSchema = z.object({
  body: z.object({
    content: z.string().min(1, 'Comment is required'),
  }),
});
