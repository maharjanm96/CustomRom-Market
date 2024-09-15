import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import { getUserByEmail } from "./data/user";
import bcrypt from "bcryptjs";
import connectMongo from "./lib/database";
import Users from "./models/Users";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: "/login",
    error: "/error",
  },
  callbacks: {
    async signIn({ user, account }: any) {
      const existingUser = await getUserByEmail(user.email);
      if (account?.provider !== "credentials") {
        await connectMongo();

        if (!existingUser) {
          const newUser = await Users.create({
            name: user.name,
            email: user.email,
            isVerified: true,
            userType: "USER",
            joinedDate: Date.now(),
          });
          console.log("New User ", newUser);
        }
        return true;
      }

      if (existingUser) {
        const passwordsMatch = await bcrypt.compare(
          user.password,
          existingUser.password as string
        );
        if (!passwordsMatch) return false;
      } else {
        return false;
      }
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
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.id = token.sub;
      }
      return session;
    },
    async jwt({ token }: any) {
      if (!token.sub) return token;
      const existingUser = await getUserByEmail(token.email!);
      if (!existingUser) return token;
      token.name = existingUser.name;
      token.role = existingUser.userType;
      token.email = existingUser.email;
      token.sub = existingUser.id.toString();

      return token;
    },
  },
  session: {
    strategy: "jwt",
  },
  ...authConfig,
} as any);
