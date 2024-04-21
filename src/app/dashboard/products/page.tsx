import { Authorization } from "@root/lib/authorization";

export default async function ProductsPage() {
  await Authorization(["admin", "user"]);
  return <div>Hello this is products page</div>;
}
