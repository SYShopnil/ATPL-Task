"use client";

import Link from "next/link";
import React from "react";

interface CPaginationTrack {
  currentPage: number;
  totalPage: number;
}

export const CPaginationTrack = ({
  currentPage,
  totalPage,
}: CPaginationTrack) => {
  const createFakeArray = new Array(totalPage).fill("");
  return (
    <div className={`flex space-x-2`}>
      {createFakeArray.map((item, ind) => {
        const trackIndex = ++ind;
        const activeBg = currentPage == trackIndex && "!bg-[#E0E3EA]";
        const activeText = currentPage == trackIndex && " !text-[#7F4D4F]";
        return (
          <div
            className={`${activeBg} duration-[0.2s] h-[2rem] w-[2rem]  bg-[#7F4D4F] hover:bg-[#E0E3EA] flex justify-center items-center`}
            key={ind}
          >
            <Link
              href={`/dashboard/products?page=${trackIndex}`}
              legacyBehavior
            >
              <span
                className={`cursor-pointer ${activeText} duration-[0.2s]  text-white hover:text-[#7F4D4F]  font-bold text-lg`}
              >
                {trackIndex}
              </span>
            </Link>
          </div>
        );
      })}
    </div>
  );
};
