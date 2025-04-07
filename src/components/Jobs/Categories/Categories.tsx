// @ts-nocheck
import React, { useContext, useState } from "react";
import { catData } from "../../../Data/Jobs/Categories/Cat_data";
import { convertCat } from "../../../utils/convertcat";
import { JobIndex } from "../../context/job_list_context";
import { API_GET } from "../../../utils/api_structure";

const Categories = () => {
  const [catValue, setCatValue] = useState<string | undefined>(undefined);

  const { jobdata, setJobs, job_index, setJobIndex } = useContext(JobIndex);
  const fetchSectorJobs = (name) => {
    const sector = convertCat(name);
    console.log(sector);
    fetchSectorJobsApi(sector);
  };

  async function fetchSectorJobsApi(name) {
    const URL = `jobsector/${name}`;
    const { result, status } = await API_GET(URL);
    console.log("Status = " + status);
    console.log("Result = " + result);
    if (result !== null) {
      console.log("Result present");
    } else {
      console.log("Result Not Present");
    }
    setJobs(result);
    setJobIndex(result[0]);
  }

  return (
    <div
      className="flex w-full 
    bg-footer-back h-20 items-center justify-center gap-20"
    >
      {catData.map((e, key) => {
        return (
          <div
            key={key}
            onClick={() => {
              fetchSectorJobs(e.name);
            }}
            className="flex gap-2 rounded-xl text-lg 
                items-center justify-end 
                h-10 px-5 py-3 bg-white drop-shadow-job_cat"
          >
            <div className="w-[200px] cursor-pointer font-poppins font-medium  flex justify-center">
              {e.name}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Categories;
