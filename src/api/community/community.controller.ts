import type { Request, Response } from 'express';
import { createPost, findAllPosts } from './community.service.js';

export async function createPostHandler(req: Request, res: Response) {
  try {
    const userId = req.user?.id;
    const postData = req.body;

    if (!userId) {
      return res.status(401).json({
        message: 'Unauthorized',
        data: null,
        error: 'User ID not found in request',
      });
    }

    const post = await createPost(userId, postData);

    return res.status(201).json({
      message: 'Post created successfully',
      data: post,
      error: null,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Internal Server Error';

    return res.status(500).json({
      message: 'Failed to create post',
      data: null,
      error: errorMessage,
    });
  }
}

export async function getPostsHandler(req: Request, res: Response) {
  try {
    const posts = await findAllPosts();

    return res.status(200).json({
      message: 'Posts fetched successfully',
      data: posts,
      error: null,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Internal Server Error';

    return res.status(500).json({
      message: 'Failed to fetch posts',
      data: null,
      error: errorMessage,
    });
  }
}
