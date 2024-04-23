import { EDataTestId } from "@src/types/common";
import React from "react";

export function CIsLoggedInContainer({
  children,
  isLoggedIn,
}: {
  children: React.ReactNode;
  isLoggedIn: boolean;
}) {
  return (
    <div data-testid={EDataTestId.cLogoutContainer}>
      {isLoggedIn && (
        <>
          <>{children}</>
        </>
      )}
    </div>
  );
}
