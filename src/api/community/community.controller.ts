import type { Request, Response } from 'express';
import {
  createComment,
  createPost,
  findAllPosts,
  toggleLikeOnPost,
  type PostCategory,
} from './community.service.js';
import { asyncHandler } from '../../handler/async.handler.js';
import { errorResponse, successResponse } from '../../core/response.js';

export const createPostHandler = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const postData = req.body;

  if (!userId) {
    return errorResponse(
      res,
      401,
      'Tidak diizinkan',
      'ID pengguna tidak ditemukan dalam permintaan'
    );
  }

  const post = await createPost(userId, postData);
  return successResponse(res, 201, 'Postingan berhasil dibuat', post);
});

export const getPostsHandler = asyncHandler(async (req: Request, res: Response) => {
  const category = req.query.category as PostCategory | undefined;
  const posts = await findAllPosts(category);
  return successResponse(res, 200, 'Postingan berhasil diambil', posts);
});

export const createCommentHandler = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const { postId } = req.params;
  const { content } = req.body;

  if (!userId) {
    return errorResponse(
      res,
      401,
      'Tidak diizinkan',
      'ID pengguna tidak ditemukan dalam permintaan'
    );
  }
  if (!postId) {
    return errorResponse(res, 400, 'Permintaan Tidak Valid', 'ID postingan diperlukan');
  }

  const comment = await createComment(userId, postId, content);
  return successResponse(res, 201, 'Komentar berhasil dibuat', comment);
});

export const addLikeHandler = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const { postId } = req.params;

  if (!userId) {
    return errorResponse(
      res,
      401,
      'Tidak diizinkan',
      'ID pengguna tidak ditemukan dalam permintaan'
    );
  }
  if (!postId) {
    return errorResponse(res, 400, 'Permintaan Tidak Valid', 'ID postingan diperlukan');
  }

  const post = await toggleLikeOnPost(userId, postId);
  const message = post.isLiked ? 'Postingan berhasil disukai' : 'Suka pada postingan dibatalkan';

  return successResponse(res, 200, message, post);
});
