"use server";

import { signIn } from "@/auth";
import { UserType } from "@/types/login-types";
import { AuthError } from "next-auth";

export const loginAction = async (
  values: { email: string; password: string },
  user: UserType
) => {
  try {
    await signIn(user, {
      email: values.email,
      password: values.password,
      redirect: false,
    });

    return { success: true };
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: error.cause?.err?.message };
    }
    return { error: "error 500" };
  }
};
