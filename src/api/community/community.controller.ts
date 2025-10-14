import type { Request, Response } from 'express';
import { addLikeToPost, createComment, createPost, findAllPosts } from './community.service.js';
import { asyncHandler } from '../../middleware/asyncHandler.js';
import { errorResponse, successResponse } from '../../core/response.js';

export const createPostHandler = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const postData = req.body;

  if (!userId) {
    return errorResponse(res, 401, 'Unauthorized', 'User ID not found in request');
  }

  const post = await createPost(userId, postData);
  return successResponse(res, 201, 'Post created successfully', post);
});

export const getPostsHandler = asyncHandler(async (req: Request, res: Response) => {
  const posts = await findAllPosts();
  return successResponse(res, 200, 'Posts fetched successfully', posts);
});

export const createCommentHandler = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const { postId } = req.params;
  const { content } = req.body;

  if (!userId) {
    return errorResponse(res, 401, 'Unauthorized', 'User ID not found in request');
  }
  if (!postId) {
    return errorResponse(res, 400, 'Bad Request', 'Post ID is required');
  }

  const comment = await createComment(userId, postId, content);
  return successResponse(res, 201, 'Comment created successfully', comment);
});

export const addLikeHandler = asyncHandler(async (req: Request, res: Response) => {
  const { postId } = req.params;
  if (!postId) {
    return errorResponse(res, 400, 'Bad Request', 'Post ID is required');
  }

  const post = await addLikeToPost(postId);
  return successResponse(res, 200, 'Post liked successfully', { likeCount: post.likeCount });
});
