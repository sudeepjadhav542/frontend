// @ts-nocheck
import React, { useEffect, useState, useContext } from "react";
import {
  sector,
  Job_Type,
  experience,
  state,
  education,
} from "../../Data/Jobs/Categories/Cat_data";
import { cities } from "../../Data/cities";
import DropDownMenu from "../candidate/DropDownMenu";
import DropDownMulti from "./DropDownMulti";
import { API_GET, API_POST1, API_POST_CITY } from "../../utils/api_structure";
import { JobIndex } from "../context/job_list_context";
import { toast } from "react-toastify";

const ClientRightPostJobs = () => {
  const { clientid, setClientId } = useContext(JobIndex);
  const [jobdetails, setJobDetails] = useState({
    job_org: clientid["company_name"],
    job_title: "",
    job_description: "",
    job_sector: "",
    job_pincode: "",
    job_type: "",
    job_exp: [],
    job_salary: "",
    job_education: "",
    city: [],
    state: "",
    job_skill: [],
    client_id: clientid["id"],
  });

  console.log(jobdetails);

  const [city, setCity] = useState([]);
  const [skills, setSkills] = useState([]);

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

  async function senddata() {
    const URL = "post-job";
    try {
      const { result, status } = await API_POST1(URL, jobdetails);
      if (status === 200) {
        toast.success("Job Posted", {
          position: "top-center",
          theme: "light",
          closeOnClick: true,
          pauseOnHover: true,
        });
      } else {
        toast.error(`Failed to post job: ${result.message}`, {
          position: "top-center",
          theme: "light",
          closeOnClick: true,
          pauseOnHover: true,
        });
      }
    } catch (error) {
      toast.error("Error posting job", {
        position: "top-center",
        theme: "light",
        closeOnClick: true,
        pauseOnHover: true,
      });
      console.error("Error Details:", error);
    }
  }

  async function getAllSkills() {
    const URL = "skills";
    const { result, status } = await API_GET(URL);
    setSkills(result);
  }

  useEffect(() => {
    getAllSkills();
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
  } else {
    console.error("newarr is not an array or is undefined.");
  }

  return (
    <div className="border-[1px] p-3">
      <div>
        <h1 className="text-3xl font-semibold text-purple-button mb-2">
          POST A JOB
        </h1>
        <div className="border-b-[1px] w-full h-[1px] mb-7" />
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex gap-10">
          <div className="flex flex-col">
            <label htmlFor="job_title" className="text-lg font-medium">
              Job Title
            </label>
            <input
              type="text"
              onChange={adddata}
              placeholder="Enter Job Title"
              value={jobdetails.job_title}
              name="job_title"
              id="job_title"
              className="border-[1px] p-2 w-[500px] outline-none rounded-md"
            />
          </div>
          <div className="flex flex-col ">
            <label htmlFor="job_type" className="font-medium text-lg">
              Job Type
            </label>
            <div className="w-[200px]">
              <DropDownMenu
                options={Job_Type}
                name={"Select Job Type"}
                onchange={addDataMenu}
                id={"job_type"}
                selectedOption={undefined}
                setSelected={undefined}
              />
            </div>
          </div>
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
            placeholder="Job Description"
          ></textarea>
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="job_skill" className="text-lg font-medium">
            Job Skills
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
        <div className="flex gap-3 justify-between">
          <div className="flex gap-2 items-center">
            <label htmlFor="job_sector" className="font-medium text-lg">
              Job Sector
            </label>
            <div className="w-[200px]">
              <DropDownMenu
                options={sector}
                name={"Select Sector"}
                onchange={addDataMenu}
                id={"job_sector"}
                selectedOption={undefined}
                setSelected={undefined}
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="" className="text-lg font-medium">
              Education Level
            </label>
            <div className="w-[250px]">
              <DropDownMenu
                options={education}
                name={"Select Education Level"}
                selectedOption={undefined}
                setSelected={undefined}
                onchange={addDataMenu}
                id={"job_education"}
              />
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <label htmlFor="job_exp" className="font-medium text-lg">
              Experience
            </label>
            <DropDownMulti
              options={experience}
              name={"Select Experience"}
              selectedOption={undefined}
              setSelected={undefined}
              onchange={addDataMenu}
              id={"job_exp"}
            />
          </div>
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
              placeholder="Enter Job Salary"
              value={jobdetails.job_salary}
              name="job_salary"
              id="job_salary"
            />
          </div>
        </div>
        <div className="flex gap-3 justify-around">
          <div className="flex items-center gap-2">
            <label htmlFor="city" className="text-lg font-medium">
              City
            </label>
            <div className="w-[200px]">
              <DropDownMulti
                options={result}
                name={"Select City"}
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
              <DropDownMulti
                options={state}
                name={"Select State"}
                selectedOption={undefined}
                setSelected={undefined}
                onchange={addDataMenu}
                id={"state"}
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
              placeholder="Enter Pincode"
              value={jobdetails.job_pincode}
              name="job_pincode"
              id="job_pincode"
              className="border-[1px] p-2 rounded-[4px] outline-none hover:border-purple-button"
            />
          </div>
        </div>

        <button
          onClick={senddata}
          className="bg-purple-button w-32 py-2 text-white font-inter font-semibold rounded-md"
        >
          Post
        </button>
      </div>
    </div>
  );
};

export default ClientRightPostJobs;