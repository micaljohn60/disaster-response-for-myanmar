"use client";

import CustomButton from "../buttons/Button";
import { useState } from "react";
import RightSideBar from "../side_bar/right_side_bar/right_side_bar";
import MobileSideBar from "../side_bar/mobile_missing_popup";

export default function ActivityBar({ missingPersons, onUpdateLocate }) {
  const [isModelOpen, setIsModelOpen] = useState(false);

  const handleClick = () => {
    if (isModelOpen) {
      setIsModelOpen(false);
    } else {
      setIsModelOpen(true);
    }
  };

  return (
    <>
      <div className="lg:hidden">
        <MobileSideBar isModelOpen={isModelOpen} />
        <div className="fixed sm:w-auto md:w-72 bottom-4 left-1/2 transform -translate-x-1/2 bg-white text-primary p-4 rounded-xl shadow-md z-1000 flex flex-col">
          Call 199 For the Rescue
          <CustomButton
            className="bg-danger text-white p-3 m-3 rounded "
            buttonName="Show Missing Persons"
            onClick={handleClick}
          />
        </div>
      </div>
    </>
  );
}
