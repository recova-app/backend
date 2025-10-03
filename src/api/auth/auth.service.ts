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
    throw new Error('Invalid Google token payload');
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
