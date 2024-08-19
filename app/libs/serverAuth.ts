import { NextRequest } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { PrismaClient } from '@prisma/client';
import { authOptions } from './authOptions';

const prisma = new PrismaClient();

const serverAuth = async () => {
  // Fetch the session using `getServerSession`
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    // Return a response with an error status and message
    return null;
  }

  // Retrieve the user from Prisma
  const currentUser = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!currentUser) {
    // Return a response with an error status and message
    return null;
  }

  // Return a response with the user data
  return currentUser;
};

export default serverAuth;
