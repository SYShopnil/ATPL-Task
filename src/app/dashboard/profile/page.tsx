import { Authorization } from "@root/lib/authorization";
import { redirect } from "next/navigation";
export default async function ProfilePage() {
  const isPermit = await Authorization(["admin", "user"]);
  !isPermit && redirect("/unAuthorize");
  return <div>I am from page of profile under dashboard</div>;
}
