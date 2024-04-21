import { Authorization } from "@root/lib/authorization";

export default async function ProfilePage() {
  await Authorization(["admin", "user"]);
  return <div>I am from page of profile under dashboard</div>;
}
