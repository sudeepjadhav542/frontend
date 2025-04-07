import React from "react";
import { Helmet } from "react-helmet";
import Carousel from "react-material-ui-carousel";
import { Link } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import HiringSection from "../components/Home/Hiring/HiringSection";
import JobCategories from "../components/Home/Job_Categories/JobCategories";
import LatestJobs from "../components/Home/Latest-Jobs/LatestJobs";
import Search from "../components/Home/Search/Search";
import Testimonial from "../components/Home/Testimonial/Testimonial";

const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>Job Search Made Easy | Find Jobs | Post a Job at Mailerjobs.com</title>
        <meta name="description" content="Start your job search today! Find amazing opportunities, connect with top employers, or post a job to hire skilled professionals on Mailerjobs.com." />
        <meta name="keywords" content="Search Jobs Online, Find Jobs, Post a Job" />
        <script type="application/ld+json">
          {`
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Mailer Jobs",
      "url": "https://mailerjobs.com",
      "logo": "https://mailerjobs.com/mj.png",
      "sameAs": [
        "https://www.instagram.com/mailerjob/",
        "https://www.linkedin.com/company/mailer-jobs/",
        "https://www.facebook.com/mailerjobs/",
        "https://www.youtube.com/@mailerjobs"
      ],
      "description": "MailerJobs is a fast-growing job portal connecting job seekers with opportunities across industries through a responsive platform and easy-to-use job posting features."
    }
  `}
        </script>

      </Helmet>
      <div className="relative bg-home-page w-full h-[500px] bg-cover bg-center flex flex-col gap-5 items-center justify-center">
        <div className="absolute w-full bg-black opacity-50 z-[1] h-full" />
        <h1 className="text-4xl font-bold font-roboto z-10 text-white">
          Where Job Search Meets Opportunity
        </h1>
        <h2 className="font-bold font-roboto z-10 text-white">
          Find jobs effortlessly and take the next step in your career
        </h2>
        <div className="z-10">
          <Search />
        </div>
      </div>
     

      <div className="w-full max-w-[1025px] mx-auto h-[650px]" id="job-fair-container">
  <Carousel
    autoPlay={false}
    animation="slide"
    navButtonsAlwaysVisible={true}
    indicators={false}
    duration={650}
    className="w-full sm:w-[1000px] flex justify-center items-center mt-10 mb-7"
  >
    {/* Slide 1 - Job Fair Registration */}
    <div className="flex flex-col items-center my-10 space-y-6 p-6 bg-white rounded-lg shadow-lg h-[670px]">
      <h2 className="text-3xl sm:text-4xl font-bold font-roboto text-black">Job Fair</h2>
      <img
        src="/jyothi_institute_photo.jpg"
        alt="Job Fair Registration"
        width="600"
        height="400"
        className="w-full sm:w-[70%] h-auto max-h-[450px] rounded-lg shadow-md"
      />
      <Link
        to="/jobfair"
        className="bg-purple-600 text-white px-8 py-2 rounded-lg shadow-md hover:bg-purple-700 transition duration-300 mt-1 mb-3"
      >
        Register Now
      </Link>
    </div>

    {/* Slide 2 - Different Content */}
    
  </Carousel>
</div>

       


      <div className="flex flex-col items-center my-16">
        <h2 className="text-5xl font-roboto font-medium text-center">Latest Jobs</h2>
        <LatestJobs />
      </div>
      <div className="flex flex-col items-center my-16">
        <h2 className="text-5xl font-roboto font-medium text-center">Job Categories</h2>
        <JobCategories />
      </div>
      <div className="w-full bg-footer-back flex-col items-center">
        <h2 className="font-bebas text-5xl text-white text-center pt-14">Testimonial</h2>
        <Testimonial />
      </div>
      <div className="flex flex-col items-center">
        <h2 className="text-5xl font-roboto font-medium mt-10 text-center">
          Hiring Companies
        </h2>
        <HiringSection />
      </div>
      <Footer />
    
    </>
  );
};

export default HomePage;
