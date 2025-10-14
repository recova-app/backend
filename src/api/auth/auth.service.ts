import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';
import config from '../../config/index.js';
import prisma from '../../database/prisma.js';

const client = new OAuth2Client(config.google.clientId);

export async function verifyGoogleTokenAndLogin(googleToken: string): Promise<string> {
  const ticket = await client.verifyIdToken({
    idToken: googleToken,
    audience: config.google.clientId,
  });

  const payload = ticket.getPayload();
  if (!payload) {
    throw new Error('Google token tidak valid');
  }

  const { email, name, sub: googleId } = payload;
  const nickname = name || email?.split('@')[0];

  let user = await prisma.user.findUnique({
    where: {
      googleId,
    },
  });

  if (!user) {
    user = await prisma.user.create({
      data: {
        googleId,
        email: email ?? '',
        nickname: nickname ?? 'User',
      },
    });
  }

  const jwtToken = jwt.sign({ id: user.id }, config.jwt.secret, {
    expiresIn: '1d',
  });

  return jwtToken;
}

export async function saveOnboardingData(
  userId: string,
  data: { answers: Record<string, any>; dependencyLevel: string; userWhy?: string }
) {
  const { answers, dependencyLevel, userWhy } = data;

  const existingProfile = await prisma.userProfile.findUnique({
    where: {
      userId,
    },
  });
  if (existingProfile) {
    throw new Error('Pengguna sudah menyelesaikan onboarding');
  }

  const userProfile = await prisma.userProfile.create({
    data: {
      answers,
      dependencyLevel,
      userId,
    },
  });

  if (userWhy) {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        userWhy,
      },
    });
  }

  return userProfile;
}
