"use server";
import { signIn } from "@/auth";
import { getUserByEmail } from "@/data/user";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { LoginSchema } from "@/schemas";
import { AuthError } from "next-auth";
import bcrypt from "bcryptjs";
import * as z from "zod";


export const login = async (
  values: z.infer<typeof LoginSchema>,
  callbackUrl?: string | null
) => {
  const validateState = LoginSchema.safeParse(values);
  if (!validateState) {
    return { error: "Invalid fields" };
  }
  const { email, password } = values;
  const exisitingUser = await getUserByEmail(email);

  if (!exisitingUser || !exisitingUser.email) {
    return { error: "Invalid credentials" };
  }
  const passwordsMatch = await bcrypt.compare(
    password,
    exisitingUser.password!
  );
  if (!passwordsMatch) return { error: "Invalid Credentials!" };

  // if (!existingUser.isVerified) {
  //   return { error: "User not Verified!" };
  // }

  

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials" };
        default:
          return { error: "Something went wrong" };
      }
    }
    throw error;
  }
};
