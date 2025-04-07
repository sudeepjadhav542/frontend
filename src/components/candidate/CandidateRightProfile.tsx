// @ts-nocheck
import React, { useContext } from "react";
import CandidateProfileBI from "./CandidateProfileBI";
import CandidateProfileSL from "./CandidateProfileSL";
import CandidateProfileAL from "./CandidateProfileAL";
import { JobIndex } from "../context/job_list_context";
import { API_PATCH_AUTH,API_POST } from "../../utils/api_structure";
import { toast } from "react-toastify";

const CandidateRightProfile = () => {
  const { profileBI, setProfileBI, candidateid, setCandidateId,token,setToken } =
    useContext(JobIndex);
  const candidateDetails = candidateid[0] || [];

  async function getCandidateDeatils() {
    const URL = `candidate/${candidateDetails.id}`;
    const { result, status } = await API_POST(URL, "get");
    setCandidateId(result);
  }

  async function updateDetails() {

    const URL = `update/${candidateDetails.id}`;
    console.log("Token: "+token);
    const { result, status } = await API_PATCH_AUTH(
      URL,
      profileBI,
      token
    );
    getCandidateDeatils()
    if(status == 200){
      toast.success("Details Updated Successfully", {
        position: "top-center",
        theme: "light",
        closeOnClick: true,
        pauseOnHover: true,
      });
    }
  }
  console.log(candidateDetails);
  
  return (
    <div className="flex flex-col gap-5">
      <CandidateProfileBI />
      <CandidateProfileSL />
      <CandidateProfileAL />
      <button
        onClick={updateDetails}
        className="bg-purple-button w-[200px] py-2 text-lg font-medium font-inter text-white rounded-md"
      >
        Save Settings
      </button>
    </div>
  );
};

export default CandidateRightProfile;
