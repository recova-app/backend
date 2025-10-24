import prisma from '../../database/prisma.js';
import { parseCheckinTime } from '../../utils/index.js';

export async function findUserById(userId: string) {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
      email: true,
      nickname: true,
      userWhy: true,
      checkinTime: true,
      createdAt: true,
    },
  });

  return user;
}

export async function updateUserSettings(
  userId: string,
  data: { nickname?: string; userWhy?: string; checkinTime?: string }
) {
  const dataToUpdate: { nickname?: string; userWhy?: string; checkinTime?: Date } = {};

  if (data.nickname) {
    dataToUpdate.nickname = data.nickname;
  }
  if (data.userWhy) {
    dataToUpdate.userWhy = data.userWhy;
  }
  if (data.checkinTime) {
    const checkinDate = parseCheckinTime(data.checkinTime);
    dataToUpdate.checkinTime = checkinDate;
  }

  const updatedUser = await prisma.user.update({
    where: {
      id: userId,
    },
    data: dataToUpdate,
    select: {
      id: true,
      email: true,
      nickname: true,
      userWhy: true,
      checkinTime: true,
      createdAt: true,
    },
  });

  return updatedUser;
}

export async function resetUserDataForTesting(userId: string) {
  return prisma.$transaction(async tx => {
    // Delete all comments related to the user's posts
    const userPosts = await tx.communityPost.findMany({
      where: {
        userId,
      },
      select: {
        id: true,
      },
    });
    const postIds = userPosts.map(post => post.id);
    if (postIds.length > 0) {
      await tx.communityComment.deleteMany({
        where: { postId: { in: postIds } },
      });
    }

    // Delete all related data for the user
    await tx.communityComment.deleteMany({ where: { userId } });
    await tx.communityPostLike.deleteMany({ where: { userId } });
    await tx.communityPost.deleteMany({ where: { userId } });
    await tx.journal.deleteMany({ where: { userId } });
    await tx.checkin.deleteMany({ where: { userId } });
    await tx.streak.deleteMany({ where: { userId } });
    await tx.userProfile.deleteMany({ where: { userId } });

    const resetUser = await tx.user.update({
      where: {
        id: userId,
      },
      data: {
        userWhy: null,
        checkinTime: null,
      },
    });

    return resetUser;
  });
}
