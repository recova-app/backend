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
