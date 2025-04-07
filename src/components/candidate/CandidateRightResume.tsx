// @ts-nocheck
import React, { useContext, useRef } from "react";
import { JobIndex } from "../context/job_list_context";
import { API_POST_PIC,API_DELETE, API_GET, API_POST } from "../../utils/api_structure";

const CandidateRightResume = () => {
  const fileInputRef = useRef(null);
  const { candidateid, setCandidateId } = useContext(JobIndex);
  const candidateDetails = candidateid[0] || [];

  async function getCandidateDeatils() {
    const URL = `candidate/${candidateDetails.id}`
    const {result,status} = await API_POST(URL, "delete");
    setCandidateId(result);
  }

  const handleButtonClikc = () => {
    fileInputRef.current.click();
  };

  async function putFile(formData) {
    const URL = "upload-resume";
    const { result, status } = await API_POST_PIC(URL, formData);
    console.log(JSON.stringify(result));
    getCandidateDeatils();
  }

  async function removeFile() {
    const URL = `remove-resume/${candidateDetails.resume_name}/${candidateDetails.id}`;
    const {result, status} = await API_DELETE(URL)
    console.log(JSON.stringify(result));
    getCandidateDeatils()
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
  return (
    <div className="w-full border-[1px] gap-4 flex flex-col p-5">
      <div>
        <h1 className="text-2xl font-semibold text-purple-button">RESUMES</h1>
      </div>
      <div className="w-full border-t-[1px] border-gray-100" />
      {candidateDetails.resume_name ? (
        <div className="flex items-center justify-between border-[1px] p-3">
          <div className="flex items-center">
            <img src="icons/pdf.png" alt="" className="w-[70px]" />
            <h1 className="font-medium text-lg">
              {candidateDetails.resume_name}
            </h1>
          </div>
          <div className="flex items-center justify-center">
            <button onClick={removeFile}>
              <img src="SVG/Delete.svg" alt="" className="w-6" />
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center w-full border-[1px] border-gray-300 bg-white h-[300px]">
          <img src="SVG/file-text.svg" className="w-32" alt="" />
          <button
            onClick={handleButtonClikc}
            className="ease-in-out duration-500 font-bold font-inter text-xl bg-gray-400 hover:bg-gray-700 py-2 px-3 text-white rounded-full"
          >
            Add Resume
          </button>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
      )}
    </div>
  );
};

export default CandidateRightResume;
