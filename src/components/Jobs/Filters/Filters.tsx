// @ts-nocheck
import React, { useEffect, useState, useContext } from "react";
import ReactSelectWithOptimization from "./ReactSelectWithOptimization ";
import {
  date_posted,
  experience,
  sector,
  Job_Type,
  filtersData,
} from "../../../Data/Jobs/Categories/Cat_data";
import { JobIndex } from "../../context/job_list_context";
import { API_GET, API_POST } from "../../../utils/api_structure";
import { cities } from "../../../Data/cities";

const Filters = () => {
  const [city, setCity] = useState([]);

  const [skills, setSkills] = useState([]);

  const [logdatafilters, setDatafilters] = useState({
    location: "",
    date_posted: "",
    experience: "",
    sector: "",
    job_Type: "",
    skills: "",
  });

  // console.log(logdatafilters);

  // addData function adds data from the fliter to logdatafilters variable
  const addData = (name, value) => {
    setDatafilters(() => {
      return {
        ...logdatafilters,
        [name]: value,
      };
    });
  };
  

  const {
    selectedOptionlocation,
    setSelectedOptionlocation,
    selectedOptionDate,
    setSelectedOptionDate,
    selectedOptionExperience,
    setSelectedOptionExperience,
    selectedOptionSector,
    setSelectedOptionSector,
    selectedOptionType,
    setSelectedOptionType,
    selectedOptionSkill,
    setSelectedOptionSkill,
    job_Data,
    setData,
    jobdata,
    setJobs,
    job_index,
    setJobIndex,
  } = useContext(JobIndex);

  const country = {
    country: "india",
  };

  async function sendData() {
    const URL = "filterjobs";
    const { result, status } = await API_POST(URL, logdatafilters);
    setData(result);
    setJobs(result);
    setJobIndex(result[0]);
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
    // console.log(JSON.stringify(result));
  } else {
    // console.error("newarr is not an array or is undefined.");
  }

  const reset = () => {
    setSelectedOptionlocation("");
    setSelectedOptionDate("");
    setSelectedOptionExperience("");
    setSelectedOptionSector("");
    setSelectedOptionType("");
    setSelectedOptionSkill("");
    setDatafilters(() => {
      return {
        ...logdatafilters,
        ["location"]: "",
        ["date_posted"]: "",
        ["experience"]: "",
        ["sector"]: "",
        ["job_Type"]: "",
        ["skills"]: "",
      };
    });
  };

  return (
    <div className="flex  w-full h-40 items-center justify-center ">
      <div className=" z-10 flex flex-col items-center gap-5">
        {/* These are the dropmenu components */}
        <div className="flex gap-4">
          <div className="w-[200px]">
            <ReactSelectWithOptimization
              options={result}
              name={"Location"}
              selectedOption={selectedOptionlocation}
              setSelected={setSelectedOptionlocation}
              onchange={addData}
              id={"location"}
            />
          </div>
          <div className="w-[200px]">
            <ReactSelectWithOptimization
              options={date_posted}
              name={"Date Posted"}
              selectedOption={selectedOptionDate}
              setSelected={setSelectedOptionDate}
              onchange={addData}
              id={"date_posted"}
            />
          </div>
          <div className="w-[200px]">
            <ReactSelectWithOptimization
              options={experience}
              name={"Experience"}
              selectedOption={selectedOptionExperience}
              setSelected={setSelectedOptionExperience}
              onchange={addData}
              id={"experience"}
            />
          </div>
          <div className="w-[200px]">
            <ReactSelectWithOptimization
              options={sector}
              name={"Sector"}
              selectedOption={selectedOptionSector}
              setSelected={setSelectedOptionSector}
              onchange={addData}
              id={"sector"}
            />
          </div>
          <div className="w-[200px]">
            <ReactSelectWithOptimization
              options={Job_Type}
              name={"Job Type"}
              selectedOption={selectedOptionType}
              setSelected={setSelectedOptionType}
              onchange={addData}
              id={"job_Type"}
            />
          </div>
          <div className="w-[200px]">
            <ReactSelectWithOptimization
              options={new_skill}
              name={"Skills"}
              selectedOption={selectedOptionSkill}
              setSelected={setSelectedOptionSkill}
              onchange={addData}
              id={"skills"}
            />
          </div>
        </div>
        <div className="flex gap-3">
          <button
            onClick={reset}
            className="px-5 py-1  rounded-full bg-purple-button font-medium text-white"
          >
            Reset
          </button>
          <button
            onClick={sendData}
            className="px-5 py-1 rounded-full bg-purple-button font-medium text-white"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filters;
