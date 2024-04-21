import { getLoggedInUser } from "@root/lib/user-handler";
import { Button } from "@src/components/root";
import { BtnColorSchema } from "@src/types/root";
import { redirect } from "next/navigation";
import Image from "next/image";

export default async function Home() {
  const {
    payload: { isLoggedIn },
  } = await getLoggedInUser();
  isLoggedIn ? redirect("/dashboard/profile") : redirect("/login");
  return <div></div>;
}
