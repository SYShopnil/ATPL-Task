import { Authorization } from "@root/lib/authorization";
import { RUserList } from "@src/components/compound";
import { Suspense } from "react";

export default async function UserListPage() {
  await Authorization(["admin"]);
  return (
    <section className={`space-y-7 p-[2rem]`}>
      <h1 className={`text-[#374151] font-bold text-4xl text-center`}>
        User List
      </h1>
      <hr />
      <Suspense>
        <RUserList />
      </Suspense>
    </section>
  );
}
