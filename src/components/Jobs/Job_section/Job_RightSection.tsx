// @ts-nocheck
import React, { useContext, useState, useEffect } from "react";
import { JobIndex } from "../../context/job_list_context";
import fetchskills from "../../../utils/fetchskill";
import { API_POST, API_POST_APPLY, API_POST_LIKE } from "../../../utils/api_structure";
import Apply from "./apply";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

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

const Job_RightSection = (props) => {
  const {
    job_index,
    setJobIndex,
    skill,
    setSkill,
    candidateid,
    setCandidateId,
    userLogin,
    setUserLogin,
  } = useContext(JobIndex);
  const candidateDetails = candidateid[0] || [];

  console.log(JSON.stringify(candidateDetails));

  const [resumeview, setResumeView] = useState("hidden");

  const history = useNavigate();

  // console.log("JRS JI = "+JSON.stringify(job_index));

  let text = job_index.job_description;
  let jobJD;
  if (typeof text === "string") {
    jobJD = text.replace(/\n/g, "<br>");
    const element = document.getElementById("jd");
    if (element) {
      element.innerHTML = jobJD;
    } else {
      console.log("Element not found");
    }
  } else {
    // console.log("Text is not defined or is not a string");
  }

  async function likejob(can_id, job_id) {
    const URL = "job-liked";
    const { result, status } = await API_POST_LIKE(URL, {
      can_id: can_id,
      job_id: job_id,
    });
  }

  async function applyJob() {
    const URL = "apply-job";
    const { result } = await API_POST_APPLY(URL, {
      can_id: candidateDetails.id,
      job_id: job_index.id,
    });
  }

  const applyButton = () => {
    if (userLogin) {
      if (!candidateDetails.resume_name) {
        toast.warn("Please Upload Resume", {
          position: "top-center",
          theme: "light",
          closeOnClick: true,
          pauseOnHover: true,
        });
        return;
      } else {
        applyJob();
      }
    } else {
      toast.warn("User Not Logged IN", {
        position: "top-center",
        theme: "light",
        closeOnClick: true,
        pauseOnHover: true,
      });
    }
  };

  const likeButton = () => {
    if (userLogin) {
      likejob(candidateDetails.id, job_index.id);
    } else {
      toast.warn("User Not Logged IN", {
        position: "top-center",
        theme: "light",
        closeOnClick: true,
        pauseOnHover: true,
      });
    }
  };

  const jobViewButton = () => {
    history(`/job-view/${job_index.id}`);
  };

  // console.log(JSON.stringify(skill));

  return (
    <div className="flex flex-col p-5 gap-5 border-gray-300 border-[1px]">
      <div className="bg-white w-full flex flex-col gap-6 pt-5">
        <div className="flex items-center gap-5">
          <img
            src={job_index.image_url}
            alt=""
            className="w-[100px] h-[100px] object-contain bg-white 
                     border-gray-300 drop-shadow-lg border-[1px]"
          />
          <h1 className="font-inter text-xl">{job_index.job_org}</h1>
        </div>
        <div className="flex items-center justify-between px-2">
          <div>
            <div>
              <h1
                className="text-2xl font-medium cursor-pointer"
                onClick={jobViewButton}
              >
                {job_index.job_title}
              </h1>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <div>{job_index.city}</div>
              <div className="w-[1px] h-5 bg-gray-300 mt-[2px]" />
              <div>Posted: {job_index.Posted_Date}</div>
            </div>
          </div>
          <div className="flex items-center gap-3 justify-center">
            <button
              onClick={likeButton}
              className="ease-in-out duration-300 bg-purple-500 hover:bg-purple-700 font-bold font-inter text-white py-2 px-7 rounded-full"
            >
              Like
            </button>
            <button
              onClick={applyButton}
              className="bg text-white font-inter
                               ease-in-out duration-500
                               font-bold py-2 px-7 rounded-full
                               bg-gradient-to-r from-footer-back to-purple-button
                               hover:bg-gradient-to-r hover:from-purple-button hover:to-footer-back"
            >
              Apply
            </button>
          </div>
        </div>
        <div className="w-full h-[1px] bg-gray-300" />
      </div>
      <div className=" w-full">
        <h1 className="font-inter font-bold text-2xl">Job Details</h1>
        <div className="mt-2">
          <h1>
            <strong>Job ID :</strong>
            {job_index.job_id}
          </h1>
          <h1>
            <strong>Salary :</strong>
            {job_index.salary}
          </h1>
          <h1>
            <strong>Experience :</strong>
            {job_index.experience}
          </h1>
          <h1>
            <strong>Education Level :</strong>
            {job_index.education}
          </h1>
        </div>
        <h1 className="font-inter text-xl font-bold my-4">About the role</h1>
        <p id="jd" className="font-inter"></p>
        <h1 className="font-inter text-xl font-bold my-4">Required skills</h1>
        <div className="flex gap-5 flex-wrap">
          {skill.map((e, key) => {
            return (
              <div key={key} className="bg-gray-400 px-3 py-2 rounded-full">
                <h1 className="font-inter">{e.skill_name}</h1>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Job_RightSection;
