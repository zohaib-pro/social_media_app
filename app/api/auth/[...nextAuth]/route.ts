import bcrypt from "bcrypt";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "../../../libs/prismadb";

const authOptions =  {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          //throw new Error("Invalid credentials");
          return;
        }

        // Find the user by email
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        // Check if the user exists and validate password
        if (
          user &&
          (await bcrypt.compare(credentials.password, user.hashedPassword))
        ) {
          return user; // Successful login
        }

        // If authentication fails
        //throw new Error("Invalid credentials");
      },
    }),
  ],
  session: {
    strategy: "jwt", // Use JWT for session management
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
      }
      return session;
    },
    async signIn({ user, account, profile, credentials }) {
      // Custom sign-in logic, if needed
      // Ensure that the user exists and any custom conditions are met
      if (user) {
        const dbUser = await prisma.user.findUnique({
          where: { email: user.email },
        });
        if (dbUser) {
          return true; // Allow sign-in
        } else {
          return false; // Deny sign-in if user does not exist
        }
      }
      return false;
    },
  },
  secret: process.env.NEXTAUTH_SECRET, // Ensure this is set in your environment
  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET, // Ensure this is set in your environment
  },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST}
