// @ts-nocheck
import React, { useContext, useEffect, useState } from "react";
import { JobIndex } from "../../context/job_list_context";
import fetchskills from "../../../utils/fetchskill";
import { API_POST } from "../../../utils/api_structure";

const Job_LeftSection = (props) => {
  const { job_index, setJobIndex, skill, setSkill } = useContext(JobIndex);

  async function skillfetch(key) {
    const URL = `skill/${key.id}`;
    const { result, status } = await API_POST(URL, "skillfetch");
    setSkill(result);
  }

  const settingValue = (key) => {
    setJobIndex(key);
    skillfetch(key);
  };

  return (
    <div>
      {props.jobdata.map((e, key) => (
        <div
          key={key}
          onClick={() => settingValue(e)}
          className="h-auto border-b-[1px] border-gray-300 py-5 px-5 font-inter"
        >
          <div className="flex gap-2">
            <div className="flex items-center justify-center">
              <img
                src={e.image_url}
                alt=""
                className=" bg-white w-[110px] h-[110px] border-gray-300 border-[1px]  object-contain drop-shadow-md"
              />
            </div>
            <div className="flex flex-col">
              <h1 className="text-lg font-bold">{e.job_title}</h1>
              <h1 className="text-sm text-gray-800">@{e.job_org}</h1>
              <div className="flex flex-col justify-center gap-1">
                <div className="flex items-center gap-1 text-sm">
                  <img
                    src="home/icons/Location_icon.png"
                    alt=""
                    className="w-4 "
                  />
                  <h1 className="text-gray-500">{e.city}</h1>
                </div>
                <div className="flex text-sm items-center gap-1 ml-[-2px]">
                  <img src="SVG/Calendar.svg" alt="" className="w-5" />
                  <h1 className="text-gray-500 ">{e.Posted_Date}</h1>
                </div>
                <div className="flex items-center gap-1 text-sm ml-[-1px]">
                  <img src="SVG/Jobs-Page/Filter.svg" alt="" className="w-5" />
                  <h1 className="text-gray-500">{e.sector}</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Job_LeftSection;
