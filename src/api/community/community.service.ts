import prisma from '../../database/prisma.js';

export async function createPost(userId: string, data: { title?: string; content: string }) {
  const { title, content } = data;

  const post = await prisma.communityPost.create({
    data: {
      title: title ?? null,
      content,
      userId,
    },
  });

  return post;
}

export async function findAllPosts() {
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
