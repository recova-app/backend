import { differenceInDays } from 'date-fns';
import prisma from '../../database/prisma.js';

export type PostCategory = 'advice' | 'motivation' | 'story' | 'question' | 'assistance';

export async function createPost(
  userId: string,
  data: {
    title?: string;
    content: string;
    category: PostCategory;
  }
) {
  const { title, content, category } = data;

  const post = await prisma.communityPost.create({
    data: {
      title: title ?? null,
      content,
      category,
      userId,
    },
  });

  return post;
}

export async function findAllPosts(category?: PostCategory) {
  const whereClause: { category?: PostCategory } = {};
  if (category) {
    whereClause.category = category;
  }

  const posts = await prisma.communityPost.findMany({
    where: whereClause,
    select: {
      id: true,
      title: true,
      content: true,
      commentCount: true,
      likeCount: true,
      createdAt: true,
      user: {
        select: {
          nickname: true,
          streaks: {
            where: {
              isActive: true,
            },
            select: {
              startDate: true,
            },
          },
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  const formattedPosts = posts.map(post => {
    const activeStreak = post.user.streaks[0];

    const currentStreakDays = activeStreak
      ? differenceInDays(new Date(), activeStreak.startDate) + 1
      : 0;

    return {
      id: post.id,
      title: post.title,
      content: post.content,
      category,
      commentCount: post.commentCount,
      likeCount: post.likeCount,
      createdAt: post.createdAt,
      author: {
        nickname: post.user.nickname,
        currentStreak: currentStreakDays,
      },
    };
  });

  return formattedPosts;
}

export async function createComment(userId: string, postId: string, content: string) {
  return prisma.$transaction(async tx => {
    const comment = await tx.communityComment.create({
      data: {
        userId,
        postId,
        content,
      },
    });

    await tx.communityPost.update({
      where: {
        id: postId,
      },
      data: {
        commentCount: {
          increment: 1,
        },
      },
    });

    return comment;
  });
}

export async function addLikeToPost(postId: string) {
  const updatedPost = await prisma.communityPost.update({
    where: {
      id: postId,
    },
    data: {
      likeCount: {
        increment: 1,
      },
    },
  });

  return updatedPost;
}
