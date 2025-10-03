import prisma from '../../database/prisma.js';

export async function createPost(userId: string, data: { title?: string; content: string }) {
  try {
    const { title, content } = data;

    const post = await prisma.communityPost.create({
      data: {
        title: title ?? null,
        content,
        userId,
      },
    });

    return post;
  } catch (error) {
    console.error('Error creating community post:', error);
    throw new Error('Failed to create community post');
  }
}

export async function findAllPosts() {
  try {
    const posts = await prisma.communityPost.findMany({
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
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return posts;
  } catch (error) {
    console.error('Error fetching community posts:', error);
    throw new Error('Failed to fetch community posts');
  }
}
