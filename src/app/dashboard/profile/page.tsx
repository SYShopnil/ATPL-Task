import { Authorization } from "@root/lib/authorization";
import { SProfile } from "@src/components/compound";
import { Suspense } from "react";
export default async function ProfilePage() {
  await Authorization(["admin", "user"]);

  return (
    <section className={`py-5`}>
      <Suspense fallback={<div>Loading... Profile</div>}>
        <SProfile />
      </Suspense>
    </section>
  );
}
