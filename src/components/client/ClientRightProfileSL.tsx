// @ts-nocheck
import React, { useContext } from "react";
import { JobIndex } from "../context/job_list_context";

const ClientRightProfileSL = () => {
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
  return (
    <div className="w-full border-[1px] gap-4 flex flex-col p-5">
      <div className="flex justify-center">
        <h1 className="text-2xl font-semibold text-purple-button mt-3">
          SOCIAL LINKS
        </h1>
      </div>
      <div className="w-full border-t-[1px] border-gray-100" />
      <div className="flex w-full justify-around gap-10">
        <div className="flex flex-col">
          <label htmlFor="linkedin" className="text-lg font-medium font-inter">
            LinkedIn
          </label>
          <input
            type="text"
            onChange={adddata}
            placeholder={clientid.linkedin || "Enter LinkedIn"}
            value={clientprofileBI.linkedin}
            name="linkedin"
            id="linkedin"
            className="h-10 p-3 focus:outline-none border-[1px] w-[300px]"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="facebook" className="text-lg font-medium font-inter">
            Facebook
          </label>
          <input
            type="text"
            onChange={adddata}
            placeholder={clientid.facebook || "Enter Facebook"}
            value={clientprofileBI.facebook}
            name="facebook"
            id="facebook"
            className="h-10 p-3 focus:outline-none border-[1px] w-[300px]"
          />
        </div>
      </div>
      <div className="flex w-full ml-[85px] gap-10">
        <div className="flex flex-col">
          <label htmlFor="twitter" className="text-lg font-medium font-inter">
            Twitter
          </label>
          <input
            type="text"
            onChange={adddata}
            placeholder={clientid.twitter || "Enter Twitter"}
            value={clientprofileBI.twitter}
            name="twitter"
            id="twitter"
            className="h-10 p-3 focus:outline-none border-[1px] w-[300px]"
          />
        </div>
      </div>
    </div>
  );
};

export default ClientRightProfileSL;
