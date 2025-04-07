import React from "react";
import Helmet from "react-helmet";
import Header from "../components/Header/Header";
import Categories from "../components/Jobs/Categories/Categories";
import Search from "../components/Home/Search/Search";
import Filters from "../components/Jobs/Filters/Filters";
import JobSection from "../components/Jobs/Job_section/Job_Section";
import Apply from "../components/Jobs/Job_section/apply";

const JobsPage = () => {
  return (
    <>
      <Helmet>
        <title>Browse & Apply for Jobs | Opportunities on Mailerjobs</title>
        <meta name="description" content="Apply for jobs across various industries on Mailerjobs. Explore top listings and find the perfect job opportunity to advance your career today." />
      </Helmet>
      <Categories />
      <div className="w-full bg h-[250px] flex justify-center items-center">
        <div className="drop-shadow-job_search z-20">
          <Search />
        </div>
      </div>
      <Filters />
      <JobSection />
    </>
  );
};

export default JobsPage;