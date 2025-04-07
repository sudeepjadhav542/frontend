// @ts-nocheck
import React, { createContext, useState } from "react";
export const JobIndex = createContext();

const ContextProvider = ({ children }) => {
  const [job_index, setJobIndex] = useState("");
  const [role, setRole] = useState<string>(""); // Add role state

  const [skill, setSkill] = useState([]);
  const [selectedOptionlocation, setSelectedOptionlocation] = useState("");
  const [selectedOptionDate, setSelectedOptionDate] = useState("");
  const [selectedOptionExperience, setSelectedOptionExperience] = useState("");
  const [selectedOptionSector, setSelectedOptionSector] = useState("");
  const [selectedOptionType, setSelectedOptionType] = useState("");
  const [selectedOptionSkill, setSelectedOptionSkill] = useState("");
  const [job_Data, setData] = useState([]);
  const [jobdata, setJobs] = useState<Job[]>([]);
  const [selectedOptionlocationSearch, setSelectedOptionlocationSearch] =
    useState("");
  const [selectedOptionexperienceSearch, setSelectedOptionexperienceSearch] =
    useState("");
  const [selectedOptionquerySearch, setSelectedOptionquerySearch] =
    useState("");
  const [searchDataFilters, setSearchDatafilters] = useState({
    searchQuery: "",
    location: "",
    experience: "",
  });
  const [userLogin,setUserLogin] = useState(false);
  const [profiletype,setProfileType] = useState("profile");
  const [candidateid,setCandidateId] = useState([]);
  const [profileBI, setProfileBI] = useState({
      first_name: "",
      last_name: "",
      email: "",
      DOB: "",
      phone_no: "",
      pincode: "",
      sector: "",
      college_name: "",
      linkedin: "",
      facebook: "",
      twitter: "",
      state: "",
      city: "",
    });
    const [token,setToken] = useState("");
    const [resume,setResume] = useState("");
    const [clientLogin, setClientLogin] = useState(false);
    const [clientprofiletype,setClientProfileType] = useState("profile");
    const [clientid,setClientId] = useState([]);
    const [clientprofileBI, setClientProfileBI] = useState({
      first_name: "",
      last_name: "",
      email: "",
      phone_no: "",
      pincode: "",
      sector: "",
      company_name: "",
      company_url: "",
      linkedin: "",
      facebook: "",
      twitter: "",
      state: "",
      city: "",
    });
    const [clientviewjobid,setClientViewJobId] = useState();
    const [collegeDetails, setCollegeDetails] = useState([]);
    const [singlecollege, setSingleCollege] = useState([]);
    const [jobNav,setJobNav] = useState(false);

  return (
    <>
      <JobIndex.Provider
        value={{
          job_index,
          setJobIndex,
          skill,
          setSkill,
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
          selectedOptionlocationSearch,
          setSelectedOptionlocationSearch,
          selectedOptionexperienceSearch,
          setSelectedOptionexperienceSearch,
          selectedOptionquerySearch,
          setSelectedOptionquerySearch,
          searchDataFilters,
          setSearchDatafilters,
          userLogin,
          setUserLogin,
          profiletype,
          setProfileType,
          candidateid,
          setCandidateId,
          profileBI, 
          setProfileBI,
          token,
          setToken,
          resume,
          setResume,
          clientLogin, 
          setClientLogin,
          clientprofiletype,
          setClientProfileType,
          clientid,
          setClientId,
          clientprofileBI, 
          setClientProfileBI,
          clientviewjobid,
          setClientViewJobId,
          collegeDetails, 
          setCollegeDetails,
          singlecollege, 
          setSingleCollege,
          jobNav,
          setJobNav,
          role,           
          setRole
        }}
      >
        {children}
      </JobIndex.Provider>
    </>
  );
};

export default ContextProvider;
