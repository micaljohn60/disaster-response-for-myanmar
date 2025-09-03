"use client";

import RightSideBar from "./right_side_bar/right_side_bar";

type props = {
  isModelOpen?: boolean;
};

export default function MobileSideBar({ isModelOpen }: props) {
  return (
    <div className="z-10000">
      <div
        className="fixed sm:w-auto md:w-80 bg-white p-3 m-3 left-1/2 rounded transform -translate-x-1/2"
        style={{
          zIndex: 1000,
        }}
      >
        {isModelOpen ? <RightSideBar /> : <></>}
      </div>
    </div>
  );
}
