// @ts-nocheck
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_GET, API_POST, API_POST_APPLY } from "../utils/api_structure";
import { JobIndex } from "../components/context/job_list_context";
import { toast } from "react-toastify";
import { dangerouslySetInnerHTML } from "react-dom/server";
import { Helmet } from "react-helmet";

const JobView = () => {
  const { id } = useParams<{ id: string }>();
  const [job, setJob] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [skill, setSkill] = useState<any>(null);
  const { userLogin, setUserLogin, candidateid, setCandidateId } =
    useContext(JobIndex);

  const candidateDetails = candidateid[0] || [];

  const jdFormat = (job_description) => {
    return job_description.replace(/\n/g, "<br>");
  };

  async function skillfetch(key) {
    const URL = `skill/${key}`;
    const { result, status } = await API_POST(URL, "skill");
    setSkill(result);
  }

  async function getJobDetails() {
    const URL = `jobview/${id}`;
    const { result, status } = await API_GET(URL);
    console.log(JSON.stringify(result));
    result.job_description = jdFormat(result.job_description);
    setJob(result);
    skillfetch(result.id);
  }

  async function likejob(can_id, job_id) {
    const URL = "job-liked";
    const { result, status } = await API_POST(URL, {
      can_id: can_id,
      job_id: job_id,
    });
  }

  async function applyJob() {
    const URL = "apply-job";
    const { result } = await API_POST_APPLY(URL, {
      can_id: candidateDetails.id,
      job_id: job.id,
    });
  }

  const likeButton = () => {
    if (userLogin) {
      likejob(candidateDetails.id, job.id);
    } else {
      toast.warn("Oops! Not Logged In Yet. Please Sign In", {
        position: "bottom-left",
        theme: "light",
        closeOnClick: true,
        pauseOnHover: true,
        style: { width: "370px", backgroundColor: "#fee2e2" },
      });
    }
  };

  const applyButton = () => {
    if (userLogin) {
      applyJob();
    } else {
      toast.warn("Oops! Not Logged In Yet. Please Sign In", {
        position: "bottom-left",
        theme: "light",
        closeOnClick: true,
        pauseOnHover: true,
        style: { width: "370px", backgroundColor: "#fee2e2" },
      });
    }
  };

  console.log(JSON.stringify(job));

  useEffect(() => {
    getJobDetails();
  }, []);
  const jsonLd = {
    "@context": "http://schema.org",
    "@type": "JobPosting",
    "title": job?.job_title,
    "hiringOrganization": { "@type": "Organization", "name": job?.job_org },
    "jobLocation": { "@type": "Place", "address": job?.city },
    "datePosted": job?.Posted_Date,
    "baseSalary": {
      "@type": "MonetaryAmount",
      "currency": "INR",
      "value": job?.salary,
    },
    "description": job?.job_description,
  };

  if (!job) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col p-5 gap-5 bgred">
    <Helmet>
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>
      <div className="bg-white w-full flex flex-col gap-6 pt-5">
        <div className="flex items-center gap-5">
          <img
            src={`/${job.image_url}`}
            alt=""
            className="w-[100px] h-[100px] object-contain bg-white 
                     border-gray-300 drop-shadow-lg border-[1px]"
          />
          <h1 className="font-inter text-xl">{job.job_org}</h1>
        </div>
        <div className="flex items-center justify-between px-2">
          <div>
            <div>
              <h1 className="text-2xl font-medium">{job.job_title}</h1>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <div>{job.city}</div>
              <div className="w-[1px] h-5 bg-gray-300 mt-[2px]" />
              <div>Posted: {job.Posted_Date}</div>
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
          {/* <h1>
            <strong>Job ID :</strong>
            {job.job_id}
          </h1> */}
          <h1>
            <strong>Salary :</strong>
            {job.salary}
          </h1>
          <h1>
            <strong>Experience :</strong>
            {job.experience}
          </h1>
          <h1>
            <strong>Education Level :</strong>
            {job.education}
          </h1>
        </div>
        <h1 className="font-inter text-xl font-bold my-4">About the role</h1>
        <p
          dangerouslySetInnerHTML={{ __html: job.job_description }}
          className="font-inter"
        ></p>
        <h1 className="font-inter text-xl font-bold my-4">Required skills</h1>
        <div className="flex gap-5 flex-wrap">
          {!skill ? (
            <div>Loading...</div>
          ) : (
            skill.map((e, key) => {
              return (
                <div key={key} className="bg-gray-400 px-3 py-2 rounded-full">
                  <h1 className="font-inter">{e.skill_name}</h1>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default JobView;
