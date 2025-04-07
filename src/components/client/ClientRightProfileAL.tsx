// @ts-nocheck
import React, { useContext, useEffect, useState } from "react";
import { JobIndex } from "../context/job_list_context";
import { state } from "../../Data/Jobs/Categories/Cat_data";
import DropDownMenu from "../candidate/DropDownMenu";
import { API_POST_CITY } from "../../utils/api_structure";
import { cities } from "../../Data/cities";

const ClientRightProfileAL = () => {
  const { clientid, setClientId, clientprofileBI, setClientProfileBI } =
    useContext(JobIndex);

    // console.log(clientprofileBI);
    

  const adddata = (e) => {
    const { name, value } = e.target;

    setClientProfileBI(() => {
      return {
        ...clientprofileBI,
        [name]: value,
      };
    });
  };

  const addDataMenu = (name, value) => {
    setClientProfileBI(() => {
      return {
        ...clientprofileBI,
        [name]: value,
      };
    });
  };

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
            // onChange={adddata}
            // placeholder={candidateDetails.state || "Enter State"}
            // value={profileBI.state}
            name="state"
            id="state"
            className="h-10 p-3 focus:outline-none border-[1px] w-[300px]"
          /> */}
          <DropDownMenu
            options={state}
            name={clientid.state ? clientid.state : "Select State"}
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
            // onChange={adddata}
            // placeholder={candidateDetails.city || "Enter City"}
            // value={profileBI.city}
            name="city"
            id="city"
            className="h-10 p-3 focus:outline-none border-[1px] w-[300px]"
          /> */}
          <DropDownMenu
            options={result}
            name={clientid.city ? clientid.city : "Select City"}
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
            placeholder={clientid.pincode || "Enter Pincode"}
            value={clientprofileBI.pincode}
            name="pincode"
            id="pincode"
            className="h-10 p-3 focus:outline-none border-[1px] w-[300px]"
          />
        </div>
      </div>
    </div>
  );
};

export default ClientRightProfileAL;
