import { NextApiRequest } from "next";
import { getSession } from "next-auth/react";

import prisma from "./prismadb";

const serverAuth = async (req: NextApiRequest) => {
  const session = await getSession({ req });

  if (!session?.user?.email) {
    throw new Error("User not Signed in");
  }

  const currentUser = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!currentUser) {
    throw new Error("User not signed in");
  }

  return currentUser;
};

export default serverAuth;
