// @ts-nocheck
import React, { useEffect, useState, useContext } from "react";
import { toast } from "react-toastify";
import { JobIndex } from "../components/context/job_list_context";
import { format } from "date-fns";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const JobFairDataByCollegeNameAndId = () => {
  const [colleges, setColleges] = useState([]);
  const [selectedCollege, setSelectedCollege] = useState("");
  const [studentId, setStudentId] = useState(0);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const { clientLogin } = useContext(JobIndex);

  // Fetching college names on component mount
  useEffect(() => {
    fetchCollegeNames();
  }, []);

  const fetchCollegeNames = async () => {
    try {
      const response = await fetch(`${BASE_URL}college-names`);
      if (!response.ok) throw new Error("Failed to fetch college names");

      const result = await response.json();
      setColleges(result);
    } catch (error) {
      toast.error("Error fetching colleges", { position: "top-center" });
      console.error("College Fetch Error:", error);
    }
  };

  useEffect(() => {
    if (selectedCollege && studentId) {
      fetchStudentData();
    }
  }, [selectedCollege, studentId]);

  // Fetching student data based on college name and ID
  const fetchStudentData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}jobfair/${selectedCollege}/${studentId}`);
      if (!response.ok) throw new Error("Failed to fetch student data");

      const result = await response.json();
      console.log("API Response:", result); // Debugging

      if (!Array.isArray(result)) {
        throw new Error("Unexpected API response format");
      }

      const formattedData = result.map((student, index) => ({
        id: student.id || index + 1, // Ensure unique IDs
        course: student.course || "N/A",
        email: student.email || "N/A",
        full_name: student.full_name || "N/A",
        resume_url: student.resume_url || "N/A",
        usn: student.usn || "N/A",
        dob: student.dob ? format(new Date(student.dob), "dd/MM/yyyy") : "N/A", // Formatting DOB
        gender: student.gender || "N/A",
        phone: student.phone || "N/A",
        institution: student.institution || "N/A",
        degree: student.degree || "N/A",
        graduation_year: student.graduation_year || "N/A",
        reg_no: student.reg_no || "N/A",
      }));

      setStudents(formattedData);
    } catch (error) {
      toast.error("Error fetching student data", { position: "top-center" });
      console.error("Student Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-6 text-center text-black">
        Student Details by College and ID
      </h2>

      {/* College dropdown */}
      <div className="mb-4 flex justify-center">
        <select
          className="p-3 border border-gray-300 rounded-lg w-1/2"
          value={selectedCollege}
          onChange={(e) => setSelectedCollege(e.target.value)}
        >
          <option value="">Select a College</option>
          {colleges.map((college, index) => (
            <option key={index} value={college.name}>
              {college.name}
            </option>
          ))}
        </select>
      </div>

      {/* ID input */}
      <div className="mb-4 flex justify-center">
        <input
          type="number"
          className="p-3 border border-gray-300 rounded-lg w-1/2"
          placeholder="Enter Student ID"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
        />
      </div>

      {/* Data display */}
      {clientLogin ? (
        loading ? (
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-gray-900"></div>
          </div>
        ) : (
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="border p-3 text-center">ID</th> 
                <th className="border p-3">Full Name</th>
                <th className="border p-3">Course</th>
                <th className="border p-3">Email</th>
                <th className="border p-3">Resume URL</th>
                <th className="border p-3">USN</th>
                <th className="border p-3">Date of Birth</th>
                <th className="border p-3">Gender</th>
                <th className="border p-3">Phone</th>
                <th className="border p-3">Institution</th>
                <th className="border p-3">Degree</th>
                <th className="border p-3">Graduation Year</th>
                <th className="border p-3">Register Number</th>
              </tr>
            </thead>
            <tbody>
              {students.length > 0 ? (
                students.map((student, index) => (
                  <tr key={index} className="text-center">
                    <td className="border p-3">{student.id}</td>
                    <td className="border p-3">{student.full_name}</td>
                    <td className="border p-3">{student.course}</td>
                    <td className="border p-3">{student.email}</td>
                    <td className="border p-3">
                      <a href={student.resume_url} target="_blank" rel="noopener noreferrer">
                        {student.resume_url}
                      </a>
                    </td>
                    <td className="border p-3">{student.usn}</td>
                    <td className="border p-3">{student.dob}</td>
                    <td className="border p-3">{student.gender}</td>
                    <td className="border p-3">{student.phone}</td>
                    <td className="border p-3">{student.institution}</td>
                    <td className="border p-3">{student.degree}</td>
                    <td className="border p-3">{student.graduation_year}</td>
                    <td className="border p-3">{student.reg_no}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="13" className="border p-4 text-center text-gray-500">
                    No student data found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )
      ) : (
        <div className="text-center py-10">
          <h1 className="text-2xl font-bold text-red-500">
            Please log in to view student details
          </h1>
        </div>
      )}
    </div>
  );
};

export default JobFairDataByCollegeNameAndId;
