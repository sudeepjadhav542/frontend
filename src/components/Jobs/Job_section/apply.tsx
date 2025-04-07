// @ts-nocheck
import React, { useContext } from "react";
import { JobIndex } from "../../context/job_list_context";

const Apply = () => {
  const { candidateid, setCandidateId } = useContext(JobIndex);
  const candidateDetails = candidateid[0] || [];
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-black bg-opacity-70">
      <div className="w-[500px] h-[250px] bg-white p-5 flex flex-col gap-3">
        <div className="flex w-full justify-between">
          <h1 className="font-bold font-inter text-xl">Select Resume</h1>
          <button>
            <img src="SVG/Cross-Logo.svg" alt="" className="w-5" />
          </button>
        </div>
        <button className="focus:bg-purple-300">
          <div className="flex items-center gap-3 border-[1px] p-3">
            <img className="w-20" src="icons/pdf.png" alt="" />
            <h1>{candidateDetails.resume_name}</h1>
          </div>
        </button>
        <div className="flex w-full justify-end mt-2">
            <button className="bg-purple-600 text-white font-semibold rounded-md py-2 px-3">Submit</button>
        </div>
      </div>
    </div>
  );
};

export default Apply;
