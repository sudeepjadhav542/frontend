// @ts-nocheck
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { JobCat } from "../../../Data/JobCategories/JobCat";
import Job from "../Latest-Jobs/Jobs-grid/Job";
import { API_GET,API_POST } from "../../../utils/api_structure";
import { JobIndex } from "../../context/job_list_context";
import { convertCat } from "../../../utils/convertcat";

const JobCategories = () => {
  const {
    setSkill,
    jobNav,
    setJobNav,
    jobdata,
    setJobs,
    job_index,
    setJobIndex,
  } = useContext(JobIndex);

  const history = useNavigate();

  async function skillfetch(key) {
    const URL = `skill/${key.id}`;
    const { result, status } = await API_POST(URL, "skill");
    setSkill(result);
  }

  const fetchSectorJobs = (name) => {
    const sector = convertCat(name);
    console.log(sector);
    fetchSectorJobsApi(sector);
  };

  async function fetchSectorJobsApi(name) {
    const URL = `jobsector/${name}`;
    const { result, status } = await API_GET(URL);
    setJobs(result);
    setJobNav(true);
    setJobIndex(result[0]);
    skillfetch(result[0]);
    history("/jobs");
  }
  return (
    <div className="flex gap-28 my-12">
      {JobCat.map((e, key) => {
        return (
          <button
            onClick={() => {
              fetchSectorJobs(e.name);
            }}
          >
            <div
              key={key}
              className="relative flex flex-col items-center justify-center gap-5 px-10 py-7 w-[150px] h-[160px]"
            >
              <img src={e.icon} alt="" />
              <h2>{e.name}</h2>
              <div className="z-[-1] w-[150px] h-[160px] bg-white absolute pointer-events-none inset-0 drop-shadow-xl rounded-xl" />
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default JobCategories;
