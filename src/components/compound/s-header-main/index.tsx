import React from "react";
import { CLogout, SIconStore } from "@src/components/root";
import { IconName } from "@src/types/root/_icon";
import Link from "next/link";
import { getLoggedInUser } from "@root/lib/user-handler";
import { CIsLoggedInContainer } from "../c-logout-container";
import { EDataTestId } from "@src/types/common";

export async function SHeaderMain() {
  const {
    payload: { isLoggedIn, loggedInUser },
  } = await getLoggedInUser();
  return (
    <nav
      data-testid={EDataTestId.SHeaderMain}
      className={`flex flex-col lg:flex-row   items-center space-y-4 lg:space-y-0 p-4 mb-3`}
    >
      <div className={`flex-[1_1_85%]`}>
        <Link href={"/"}>
          <span className={`bg-[#FAFCFF] inline-block p-2 `}>
            <SIconStore iconName={IconName.Logo} />
          </span>
        </Link>
      </div>
      <div className={`space-y-4 lg:space-y-2 flex-[1_1_15%] `}>
        <div>
          <p className={`font-bold text-white text-lg`}>
            {loggedInUser && `Hello ${loggedInUser.userName}`}
          </p>
        </div>
        <CIsLoggedInContainer isLoggedIn={isLoggedIn}>
          <CLogout />
        </CIsLoggedInContainer>
      </div>
    </nav>
  );
}
