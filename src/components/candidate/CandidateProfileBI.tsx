// @ts-nocheck
import React, { useContext, useEffect, useState } from "react";
import { JobIndex } from "../context/job_list_context";
import DropDownMenu from "./DropDownMenu";
import { sector } from "../../Data/Jobs/Categories/Cat_data";

const CandidateProfileBI = () => {
  const adddata = (e) => {
    const { name, value } = e.target;
    setProfileBI(() => {
      return {
        ...profileBI,
        [name]: value,
      };
    });
  };

  const addDataMenu = (name, value) => {
    setProfileBI(() => {
      return {
        ...profileBI,
        [name]: value,
      };
    });
  };

  const { candidateid, setCandidateId, profileBI, setProfileBI } =
    useContext(JobIndex);
  console.log(profileBI);

  const candidateDetails = candidateid[0] || [];
  return (
    <div className="w-full border-[1px] gap-4 flex flex-col p-5">
      <div className="flex justify-center">
        <h1 className="text-2xl font-semibold text-purple-button">
          BASIC INFORMATION
        </h1>
      </div>
      <div className="w-full border-t-[1px] border-gray-100" />
      <div className="flex w-full justify-around gap-10">
        <div className="flex flex-col gap-2">
          <label
            htmlFor="first_name"
            className="text-lg font-medium font-inter"
          >
            First Name
          </label>
          <input
            type="text"
            onChange={adddata}
            placeholder={candidateDetails.first_name || "Enter First name"}
            value={profileBI.first_name}
            name="first_name"
            id="first_name"
            className="h-10 p-3 focus:outline-none border-[1px] border-gray-300 rounded-[4px] w-[300px]"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="last_name" className="text-lg font-medium font-inter">
            Last Name
          </label>
          <input
            type="text"
            onChange={adddata}
            placeholder={candidateDetails.last_name || "Enter Last name"}
            value={profileBI.last_name}
            name="last_name"
            id="last_name"
            className="h-10 p-3 focus:outline-none border-[1px] border-gray-300 rounded-[4px] w-[300px]"
          />
        </div>
      </div>
      <div className="flex w-full justify-around gap-10">
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-lg font-medium font-inter">
            Email
          </label>
          <input
            type="text"
            onChange={adddata}
            placeholder={candidateDetails.email || "Enter Email"}
            value={profileBI.email}
            name="email"
            id="email"
            className="h-10 p-3 focus:outline-none border-[1px] border-gray-300 rounded-[4px] w-[300px]"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="DOB" className="text-lg font-medium font-inter">
            Date Of Birth
          </label>
          <input
            type="date"
            onChange={adddata}
            placeholder={"Enter Date of Birth"}
            value={candidateDetails.DOB || profileBI.DOB}
            name="DOB"
            id="DOB"
            className="h-10 p-3 focus:outline-none border-[1px] border-gray-300 rounded-[4px] w-[300px]"
          />
        </div>
      </div>
      <div className="flex w-full justify-around gap-10">
        <div className="flex flex-col gap-2">
          <label htmlFor="phone_no" className="text-lg font-medium font-inter">
            Phone
          </label>
          <input
            type="text"
            onChange={adddata}
            placeholder={candidateDetails.phone_no || "Enter Phone Number"}
            value={profileBI.phone_no}
            name="phone_no"
            id="phone_no"
            className="h-10 p-3 focus:outline-none border-[1px] border-gray-300 rounded-[4px] w-[300px]"
          />
        </div>
        <div className="flex flex-col gap-2 w-[300px]">
          <label htmlFor="sector" className="text-lg font-medium font-inter">
            Sector
          </label>
          {/* <input
            type="text"
            onChange={adddata}
            placeholder={candidateDetails.sector || "Enter Sector"}
            value={profileBI.sector}
            name="sector"
            id="sector"
            className="h-10 p-3 focus:outline-none border-[1px] w-[300px]"
          /> */}
          <DropDownMenu
            options={sector}
            name={candidateDetails.sector? candidateDetails.sector : "Select Sector"}
            onchange={addDataMenu}
            id={"sector"}
          />
        </div>
      </div>
      <div className="flex w-full ml-[85px] gap-10">
        <div className="flex flex-col gap-2 justify-start">
          <label htmlFor="" className="text-lg font-medium font-inter">
            College Name
          </label>
          <input
            type="text"
            onChange={adddata}
            placeholder={candidateDetails.college_name || "Enter College Name"}
            value={profileBI.college_name}
            name="college_name"
            id="college_name"
            className="h-10 p-3 focus:outline-none border-[1px] border-gray-300 rounded-[4px] w-[500px]"
          />
        </div>
      </div>
    </div>
  );
};

export default CandidateProfileBI;
