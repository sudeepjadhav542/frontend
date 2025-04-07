// @ts-nocheck
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { JobIndex } from "../components/context/job_list_context";
import CollegeCard from "../components/college/college-card";
import { API_GET } from "../utils/api_structure";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import DropDownMenu from "../components/candidate/DropDownMenu";
import { toast } from "react-toastify";
import {Helmet} from 'react-helmet'; 

const CollegePage = () => {
  const { collegeDetails, setCollegeDetails } = useContext(JobIndex);
  const [collegeName, setCollegeName] = useState([]);
  const [searchCollege, setSearchCollege] = useState({
    name: "",
  });
  const [singleCollege, setSingleCollege] = useState("");
  console.log(searchCollege);

  async function colleges() {
    const URL = "colleges";
    const { result, status } = await API_GET(URL);
    setCollegeDetails(result);
  }

  const addaCollege = (name, value) => {
    setSearchCollege(() => {
      return {
        ...searchCollege,
        [name]: value,
      };
    });
  };

  async function getCollegeName() {
    const URL = "college-names";
    const { result, status } = await API_GET(URL);
    setCollegeName(result);
  }

  async function getCollegeDetails(name) {
    const URL = `college/${name}`;
    const { result, status } = await API_GET(URL);
    setSingleCollege(result);
    if (status === 404) {
      toast.error("College not found", {
        position: "top-right",
        autoClose: 5000,
        closeOnClick: true,
        pauseOnHover: true,
      });
    }
  }

  console.log(JSON.stringify(collegeName));

  useEffect(() => {
    colleges();
    getCollegeName();
  }, []);

  const convertedColleges = collegeName.map((college, index) => ({
    value: index + 1,
    label: college.name,
  }));

  return (
    <>
      <Helmet>
        <title>College | Student | Job Registration</title>
        <meta name="description" content="Register for jobs, internships, and opportunities with ease. A dedicated portal for college students, and job seekers to connect and grow." />
      </Helmet>
      <div>
        {collegeDetails.length === 0 && (
          <div className="flex justify-center items-center h-[70vh]">
            <Box sx={{ display: "flex" }}>
              <CircularProgress size={50} style={{ color: "#90267A" }} />
            </Box>
          </div>
        )}
        <div className="flex flex-col gap-5 flex-wrap justify-center m-3">
          <div className="w-full flex gap-5 justify-center">
            <div className="w-[300px]">
              <DropDownMenu
                options={convertedColleges}
                name={searchCollege.name ? searchCollege.name : "Select College"}
                onchange={addaCollege}
                id={"name"}
                selectedOption={undefined}
                setSelected={undefined}
              />
            </div>
            <button
              onClick={() => getCollegeDetails(searchCollege.name)}
              className="ease-in-out duration-500 bg-purple-button-before hover:bg-purple-button px-5 rounded-md text-white font-bold font-inter"
            >
              Search
            </button>
          </div>
          <div className="flex flex-wrap justify-center gap-5">
            {singleCollege ? (
              <div className="bg-white w-full pl-[118px]">
                <CollegeCard college={singleCollege} />
              </div>
            ) : (
              collegeDetails.map((college, key) => {
                return <CollegeCard key={key} college={college} />;
              })
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CollegePage;