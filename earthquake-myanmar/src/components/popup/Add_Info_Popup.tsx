"use client";

import React from "react";
import { useState } from "react";
import CustomButton from "../buttons/Button";
import apiService from "@/services/apiService";

interface ModelProps {
  show: boolean;
  latProps: number;
  lngProps: number;
  onClose: () => void;
}

const AddInfoPopUp = ({ show, latProps, lngProps, onClose }: ModelProps) => {
  const [userName, setUserName] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [noticeMark, setNoticeMark] = useState<string>("");
  const [picture, setPicture] = useState<string>("TEST");

  const AddData = async () => {
    try {
      await apiService.addMissingPerson({
        name: userName,
        location: location,
        lat: latProps,
        lng: lngProps,
        image: picture,
        noticeable_mark: noticeMark,
      });

      console.log("Sent to Server");
    } catch (error) {
      console.error(error);
    }
  };
  if (!show) return null;

  return (
    <>
      <div className="relative flex justify-center items-center z-1000">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
          <h2 className="text-xl font-bold mb-4 text-black">Add Information</h2>

          <div className="mb-4">
            <label className="text-black">Missing Person Name</label>
            <input
              type="text"
              className="border p-2 w-full text-black"
              onChange={(e) => setUserName(e.target.value)}
            />
            <label className="text-black">Location</label>
            <input
              type="text"
              className="border p-2 w-full text-black"
              onChange={(e) => setLocation(e.target.value)}
            />
            <label className="text-black">Notice Mark</label>
            <input
              type="text"
              className="border p-2 w-full text-black"
              onChange={(e) => setNoticeMark(e.target.value)}
            />
          </div>
          <label className="text-black">
            This person coordinate will be added the location you clicked on the
            map. {latProps} - {lngProps}
          </label>
          <div className="flex justify-end ">
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded m-2"
              onClick={onClose}
            >
              Close
            </button>
            <CustomButton
              className="bg-blue-500 text-white py-2 px-4 rounded m-2"
              buttonName="Add"
              onClick={AddData}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AddInfoPopUp;
