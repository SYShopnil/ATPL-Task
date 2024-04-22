"use server";
import { cookies } from "next/headers";
import {
  ILoginController,
  ILoginControllerResponse,
} from "@src/types/lib/login-handler";
import { searchIndividualUserByEmail } from "../user-handler";
import { redirect } from "next/navigation";

export async function LoginController({
  email,
  password,
}: ILoginController): Promise<ILoginControllerResponse> {
  let redirectPath = "";
  const cookieStore = cookies();
  try {
    const {
      payload: { user },
    } = await searchIndividualUserByEmail(email);
    if (user && user.password == password) {
      cookieStore.set("auth", user.email);
      redirectPath = "/dashboard/profile";
    } else {
      redirectPath = "/login";
    }
  } catch (err) {
    redirectPath = "/";
    console.log(err);
  } finally {
    if (redirectPath) {
      redirect(redirectPath);
    } else {
      redirect("/");
    }
  }
}
