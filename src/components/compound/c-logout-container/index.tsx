import { CookiesProvider } from "next-client-cookies/server";
import React from "react";

export function CIsLoggedInContainer({
  children,
  isLoggedIn,
}: {
  children: React.ReactNode;
  isLoggedIn: boolean;
}) {
  return (
    <div>
      {isLoggedIn && (
        <>
          <CookiesProvider>{children}</CookiesProvider>
        </>
      )}
    </div>
  );
}
