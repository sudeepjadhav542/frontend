// @ts-nocheck
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { college } from "../../Data/Colleges/college";
import { JobIndex } from "../context/job_list_context";
import CollegeLogin from "./college-login";
import CollegeRegister from "./college-register";
import { API_GET } from "../../utils/api_structure";
import { useNavigate } from "react-router-dom";

const CollegeSection = () => {
  const { clientLogin, setClientLogin } = useContext(JobIndex);
  const [singlecollege, setSingleCollege] = useState("");
  const { name } = useParams();

  const history = useNavigate();

  const [collegestudents, setCollegeStudents] = useState("");

  const handleViewResume = (resume_url) => {
    console.log("Opening Resume URL:", resume_url);
    window.open(resume_url, "_blank");
  };

  async function getCollegeDetails() {
    const URL = `college/${name}`;
    const { result, status } = await API_GET(URL);
    console.log("College",result.name)
    setSingleCollege(result);
  }

  async function getStudents() {
    const URL = `student-college/${name}`;
    const { result, status } = await API_GET(URL);
    setCollegeStudents(result);
  }

  // console.log(JSON.stringify(collegestudents));
  // console.log(JSON.stringify(singlecollege.background_image));

  useEffect(() => {
    getStudents();
    getCollegeDetails();
  }, []);
  return (
    <div>
      <div className="p-5">
        <div
          className="w-full h-[60vh] 
                     bg-no-repeat bg-cover bg-[center_top_-50px] flex items-center
                     justify-center rounded-t-xl text-black text-center font-bebas text-7xl"
          style={{
            backgroundImage: `url('/${singlecollege.background_image}')`,
          }}
        >
          {singlecollege.name}
        </div>
        <div className="flex flex-col items-center rounded-b-xl bg-gray-300 gap-4 pt-10">
          <h1 className="text-4xl font-semibold">ABOUT</h1>
          <p className="text-xl font-inter text-center w-[1100px] pb-5">
            {singlecollege.about}
          </p>
          {/* <h1>{singlecollege.background_image}</h1> */}
        </div>
        <div className="w-full h-[10px] border-t-[1px] border-gray-300 mt-14" />
      </div>
      {clientLogin ? (
        collegestudents ? (
          <div className=" flex gap-10 flex-wrap justify-center m-5">
            {collegestudents.map((e, key) => {
              return (
                <div className="bg-white border-[1px] border-purple-button rounded-lg p-4 h-[200px] flex items-center justify-center w-[500px] ">
                  <div className="text-lg font-inter flex flex-col justify-center bg-white">
                    <h1>
                      <strong>Name:</strong> {e.full_name}
                    </h1>
                    <h1>
                      <strong>USN:</strong> {e.usn}
                    </h1>
                    <h1>
                      <strong>Email:</strong> {e.email}
                    </h1>
                    <span>
                      <strong>Course:</strong> {e.course}
                    </span>
                  </div>
                  <div>
                    <button
                      onClick={() =>
                        handleViewResume(
                          `/uploads/resume/college/${e.resume_url}`
                        )
                      }
                    >
                      <img src="/icons/pdf.png" alt="" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white w-full text-3xl p-5 flex items-center justify-center text-gray-600">
            <h1 className="font-medium">No Students Registered</h1>
          </div>
        )
      ) : (
        <div className="flex justify-center gap-[100px] mb-10">
          {/* <div className="mt-10">
            <CollegeLogin />
          </div> */}
          {/* <div className="w-[1px] border-r-[2px]" /> */}
          <div>
            <CollegeRegister
              college_name={singlecollege.name}
              id={singlecollege.id}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CollegeSection;
