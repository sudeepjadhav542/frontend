// @ts-nocheck
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { JobIndex } from "../context/job_list_context";
import { API_GET } from "../../utils/api_structure";

const CollegeCard = ({ college }) => {
  const history = useNavigate();
  const [studentCount, setStudentCount] = useState(0);
  const { clientLogin } = useContext(JobIndex);
  const [collegestudents, setCollegeStudents] = useState("");
  
  useEffect(() => {
    // Fetch the number of registered students for this college
    const fetchStudentCount = async () => {
      const URL = `student-college/${college.name}`;
      const { result, status } = await API_GET(URL);
      if (status === 200) {
        setStudentCount(result.length);
      }
    };

    fetchStudentCount();
  }, [college.name]);

  const register = () => {
    sessionStorage.setItem('viewingCollege', 'true');
    history(`/college-section/${college.name}`);
  };

  return (
    <div className="flex flex-col text-center bg-white drop-shadow-college rounded-md w-[300px] min-h-[300px] justify-center items-center gap-3 p-3">
      {clientLogin && (
        <span className="absolute top-2 right-2 bg-fuchsia-700 text-white text-lg font-bold px-3 py-1 rounded-full">
          {studentCount}
        </span>
      )}
      <img
        src={college.logo_url}
        alt=""
        className="w-[100px] h-[100px] rounded-full object-cover"
      />
      <span className="text-base flex items-center font-medium justify-center">
        {college.name}
      </span>
      {clientLogin ? (
        <button
          onClick={register}
          className="bg-purple-600 text-white py-2 px-5 font-medium text-base rounded-lg"
        >
          View
        </button>
      ) : (
        <button
          onClick={register}
          className="bg-purple-600 text-white py-2 px-5 font-medium text-base rounded-lg"
        >
          Register
        </button>
      )}
    </div>
  );
};

export default CollegeCard;