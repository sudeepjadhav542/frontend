// @ts-nocheck
import React, { useContext, useState, useEffect } from "react";
import { JobIndex } from "../context/job_list_context";
import DropDownMenu from "./DropDownMenu";
import { state } from "../../Data/Jobs/Categories/Cat_data";
import { API_POST_CITY } from "../../utils/api_structure";
import { cities } from "../../Data/cities";

const CandidateProfileAL = () => {
  // const [profileBI, setProfileBI] = useState({
  //   pincode: "",
  //   state: "",
  //   city: "",
  // });

  const [city, setCity] = useState([]);

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

  const country = {
    country: "india",
  };

  const { candidateid, setCandidateId, profileBI, setProfileBI } =
    useContext(JobIndex);
  console.log(profileBI);

  const candidateDetails = candidateid[0] || [];




  let newarr = cities[0]["cities"];
  var result;

  if (Array.isArray(newarr)) {
    result = newarr.map((item, index) => ({
      value: index + 1,
      label: item,
    }));
  } else {
    // console.log("newarr is not an array or is undefined.");
  }

  // console.log(JSON.stringify(result));

  return (
    <div className="w-full border-[1px] gap-4 flex flex-col p-5">
      <div className="flex justify-center">
        <h1 className="text-2xl font-semibold text-purple-button mt-3">
          ADDRESS / LOCATION
        </h1>
      </div>
      <div className="w-full border-t-[1px] border-gray-100" />
      <div className="flex w-full justify-around gap-10">
        <div className="flex flex-col w-[300px]">
          <label htmlFor="state" className="text-lg font-medium font-inter">
            State
          </label>
          {/* <input
            type="text"
            onChange={adddata}
            placeholder={candidateDetails.state || "Enter State"}
            value={profileBI.state}
            name="state"
            id="state"
            className="h-10 p-3 focus:outline-none border-[1px] w-[300px]"
          /> */}
          <DropDownMenu
            options={state}
            name={candidateDetails.state? candidateDetails.state : "Select State"}
            onchange={addDataMenu}
            id={"state"}
            selectedOption={undefined}
            setSelected={undefined}
          />
        </div>
        <div className="flex flex-col w-[300px]">
          <label htmlFor="city" className="text-lg font-medium font-inter">
            City
          </label>
          {/* <input
            type="text"
            onChange={adddata}
            placeholder={candidateDetails.city || "Enter City"}
            value={profileBI.city}
            name="city"
            id="city"
            className="h-10 p-3 focus:outline-none border-[1px] w-[300px]"
          /> */}
          <DropDownMenu
            options={result}
            name={candidateDetails.city? candidateDetails.city : "Select City"}
            onchange={addDataMenu}
            id={"city"}
            selectedOption={undefined}
            setSelected={undefined}
          />
        </div>
      </div>
      <div className="flex w-full ml-[85px] gap-10">
        <div className="flex flex-col">
          <label htmlFor="pincode" className="text-lg font-medium font-inter">
            Pincode
          </label>
          <input
            type="text"
            onChange={adddata}
            placeholder={candidateDetails.pincode || "Enter Pincode"}
            value={profileBI.pincode}
            name="pincode"
            id="pincode"
            className="h-10 p-3 focus:outline-none border-[1px] w-[300px]"
          />
        </div>
      </div>
    </div>
  );
};

export default CandidateProfileAL;
