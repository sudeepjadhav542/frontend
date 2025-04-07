// @ts-nocheck
import React, { useState, useContext } from "react";
import { JobIndex } from "../context/job_list_context";
import { Email } from "@mui/icons-material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { API_POST, API_POST_LOGIN } from "../../utils/api_structure";
import CircularProgress from "@mui/material/CircularProgress";

const Login = (props) => {
  const {
    userLogin,
    setUserLogin,
    candidateid,
    setCandidateId,
    token,
    setToken,
  } = useContext(JobIndex);

  const [loading, setLoading] = useState(false);

  const [logdata, setLogData] = useState({
    email: "",
    password: "",
  });

  // console.log(logdata);

  const adddata = (e) => {
    const { name, value } = e.target;

    setLogData(() => {
      return {
        ...logdata,
        [name]: value,
      };
    });
  };

  async function candidateDetailsByID(candidateid) {
    const URL = `candidate/${candidateid}`;
    const { result, status } = await API_POST(URL, "candidateID");
    setCandidateId(result);
  }

  async function senddata() {
    setLoading(true);
    const URL = "login";
    const { result, status } = await API_POST_LOGIN(URL, logdata);
    if (status == 200) {
      toast.success("Candidate Logged In", {
        position: "top-center",
        theme: "light",
        closeOnClick: true,
        pauseOnHover: true,
      });
      const candiateID = JSON.stringify(result.candidate_id);
      candidateDetailsByID(candiateID);
      setUserLogin(true);
      setLoading(false);
      props.changeFunc();
      localStorage.setItem("can-id", JSON.stringify(result["candidate_id"]));
      localStorage.setItem("token", JSON.stringify(result["token"]));
      setToken(JSON.stringify(result["token"]));
    } else if (status == 400 || status == 401 || status == 422) {
      setLoading(false);
    }
  }

  const SignUp = () => {
    props.changeRegister();
    props.changeFunc();
  };

  // console.log("Result = " + userLogin);
  // console.log(localStorage.getItem("token"));

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-black bg-opacity-70">
      <div className="w-[470px] h-[400px] bg-white p-7 flex flex-col gap-5 rounded-lg">
        <div className="flex w-full justify-between">
          <h1 className="text-2xl font-bold font-roboto">LOGIN</h1>
          <button onClick={props.changeFunc}>
            <img src="/SVG/Cross-Logo.svg" alt="" className="w-5" />
          </button>
        </div>
        <div className="flex flex-col gap-3 mt-2">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="email"
              className="font-roboto font-medium text-lg text-login-register-label"
            >
              Username or Email
            </label>
            <input
              type="text"
              placeholder="Enter Username or Email"
              onChange={adddata}
              value={logdata.email}
              name="email"
              id="email"
              className="h-10 rounded-md p-3 bg-username-input bg-no-repeat bg-[right_4px_top_4px] bg-[length:30px_30px] border-[2px] border-input-border focus:outline-none"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor=""
              className="font-roboto font-medium text-lg text-login-register-label"
            >
              Password
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              onChange={adddata}
              value={logdata.password}
              name="password"
              id="password"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  senddata();
                }
              }}
              className="h-10 rounded-md p-3 bg-password-input bg-no-repeat bg-[right_4px_top_4px] bg-[length:30px_30px] border-[2px] border-input-border focus:outline-none"
            />
          </div>
          <div className="flex justify-between items-center mt-3">
            <div className="flex gap-3">
              <button
                onClick={senddata}
                className="px-5 py-2 bg-purple-button text-lg rounded-full font-medium font-roboto text-white "
              >
                Sign In
              </button>
              {loading && (
                <CircularProgress size={40} style={{ color: "#90267A" }} />
              )}
            </div>
            <a href="" className="font-medium font-roboto text-[#5C5C5C]">
              Forgot Password?
            </a>
          </div>
        </div>
        <div className="w-full flex justify-center items-center mt-3">
          <h3 className="font-medium font-roboto text-[#6B6B6B]">
            Don't have an account?{" "}
            <strong className="text-[#284FFD] cursor-pointer" onClick={SignUp}>
              Sign Up
            </strong>
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Login;
