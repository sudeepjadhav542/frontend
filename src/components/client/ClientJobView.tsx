// @ts-nocheck
import React, { useContext, useEffect, useState } from "react";
import { JobIndex } from "../context/job_list_context";
import DropDownMenu from "../candidate/DropDownMenu";
import {
  education,
  experience,
  Job_Type,
  sector,
  state,
} from "../../Data/Jobs/Categories/Cat_data";
import DropDownMulti from "./DropDownMulti";
import { API_GET, API_PATCH_AUTH, API_POST } from "../../utils/api_structure";
import { cities } from "../../Data/cities";
import { toast } from "react-toastify";

const ClientJobView = () => {
  const { clientviewjobid, setClientViewJobId, clientid, setClientId } =
    useContext(JobIndex);

  const [jobD, setJobD] = useState("");
  const [city, setCity] = useState([]);
  const [skills, setSkills] = useState([]);

  const [jobdetails, setJobDetails] = useState({
    job_org: clientid["company_name"],
    job_title: "",
    job_description: "",
    job_sector: "",
    job_pincode: "",
    job_type: "",
    job_exp: "",
    job_salary: "",
    job_education: "",
    city: "",
    state: "",
    job_skill: [],
    client_id: clientid["id"],
  });

  console.log(jobdetails);
  console.log(clientid);

  const addDataMenu = (name, value) => {
    setJobDetails(() => {
      return {
        ...jobdetails,
        [name]: value,
      };
    });
  };

  const adddata = (e) => {
    const { name, value } = e.target;
    setJobDetails(() => {
      return {
        ...jobdetails,
        [name]: value,
      };
    });
  };

  async function updateJobDetails() {
    const URL = `client-update-job/${clientviewjobid}`;
    const { result, status } = await API_PATCH_AUTH(URL, jobdetails);
    toast.success("Job Updated Successfully", {
      position: "top-center",
      theme: "light",
      closeOnClick: true,
      pauseOnHover: true,
    });
    getJobDetails();
  }

  async function getAllSkills() {
    const URL = "skills";
    const { result, status } = await API_GET(URL);
    setSkills(result);
    console.log(JSON.stringify(result));
  }

  // async function getjobSkills() {
  //   const URL = `skill/${clientviewjobid}`;
  //   const { result, status } = await API_POST(URL, "skills");
  //   console.log(JSON.stringify(result));
  //   setJobDetails(() => {
  //     return {
  //       ...jobdetails,
  //       ["job_skill"] : result.map(item => item.skill_name)
  //     }
  //   })
  // }

  async function getJobDetails() {
    const URL = `job/${clientviewjobid}`;
    const { result, status } = await API_GET(URL);
    setJobD(result);
  }

  console.log(JSON.stringify(jobD));
  useEffect(() => {
    getJobDetails();
    getAllSkills();
    // getjobSkills();
  }, []);

  let newarr = cities[0]["cities"];
  var result, new_skill;

  if (Array.isArray(newarr)) {
    result = newarr.map((item, index) => ({
      value: index + 1,
      label: item,
    }));
    new_skill = skills.map((item, index) => ({
      value: index + 1,
      label: item.skill_name,
    }));
    // console.log(JSON.stringify(result));
  } else {
    // console.error("newarr is not an array or is undefined.");
  }

  // console.log(new_skill);

  return (
    <div className="border-[1px] p-3">
      <div>
        <h1 className="text-3xl font-semibold text-purple-button mb-2">EDIT</h1>
        <div className="border-b-[1px] w-full h-[1px] mb-7" />
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex flex-col">
          <label htmlFor="job_title" className="text-lg font-medium">
            Job Title
          </label>
          <input
            type="text"
            onChange={adddata}
            placeholder={jobD.job_title || "Enter Job Title"}
            value={jobdetails.job_title}
            name="job_title"
            id="job_title"
            className="border-[1px] p-2 w-[500px] outline-none rounded-md"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="job_description" className="text-lg font-medium">
            Job Description
          </label>
          <textarea
            className="border-[1px] outline-none px-3 py-2"
            rows={10}
            name="job_description"
            value={jobdetails.job_description}
            onChange={adddata}
            id="job_description"
            form="post_job"
            placeholder={jobD.job_description || "Job Description"}
          ></textarea>
        </div>
        <div className="flex gap-3 justify-between">
          <div className="flex gap-2 items-center">
            <label htmlFor="job_sector" className="font-medium text-lg">
              Job Sector
            </label>
            <div className="w-[200px]">
              <DropDownMenu
                options={sector}
                name={jobD.sector || "Select Sector"}
                onchange={addDataMenu}
                id={"job_sector"}
                selectedOption={undefined}
                setSelected={undefined}
              />
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <label htmlFor="job_type" className="font-medium text-lg">
              Job Type
            </label>
            <div className="w-[200px]">
              <DropDownMenu
                options={Job_Type}
                name={jobD.job_type || "Select Job Type"}
                onchange={addDataMenu}
                id={"job_type"}
                selectedOption={undefined}
                setSelected={undefined}
              />
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <label htmlFor="job_exp" className="font-medium text-lg">
              Experience
            </label>
            <DropDownMenu
              options={experience}
              name={jobD.experience || "Select Experience"}
              selectedOption={undefined}
              setSelected={undefined}
              onchange={addDataMenu}
              id={"job_exp"}
            />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="job_skill" className="text-lg font-medium">
            Add Skills
          </label>
          <DropDownMulti
            options={new_skill}
            name={"Select Skills"}
            selectedOption={undefined}
            setSelected={undefined}
            onchange={addDataMenu}
            id={"job_skill"}
          />
        </div>
        <div className="flex gap-3 justify-around">
          <div className="flex gap-2 items-center">
            <label htmlFor="job_salary" className="font-medium text-lg">
              Salary
            </label>
            <input
              type="text"
              className="border-[1px] p-2 outline-none hover:border-purple-button rounded-md"
              onChange={adddata}
              placeholder={jobD.salary || "Enter Job Salary"}
              value={jobdetails.job_salary}
              name="job_salary"
              id="job_salary"
            />
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="" className="text-lg font-medium">
              Education Level
            </label>
            <div className="w-[250px]">
              <DropDownMenu
                options={education}
                name={jobD.education || "Select Education Level"}
                selectedOption={undefined}
                setSelected={undefined}
                onchange={addDataMenu}
                id={"job_education"}
              />
            </div>
          </div>
        </div>
        <div className="flex gap-3 justify-around">
          <div className="flex items-center gap-2">
            <label htmlFor="city" className="text-lg font-medium">
              City
            </label>
            <div className="w-[200px]">
              <DropDownMenu
                options={result}
                name={jobD.city || "Select City"}
                selectedOption={undefined}
                setSelected={undefined}
                onchange={addDataMenu}
                id={"city"}
              />
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <label htmlFor="job_state" className="text-lg font-medium">
              State
            </label>
            <div className="w-[200px]">
              <DropDownMenu
                options={state}
                selectedOption={undefined}
                setSelected={undefined}
                onchange={addDataMenu}
                id={"state"}
                name={jobD.state || "Enter State"}
              />
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <label htmlFor="job_pincode" className="text-lg font-medium">
              Pincode
            </label>
            <input
              type="text"
              onChange={adddata}
              placeholder={jobD.pincode || "Enter Pincode"}
              value={jobdetails.job_pincode}
              name="job_pincode"
              id="job_pincode"
              className="border-[1px] p-2 rounded-[4px] outline-none hover:border-purple-button"
            />
          </div>
        </div>

        <button
          onClick={updateJobDetails}
          className="bg-purple-button w-32 py-2 text-white font-inter font-semibold rounded-md"
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default ClientJobView;
