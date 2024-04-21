import { Authorization } from "@root/lib/authorization";

export default async function UserListPage() {
  await Authorization(["admin"]);
  return <div>Hello this is from user list page</div>;
}
