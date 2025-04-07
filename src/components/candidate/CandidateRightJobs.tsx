// @ts-nocheck
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { JobIndex } from "../context/job_list_context";
import { API_GET, API_POST } from "../../utils/api_structure";
import { dividerClasses } from "@mui/material";
import fetchskills from "../../utils/fetchskill";

const CandidateRightJobs = () => {
  const {
    candidateid,
    setCandidateId,
    job_index,
    setJobIndex,
    jobNav,
    setJobNav,
    jobdata,
    setJobs,
    setSkill,
  } = useContext(JobIndex);
  const candidateDetails = candidateid[0] || [];
  const [candidate_liked_jobs, setCandidateLikedJobs] = useState("");
  const [candidate_applied_jobs, setCandidateAppliedJobs] = useState("");

  const history = useNavigate();

  async function skillfetch(key) {
    const URL = `skill/${key.id}`;
    const { result, status } = await API_POST(URL, "skill");
    setSkill(result);
  }

  async function getLikedJobs() {
    const URL = `liked-job/${candidateDetails.id}`;
    const { result, status } = await API_GET(URL);
    console.log(JSON.stringify(result));
    setCandidateLikedJobs(result);
  }

  async function getAppliedJobs() {
    const URL = `applied-jobs/${candidateDetails.id}`;
    const { result, status } = await API_GET(URL);
    console.log("Applied_jobs: " + JSON.stringify(result));
    setCandidateAppliedJobs(result);
  }

  const viewButtonLike = (e) => {
    history("/jobs");
    setJobs(candidate_liked_jobs);
    setJobIndex(e);
    skillfetch(e);
    setJobNav(true);
  }

  const viewButton = (e) => {
    history("/jobs");
    setJobs(candidate_applied_jobs);
    setJobIndex(e);
    skillfetch(e);
    setJobNav(true);
  };

  useEffect(() => {
    getLikedJobs();
    getAppliedJobs();
  }, []);
  return (
    <div className="w-full border-[1px] gap-4 flex flex-col p-5">
      <div>
        <h1 className="text-2xl font-semibold text-purple-button">
          APPLIED JOBS
        </h1>
      </div>
      <div className="w-full border-t-[1px] border-gray-100" />
      {candidate_applied_jobs ? (
        candidate_applied_jobs.map((e) => {
          return (
            <div className="flex items-center justify-between border-[1px] p-3">
              <div className="flex items-center gap-3">
                <div className="border-[1px] border-gray-200">
                  <img
                    className="w-32 h-32 object-contain"
                    src={e.image_url}
                    alt=""
                  />
                </div>
                <div className="flex flex-col">
                  <div className="flex flex-col">
                    <h1 className="text-lg text-purple-button font-medium">
                      @{e.job_org}
                    </h1>
                    <h1 className="text-xl font-medium font-roboto">
                      {e.job_title}
                    </h1>
                    <div className="flex text-base items-center">
                      <img
                        className="w-5"
                        src="SVG/Jobs-Page/Filter.svg"
                        alt=""
                      />
                      <h1>{e.sector}</h1>
                      <img className="w-5" src="SVG/Calendar.svg" alt="" />
                      <h1>{e.application_date}</h1>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-1 mr-4">
                <div className="bg-yellow-300 flex justify-center  rounded-full px-3 py-2 text-white font-bold">
                  {e.status}
                </div>
                <button
                  onClick={() => viewButton(e)}
                  className="bg-white text-purple-button border-[1px] border-purple-button font-medium rounded-full px-5 py-2"
                >
                  View
                </button>
              </div>
            </div>
          );
        })
      ) : (
        <div>No jobs</div>
      )}

      <div className="w-full border-t-[1px] border-gray-100" />
      <div>
        <h1 className="text-2xl font-semibold text-purple-button">
          LIKED JOBS
        </h1>
      </div>
      <div className="w-full border-t-[1px] border-gray-100" />
      {candidate_liked_jobs ? (
        candidate_liked_jobs.map((e) => {
          return (
            <div className="flex items-center justify-between border-[1px] p-3">
              <div className="w-full flex items-center gap-3">
                <div className="border-[1px] border-gray-200">
                  <img
                    className="w-32 h-32 object-contain"
                    src={e.image_url}
                    alt=""
                  />
                </div>
                <div className="flex justify-between w-[800px] h-auto">
                  <div className="flex flex-col">
                    <h1 className="text-lg text-purple-button font-medium">
                      @{e.job_org}
                    </h1>
                    <h1 className="text-xl font-bold font-roboto">
                      {e.job_title}
                    </h1>
                    <div className="flex text-base items-center">
                      <img
                        className="w-5"
                        src="SVG/Jobs-Page/Filter.svg"
                        alt=""
                      />
                      <h1>{e.sector}</h1>
                      <img className="w-5" src="SVG/Calendar.svg" alt="" />
                      <h1>{e.Posted_Date}</h1>
                    </div>
                  </div>
                  <div className="flex items-center justify-center ">
                    <button onClick={() => viewButtonLike(e)} className="bg-white text-purple-button border-[1px] border-purple-button font-medium rounded-full px-5 py-2">
                      View
                    </button>
                  </div>
                </div>
              </div>
              {/* <div className="flex flex-col gap-1 mr-4">
              <div className="bg-yellow-300 flex justify-center  rounded-full px-3 py-2 text-white font-bold">
                Pending
              </div>
              <div className=" flex gap-2">
                <button className="bg-white text-purple-button border-[1px] border-purple-button font-medium rounded-full px-5 py-2">
                  View
                </button>
                <button className="bg-red-500 px-4 py-2 rounded-full text-white font-medium">
                  Delete
                </button>
              </div>
            </div> */}
            </div>
          );
        })
      ) : (
        <div>No Jobs</div>
      )}
    </div>
  );
};

export default CandidateRightJobs;
