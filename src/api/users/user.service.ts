import prisma from '../../database/prisma.js';

export async function findUserById(userId: string) {
  try {
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
  } catch (error) {
    console.error('Error finding user by ID:', error);
    throw new Error('Failed to find user');
  }
}

export async function updateUserSettings(
  userId: string,
  data: { nickname?: string; userWhy?: string; checkinTime?: string }
) {
  try {
    const dataToUpdate: { nickname?: string; userWhy?: string; checkinTime?: Date } = {};

    if (data.nickname) {
      dataToUpdate.nickname = data.nickname;
    }
    if (data.userWhy) {
      dataToUpdate.userWhy = data.userWhy;
    }
    if (data.checkinTime) {
      dataToUpdate.checkinTime = new Date(`1970-01-01T${data.checkinTime}:00.000Z`);
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
  } catch (error) {
    console.error('Error updating user settings:', error);
    throw new Error('Failed to update user settings');
  }
}
