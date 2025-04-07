// @ts-nocheck
import React, { useContext, useEffect, useState } from "react";
import Job_LeftSection from "./Job_LeftSection";
import Job_RightSection from "./Job_RightSection";
import { JobIndex } from "../../context/job_list_context";
import fetchskills from "../../../utils/fetchskill";
import { API_GET, API_POST } from "../../../utils/api_structure";
import { data } from "autoprefixer";
import Apply from "./apply";

interface Job {
  job_id: string;
  job_title: string;
  salary: string;
  experience: string;
  education: string;
  date_posted: string;
  job_org: string;
  location: string;
  image_url: string;
  job_description: string;
}

const JobSection = () => {
  const {
    job_index,
    setJobIndex,
    setSkill,
    skill,
    job_Data,
    setData,
    jobdata,
    setJobs,
    jobNav,
    setJobNav,
  } = useContext(JobIndex);

  async function skillfetch(key) {
    const URL = `skill/${key.id}`;
    const { result, status } = await API_POST(URL, "skill");
    setSkill(result);
  }

  async function jobs() {
    const URL = `jobs`;
    const { result, status } = await API_GET(URL);
    setJobs(result);
    setJobIndex(result[0]);
    skillfetch(result[0]);
  }

  useEffect(() => {
    if (!jobNav) {
      jobs();
    }
  }, []);

  return (
    <div className="w-full h-[1000px] flex flex-row gap-1">
      <div className=" w-[550px] ml-1 h-[150vh] overflow-y-auto">
        <Job_LeftSection jobdata={jobdata} />
      </div>
      <div className="w-[1px] h-auto bg-gray-300" />
      <div className=" w-[950px] grow overflow-x-auto">
        <Job_RightSection jobdata={jobdata} />
      </div>
    </div>
  );
};

export default JobSection;
