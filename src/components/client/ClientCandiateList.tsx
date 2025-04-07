// @ts-nocheck
import React, { useContext, useEffect, useState } from "react";
import { JobIndex } from "../context/job_list_context";
import { API_GET } from "../../utils/api_structure";

const ClientCandiateList = () => {
  const { clientviewjobid, setClientViewJobId } = useContext(JobIndex);

  const [candidates, setCandidates] = useState("");

  const handleViewResume = (resume_url) => {
    // Open the resume in a new tab
    window.open(resume_url, '_blank');
  };

  async function getCandidates() {
    const URL = `client-candidates/${clientviewjobid}`;
    const { result, status } = await API_GET(URL);
    setCandidates(result);
  }

  console.log(JSON.stringify(candidates));

  useEffect(() => {
    getCandidates();
  }, []);
  return (
    <div className="w-full border-[1px] flex flex-col gap-3 p-3">
      {candidates ? (
        candidates.map((e) => {
          return (
            <div className="bg-gray-100 border-[1px] w-full flex justify-between gap-3 p-3">
              <div className="flex gap-2 font-roboto">
                <div>
                  <img src={
                    e.candidate_profile_pic ?
                        `uploads/profile_pic/${e.candidate_profile_pic}` :
                        'ProfilePic.png'
                  } alt="" className="object-fill w-[130px]" />
                </div>
                <div className="flex flex-col justify-center">
                  <h1 className="text-xl font-bold">{e.candidate_name}</h1>
                  <span>
                    <strong>Email:</strong> {e.candidate_email}
                  </span>
                  <span>
                    <strong>Phone no:</strong>+91 {e.candidate_phone}
                  </span>
                  <span>
                    <strong>Applied Date: </strong>{e.application_date}
                  </span>
                </div>
              </div>
              <div>
                {/* // Add a button to change the status of the candidate */}
              </div>
              <div className="flex w-[200px] items-center justify-center">
                <button onClick={() => handleViewResume(`uploads/resume/${e.candidate_resume}`)}>
                  <img src="icons/pdf.png" alt="" className="w-[80px]" />
                </button>
              </div>
            </div>
          );
        })
      ) : (
        <div>No candidates applied</div>
      )}
    </div>
  );
};

export default ClientCandiateList;
