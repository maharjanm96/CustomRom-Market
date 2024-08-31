import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import { getUserByEmail } from "./data/user";
import bcrypt from "bcryptjs";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/error",
  },
  callbacks: {
    async signIn({ credentials }: any) {
      const user = await getUserByEmail(credentials.email);
      if (!user || !user.password) return false;
      const passwordsMatch = await bcrypt.compare(
        credentials.password,
        user.password
      );
      if (!passwordsMatch) return false;

      if (!user?.isVerified) return false;
      return true;
    },
    //@ts-ignore
    async session({ session, token }) {
      if (token.sub && session?.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role;
      }

      if (session.user) {
        session.user.email = token.email;
      }
      return session;
    },
    async jwt({ token }: any) {
      if (!token.sub) return token;
      const existingUser = await getUserByEmail(token.email);
      if (!existingUser) return token;
      token.role = existingUser.userRole;
      token.email = existingUser.email;
      token.sub = existingUser._id;

      return token;
    },
  },
  session: {
    strategy: "jwt",
  },
  ...authConfig,
} as any);
