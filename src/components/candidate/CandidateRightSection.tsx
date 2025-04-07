// @ts-nocheck
import React, { useContext } from "react";
import { JobIndex } from "../context/job_list_context";
import CandidateRightProfile from "./CandidateRightProfile";
import CandidateRightJobs from "./CandidateRightJobs";
import CandidateRightCP from "./CandidateRightCP";
import CandidateRightResume from "./CandidateRightResume";

const CandidateRightSection = () => {

  const { profiletype, setProfileType } = useContext(JobIndex);
  return (
    <div className="bg-white flex-grow">
      {profiletype === "profile" ? (
        <CandidateRightProfile />
      ) : profiletype === "jobs" ? (
        <CandidateRightJobs />
      ) : (
        profiletype === "resume" ? (
          <CandidateRightResume />
        ) : (
          <CandidateRightCP />
        )
      )}
    </div>
  );
};

export default CandidateRightSection;
