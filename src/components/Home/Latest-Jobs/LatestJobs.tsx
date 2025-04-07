// LatestJobs.tsx
import React, { useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import Job from "./Jobs-grid/Job";
import { API_GET } from "../../../utils/api_structure";
import { Link } from "react-router-dom";
import "./LatestJobs.css";

const LatestJobs = () => {
  interface JobType {
    id: number;
    // add other properties of the job here
  }

  const [latest_jobs, setLatestJobs] = useState<JobType[]>([]);

  async function fetchLatestJobs() {
    const URL = "latest_jobs";
    const response = await API_GET(URL);
    if (response) {
      const { result, status } = response;
      setLatestJobs(result);
    }
  }

  useEffect(() => {
    fetchLatestJobs();
  }, []);

  return (
    <div className="latest-jobs-container">
      <Carousel
        autoPlay={false}
        animation="slide"
        navButtonsAlwaysVisible={true}
        indicators={false}
        duration={650}
        className="w-[1000px] flex justify-center items-center mt-10"
      >
        {latest_jobs.map((job, key) => (
          <div key={key} className="job-card flex flex-col items-center">
            <Job element={job} />
            <Link to={`/job-view/${job.id}`} className="view-job-button">
              View Job
            </Link>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default LatestJobs;