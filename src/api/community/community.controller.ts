import type { Request, Response } from 'express';
import { addLikeToPost, createComment, createPost, findAllPosts } from './community.service.js';

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

export async function createCommentHandler(req: Request, res: Response) {
  try {
    const userId = req.user?.id;
    const { postId } = req.params;
    const { content } = req.body;

    if (!userId) {
      return res.status(401).json({
        message: 'Unauthorized',
        data: null,
        error: 'User ID not found in request',
      });
    }

    if (!postId) {
      return res.status(400).json({
        message: 'Bad Request',
        data: null,
        error: 'Post ID is required',
      });
    }

    const comment = await createComment(userId, postId, content);

    return res.status(201).json({
      message: 'Comment created successfully',
      data: comment,
      error: null,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Internal Server Error';

    return res.status(500).json({
      message: 'Failed to create comment',
      data: null,
      error: errorMessage,
    });
  }
}

export async function addLikeHandler(req: Request, res: Response) {
  try {
    const { postId } = req.params;
    if (!postId) {
      return res.status(400).json({
        message: 'Bad Request',
        data: null,
        error: 'Post ID is required',
      });
    }

    const post = await addLikeToPost(postId);

    return res.status(200).json({
      message: 'Post liked successfully',
      data: {
        likeCount: post.likeCount,
      },
      error: null,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Internal Server Error';

    return res.status(500).json({
      message: 'Failed to like post',
      data: null,
      error: errorMessage,
    });
  }
}
