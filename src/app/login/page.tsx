import { CLoginFormWithSubmit } from "@src/components/compound";
import { CookiesProvider } from "next-client-cookies/server";

export default function LoginPage() {
  return (
    <div>
      <CookiesProvider>
        <CLoginFormWithSubmit />
      </CookiesProvider>
    </div>
  );
}
