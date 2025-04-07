// @ts-nocheck
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import * as React from "react";
import { useEffect, useState } from "react";
import TagManager from "react-gtm-module";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import NotFound from "../NotFound";
import DataByCollegeName from "../src/JobFair/dataByCollegeName";
import JobFairDataViewer from "../src/JobFair/JobFairDataViewer";
import JobFairRegistration from "../src/JobFair/JobFairRegistration";
import "./App.css";
import Blog from "./components/Blog/Blog";
import BlogList from "./components/Blog/BlogList";
import CollegeSection from "./components/college/college-section";
import Header from "./components/Header/Header";
import JobFairDataByCollegeNameAndId from "./JobFair/JobFairDataByCollegeNameAndId";
import CandidateProfilePage from "./pages/Candidate-page";
import CLientPage from "./pages/Client-page";
import CollegePage from "./pages/College-page";
import HomePage from "./pages/Home-page";
import JobView from "./pages/Job-view";
import JobsPage from "./pages/Jobs-page";
import PrivacyPage from "./pages/PrivacyPage";
import ScrollToTop from "./utils/scrollToTop";
import TermAndCondition from "./pages/TermsAndCondition";


function App() {
  const [mainloading, setMainLoading] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setMainLoading(true);
    }, 2000);

    // Initialize Google Tag Manager
    TagManager.initialize({ gtmId: "GTM-NWQT5669" });
  }, []);

  return (
    <>
      {mainloading ? (
        <>
          <Router>
            <Header />
            <ScrollToTop>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/home/job-view/:id" element={<JobView />} />
                <Route path="/jobs" element={<JobsPage />} />
                <Route path="/college" element={<CollegePage />} />
                <Route path='/colleges' element={<CollegePage/>}/>
                <Route path="/candidate" element={<CandidateProfilePage />} />
                <Route path="/client" element={<CLientPage />} />
                <Route path="/college-section/:name" element={<CollegeSection />} />
                <Route path="/job-view/:id" element={<JobView />} />
                <Route path="/blogs" element={<BlogList />} />
                <Route path='/privacy-policy' element={<PrivacyPage/>}/>
                <Route path='/terms-and-conditions' element={<TermAndCondition/>}/>
                <Route path="/blogs/:id" element={<Blog />} />
                <Route path="/jobfair" element={<JobFairRegistration />} />
                <Route path="/jobfair/data" element={<JobFairDataViewer />} />
                <Route path="/college/data" element={<DataByCollegeName />} />
                <Route path="/jobfair/databycollegenameandid" element={<JobFairDataByCollegeNameAndId />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </ScrollToTop>
          </Router>
        </>
      ) : (
        <div className="h-screen w-full flex items-center justify-center">
          <Box sx={{ display: "flex" }}>
            <CircularProgress size={60} style={{ color: "#90267A" }} />
          </Box>
        </div>
      )}
    </>
  );
}

export default App;
