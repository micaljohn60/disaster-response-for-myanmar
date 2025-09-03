// components/RightSideBar.tsx
"use client";

import CustomButton from "@/components/buttons/Button";
import Search from "@/components/shared/search";
import apiService from "@/services/apiService";
import { useEffect, useState } from "react";

interface RightSideBarProps {
  missingPersons: MissingPerson[];
  onUpdateLocate: (loc: [number, number]) => void;
}

export default function RightSideBar({
  missingPersons,
  onUpdateLocate,
}: RightSideBarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleLocate = (lat: number, lng: number) => {
    onUpdateLocate([lat, lng]);
    setIsOpen(false); // close popup on mobile
  };

  const SidebarContent = () => (
    <div className="rounded bg-fade-color h-full text-white p-2">
      <Search />
      <div className="overflow-y-auto h-[calc(100vh-6rem)]">
        {missingPersons.length === 0 ? (
          <div className="p-4">No missing persons found.</div>
        ) : (
          missingPersons.map((person) => (
            <div
              key={person._id}
              className="bg-primary rounded mt-1 p-3 w-full"
            >
              <div className="flex items-center">
                <div className="w-12 h-12">
                  <img
                    src={
                      person.picture ||
                      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                    }
                    alt={person.name}
                    className="h-12 w-12 rounded-full object-cover object-center"
                  />
                </div>
                <div className="flex flex-col ml-3">
                  <div>{person.name}</div>
                  {person.age && (
                    <div className="text-sm">Age: {person.age}</div>
                  )}
                </div>
              </div>
              <div className="mt-3">
                <div>Location: {person.location}</div>
                {person.noticableMark && (
                  <div className="text-sm text-gray-300">
                    Mark: {person.noticableMark}
                  </div>
                )}
                <div className="flex justify-around pt-3">
                  <CustomButton
                    className="bg-danger hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
                    buttonName="Locate"
                    onClick={() => handleLocate(person.lat, person.lng)}
                  />
                  <CustomButton
                    className="bg-light-warning hover:bg-fade-color text-black font-bold py-2 px-4 border border-blue-700 rounded"
                    buttonName="Rescued"
                  />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <div className="hidden lg:block w-full">
        <SidebarContent />
      </div>

      {/* Mobile floating button */}
      <div className="lg:hidden fixed bottom-5 left-1/2 transform -translate-x-1/2 z-1000">
        <div className="bg-white max-w-sm border-black border-1 rounded overflow-hidden shadow-lg ">
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2 text-gray-800">
              We are here to help
            </div>
            <p className="text-gray-700 text-base">
              Please call *** to get more help
            </p>
          </div>
          <div className="px-6 pt-4 pb-2">
            <button
              onClick={() => setIsOpen(true)}
              className="bg-secondary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
            >
              Show Missing Persons
            </button>
          </div>
        </div>
        {/* <button
          className="bg-blue-600 text-white p-4 rounded-full shadow-lg"
          onClick={() => setIsOpen(true)}
        >
          📋
        </button> */}
      </div>

      {/* Mobile popup */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-1000">
          <div className="bg-white text-black rounded-lg shadow-lg w-11/12 h-5/6 overflow-hidden relative">
            <button
              className="absolute top-3 right-3 text-black text-xl"
              onClick={() => setIsOpen(false)}
            >
              ✖
            </button>
            <div className="h-full overflow-y-auto p-2">
              <SidebarContent />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
