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
