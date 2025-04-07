// @ts-nocheck
import React, { useContext, useEffect, useState } from "react";
import { JobIndex } from "../context/job_list_context";
import { API_GET } from "../../utils/api_structure";

const ClientRightJobs = () => {
  const {
    clientid,
    setClientId,
    clientprofiletype,
    setClientProfileType,
    clientviewjobid,
    setClientViewJobId,
  } = useContext(JobIndex);
  const [clientJobs, setClientJobs] = useState("");

  console.log(clientid.id);

  async function getJobs() {
    const URL = `client-jobs/${clientid.id}`;
    const { result, status } = await API_GET(URL);
    console.log(JSON.stringify(result));

    setClientJobs(result);
  }

  console.log(clientJobs);

  const senddata = (id) => {
    setClientProfileType("view-job");
    setClientViewJobId(id);
  };

  const viewButton = (id) => {
    setClientProfileType("candidate-list");
    setClientViewJobId(id);
  }

  useEffect(() => {
    getJobs();
  }, []);
  return (
    <div className="w-full border-[1px] bg-gray-100  p-3 flex-grow">
      {clientJobs ? (
        clientJobs.map((e) => {
          return (
            <div className="w-full bg-white h-[150px] flex border-[1px] p-3">
              <div className="bg-white flex flex-col gap-3">
                <h1 className="text-xl font-medium">{e.job_title}</h1>
                <div className="flex items-center gap-2">
                  <img src="SVG/Calendar.svg" className="w-5" alt="" />
                  <span className="text-sm">Created: {e.job_date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <img src="SVG/Calendar.svg" alt="" className="w-5" />
                  <span className="text-sm">
                    Deadline:{" "}
                    <strong className="text-red-600 font-normal">
                      03/10/2024
                    </strong>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <img src="SVG/Jobs-Page/Filter.svg" className="w-5" alt="" />
                  <span className="text-sm">Customer Service</span>
                </div>
              </div>
              <div className="bg-white flex h-full items-center justify-center gap-3 flex-grow">
                <div className="text-green-500">{e.job_status}</div>
                <div className="text-purple-600">
                  {e.job_applied} Applicants
                </div>
              </div>
              <div className="bg-white flex flex-col justify-center items-center w-32 gap-2">
                <button onClick={() => {
                  viewButton(e.job_id);
                }} className="bg-green-500 text-white font-inter font-medium w-20 py-1 rounded-full">
                  View
                </button>
                <button
                  onClick={() => {
                    senddata(e.job_id);
                  }}
                  className="bg-gray-500 text-white font-inter font-medium w-20 py-1 rounded-full"
                >
                  Edit
                </button>
                <button className="bg-red-500 text-white font-inter font-medium w-20 py-1 rounded-full">
                  Delete
                </button>
              </div>
            </div>
          );
        })
      ) : (
        <div>No Jobs Posted</div>
      )}
    </div>
  );
};

export default ClientRightJobs;
