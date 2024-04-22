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
          <>{children}</>
        </>
      )}
    </div>
  );
}
