// @ts-nocheck
import React, { useEffect, useState } from "react";
import { API_GET, API_GET_JOB_FAIR_DATA } from "../utils/api_structure";
import { toast } from "react-toastify";
import "./JobFairDataViewer.css";
import { JobIndex } from "../components/context/job_list_context";
import { useContext } from "react";
import { format } from "date-fns"; 

const JobFairDataViewer = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { clientLogin, setClientLogin } = useContext(JobIndex);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const URL = "jobfair/data"; // Adjust the endpoint as needed
      const { result, status } = await API_GET(URL);
      if (status === 200) {
        const formattedData = result.map(item => ({
          ...item,
          dob: format(new Date(item.dob), "dd/MM/yyyy") // Format the date using date-fns
        }));
        setData(formattedData);
      } else {
        toast.error("Failed to fetch data", {
          position: "top-center",
          theme: "light",
          closeOnClick: true,
          pauseOnHover: true,
        });
      }
    } catch (error) {
      toast.error("Error fetching data", {
        position: "top-center",
        theme: "light",
        closeOnClick: true,
        pauseOnHover: true,
      });
      console.error("Error Details:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleViewResume = (resume_url) => {
    console.log("Opening Resume URL:", resume_url);
    window.open(`/uploads/resume/JobFair/${resume_url}`, "_blank");
  };

  return (
    clientLogin ? (
      <div className="data-viewer">
    <h1 className="title">Job Fair Data Viewer</h1>
    {loading ? (
        <div className="loading-spinner">
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    ) : (
        <table className="job-fair-table">
            <thead>
                <tr>
                    <th className="table-header">Serial No.</th>
                    <th className="table-header">Full Name</th>
                    <th className="table-header">Date of Birth</th>
                    <th className="table-header">Gender</th>
                    <th className="table-header">Phone</th>
                    <th className="table-header">Email</th>
                    <th className="table-header">Institution</th>
                    <th className="table-header">Degree</th>
                    <th className="table-header">Graduation Year</th>
                    <th className="table-header">Register Number</th>
                    <th className="table-header">Resume</th>
                </tr>
            </thead>
            <tbody>
                {data.map((e, index) => (
                    <tr key={index}>
                        <td className="table-cell">{index + 1}</td>
                        <td className="table-cell">{e.name}</td>
                        <td className="table-cell">{e.dob}</td>
                        <td className="table-cell">{e.gender}</td>
                        <td className="table-cell">{e.phone}</td>
                        <td className="table-cell">{e.email}</td>
                        <td className="table-cell">{e.institution}</td>
                        <td className="table-cell">{e.degree}</td>
                        <td className="table-cell">{e.graduation_year}</td>
                        <td className="table-cell">{e.reg_no}</td>
                        <td className="table-cell">
                            <button onClick={() => handleViewResume(e.resume_url)} className="resume-link">
                                Resume
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )}
</div>
    ) : (
      <div className="not-logged-in">
        <h1>Please log in to view job fair data</h1>
      </div>
    )
  );
};

export default JobFairDataViewer;