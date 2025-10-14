import prisma from '../../database/prisma.js';

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
    const parsedDate = new Date(data.checkinTime);
    if (isNaN(parsedDate.getTime())) {
      throw new Error('Format waktu check-in tidak valid');
    }
    dataToUpdate.checkinTime = parsedDate;
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
