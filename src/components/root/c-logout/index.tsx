"use client";
import React from "react";
import { Button } from "../button";
import { BtnColorSchema } from "@src/types/root";
import { useCookies } from "next-client-cookies";
import { EAuth } from "@src/types/common";
import { useRouter } from "next/navigation";

export const CLogout = () => {
  const cookies = useCookies();
  const route = useRouter();
  const logoutHandler = () => {
    cookies.remove(EAuth.AuthTokenCookieName);
    route.push("/login");
  };
  return (
    <React.Fragment>
      <Button
        btnText="Logout"
        colorSchema={BtnColorSchema.SolidBgVioletTextWhite}
        isArrow={false}
        clickHandler={logoutHandler}
      />
    </React.Fragment>
  );
};
