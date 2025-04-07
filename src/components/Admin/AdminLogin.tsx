// @ts-nocheck
import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_POST_LOGIN } from "../../utils/api_structure";
import CircularProgress from "@mui/material/CircularProgress";
import { Link, useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [logdata, setLogData] = useState({
    email: "",
    password: "",
  });

  const adddata = (e) => {
    const { name, value } = e.target;
    setLogData({
      ...logdata,
      [name]: value,
    });
  };

  async function senddata() {
    setLoading(true);
    const URL = "admin-login"; // Assuming your admin login endpoint is /api/admin/login
    const { result, status } = await API_POST_LOGIN(URL, logdata);
    if (status === 200) {
      toast.success("Admin Logged In", {
        position: "top-center",
        theme: "light",
        closeOnClick: true,
        pauseOnHover: true,
      });
      localStorage.setItem("admin-token", JSON.stringify(result["token"]));
      navigate("/admin/blogs"); // Redirect to admin blog management page
      setLoading(false);
    } else if (status === 400 || status === 401 || status === 422) {
      toast.error("Invalid credentials", {
        position: "top-center",
        theme: "light",
        closeOnClick: true,
        pauseOnHover: true,
      });
      setLoading(false);
    }
  }

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-black bg-opacity-70">
      <div className="w-[470px] h-[400px] bg-white p-7 flex flex-col gap-5 rounded-lg">
        <div className="flex w-full justify-between">
          <h1 className="text-2xl font-bold font-roboto">ADMIN LOGIN</h1>
          <Link to="/">
            <img src="SVG/Cross-Logo.svg" alt="" className="w-5" />
          </Link>
        </div>
        <div className="flex flex-col gap-3 mt-2">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="email"
              className="font-roboto font-medium text-lg text-login-register-label"
            >
              Email
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              onChange={adddata}
              value={logdata.email}
              name="email"
              id="email"
              className="h-10 rounded-md p-3 bg-username-input bg-no-repeat bg-[right_4px_top_4px] bg-[length:30px_30px] border-[2px] border-input-border focus:outline-none"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="password"
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
                className="px-5 py-2 bg-purple-button text-lg rounded-full font-medium font-roboto text-white"
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
      </div>
    </div>
  );
};

export default AdminLogin;