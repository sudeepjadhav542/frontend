// @ts-nocheck
import React, { useContext, useState } from "react";
import { JobIndex } from "../context/job_list_context";

const CandidateProfileSL = () => {
  // const [profileBI, setProfileBI] = useState({
  //   linkedin: "",
  //   facebook: "",
  //   twitter: "",
  //   state: "",
  //   city: "",
  // });

  
  const adddata = (e) => {
    const { name, value } = e.target;
    
    setProfileBI(() => {
      return {
        ...profileBI,
        [name]: value,
      };
    });
  };
  
  const { candidateid, setCandidateId, profileBI, setProfileBI } = useContext(JobIndex);
  console.log(profileBI);

  const candidateDetails = candidateid[0] || [];
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
            placeholder={candidateDetails.linkedin || "Enter LinkedIn"}
            value={profileBI.linkedin}
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
            placeholder={candidateDetails.facebook || "Enter Facebook"}
            value={profileBI.facebook}
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
            placeholder={candidateDetails.twitter || "Enter Twitter"}
            value={profileBI.twitter}
            name="twitter"
            id="twitter"
            className="h-10 p-3 focus:outline-none border-[1px] w-[300px]"
          />
        </div>
      </div>
    </div>
  );
};

export default CandidateProfileSL;
