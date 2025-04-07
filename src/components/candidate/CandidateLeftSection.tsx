// @ts-nocheck
import React, { useRef, useContext, useState } from "react";
import { JobIndex } from "../context/job_list_context";
import { API_POST, API_POST_PIC } from "../../utils/api_structure";
import { toast } from "react-toastify";

const CandidateLeftSection = () => {
  const { candidateid, setCandidateId, profiletype, setProfileType } =
    useContext(JobIndex);

  console.log(candidateid);

  const candidateDetails = candidateid[0] || [];

  console.log(candidateDetails);

  const fileInputRef = useRef(null);

  const Click = (type) => {
    setProfileType(type);
  };

  const handleButtonClikc = () => {
    fileInputRef.current.click();
  };

  async function getCandidateDeatils() {
    const URL = `candidate/${candidateDetails.id}`;
    const { result, status } = await API_POST(URL, "delete");
    setCandidateId(result);
  }

  async function putFile(formData) {
    const URL = "upload-profile-pic";
    const { result, status } = await API_POST_PIC(URL, formData);
    console.log(JSON.stringify(result));
    getCandidateDeatils();
    if (status == 200) {
      toast.success("Photo Updated Successfully", {
        position: "top-center",
        theme: "light",
        closeOnClick: true,
        pauseOnHover: true,
      });
    }
  }

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files && event.target.files[0];
    if (!file) {
      console.log("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("candidate_id", candidateDetails.id);

    putFile(formData);
    // console.log(formData.values());
  };
  console.log(candidateDetails);
  // if(candidateDetails.profile_url) {
  //    setProfileUrl(`uploads/profile_pic/${candidateDetails.profile_url}`);
  // } else {
  //    setProfileUrl("ProfilePic.png");
  // }

  // console.log(profileURL);

  return (
    <div className="bg-white w-[300px]">
      <div className="w-full flex flex-col items-center gap-5 p-3 border-x-[1px] border-t-[1px]">
        <img
          src={
            candidateDetails.profile_url
              ? `uploads/profile_pic/${candidateDetails.profile_url}`
              : "ProfilePic.png"
          }
          className="w-[180px] h-[180px] rounded-full object-fill"
        />
        <button
          onClick={handleButtonClikc}
          className="ease-in-out duration-500 hover:bg-purple-button hover:text-white text-purple-button rounded-full px-5 py-2 font-inter font-medium border-purple-button border-[2px] border-solid"
        >
          Upload Photo
        </button>
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileChange}
        />
        <h1 className="font-roboto text-2xl font-semibold">
          {candidateDetails.first_name} {candidateDetails.last_name}
        </h1>
      </div>
      <div className="flex flex-col text-gray-900 text-lg">
        <button
          onClick={() => Click("profile")}
          className="ease-in-out duration-500 focus:text-purple-button border-t-[1px] border-x-[1px] p-2 hover:text-purple-button cursor-pointer"
        >
          My Profile
        </button>
        <button
          onClick={() => Click("jobs")}
          className="ease-in-out duration-500 focus:text-purple-button border-t-[1px] border-x-[1px] p-2 hover:text-purple-button cursor-pointer"
        >
          My Jobs
        </button>
        <button
          onClick={() => Click("resume")}
          className="ease-in-out duration-500 focus:text-purple-button border-t-[1px] border-x-[1px] p-2 hover:text-purple-button cursor-pointer"
        >
          My Resumes
        </button>
        <button
          onClick={() => Click("cp")}
          className="ease-in-out duration-500 focus:text-purple-button border-y-[1px] border-x-[1px] p-2 hover:text-purple-button cursor-pointer"
        >
          Change Password
        </button>
      </div>
    </div>
  );
};

export default CandidateLeftSection;
