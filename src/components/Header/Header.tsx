// @ts-nocheck
import * as React from "react";
import { useContext, useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { JobIndex } from "../context/job_list_context";
import Login from "../Login-Register/Login";
import Register from "../Login-Register/Register";
import ClientRegister from "../Login-Register/ClientRegister";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { colors } from "@mui/material";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_POST_AUTH, API_POST } from "../../utils/api_structure";
import ClientLogin from "../Login-Register/ClientLogin";

const Header = () => {
  const {
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
    clientLogin,
    setClientLogin,
    clientid,
    setClientId,
    candidateid,
    setCandidateId,
    clientprofiletype,
    setClientProfileType,
  } = useContext(JobIndex);

  const history = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [adminLogin, setAdminLogin] = useState(false);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  const navigate = useNavigate();
  const reset = () => {
    setSelectedOptionlocationSearch("");
    setSelectedOptionquerySearch("");
    setSelectedOptionexperienceSearch("");
    setSearchDatafilters(() => {
      return {
        ...searchDataFilters,
        ["searchQuery"]: "",
        ["location"]: "",
        ["experience"]: "",
      };
    });
  };
  useEffect(() => {
    const adminAuth = localStorage.getItem("adminAuth");
    if (adminAuth) {
      setAdminLogin(true);
    }
  }, []);

  const handleAdminLogin = () => {
    if (adminPassword === "admin123") { // Replace with backend verification
      localStorage.setItem("adminAuth", "true");
      setAdminLogin(true);
      setShowAdminModal(false);
      setAdminPassword("");
    } else {
      alert("Incorrect Password");
    }
  };

  const handleAdminLogout = () => {
    localStorage.removeItem("adminAuth");
    setAdminLogin(false);
    navigate("/");
  };
  const [loginview, setLoginView] = useState("hidden");
  const [registerview, setRegisterView] = useState("hidden");
  const [clientregisterview, setClientRegisterView] = useState("hidden");
  const [clientloginview, setClientLoginView] = useState("hidden");
  const [profileview, setProfileView] = useState("hidden");

  const changeLoginView = () => {
    if (loginview === "hidden") {
      setLoginView("fixed");
    } else if (loginview === "fixed") {
      setLoginView("hidden");
    }
  };

  const changeRegisterView = () => {
    if (registerview === "hidden") {
      setRegisterView("fixed");
    } else if (registerview === "fixed") {
      setRegisterView("hidden");
    }
  };

  const changeClientRegisterView = () => {
    if (clientregisterview === "hidden") {
      setClientRegisterView("fixed");
    } else if (clientregisterview === "fixed") {
      setClientRegisterView("hidden");
    }
  };

  const changeClientLoginView = () => {
    if (clientloginview === "hidden") {
      setClientLoginView("fixed");
    } else if (clientloginview === "fixed") {
      setClientLoginView("hidden");
    }
  };

  const changeProfileView = () => {
    if (profileview === "hidden") {
      setProfileView("fixed");
    } else if (profileview === "fixed") {
      setProfileView("hidden");
    }
  };

  async function logoutClient() {
    const URL = "client-logout";
    const token = localStorage.getItem("client-token");
    const { result, status } = await API_POST_AUTH(URL, "logout", token);

    if (status == 200) {
      toast.warn("Client Logged Out", {
        position: "top-center",
        theme: "light",
        closeOnClick: true,
        pauseOnHover: true,
      });
      localStorage.removeItem("client-token");
      localStorage.removeItem("client-id");
      setClientLogin(false);
    } else {
      toast.error("Invalid details", {
        position: "top-center",
      });
    }
  }

  async function logout() {
    const URL = "logout";
    const token = localStorage.getItem("token");
    const { result, status } = await API_POST_AUTH(URL, "logout", token);
    if (status == 200) {
      toast.warn("Candidate Logged Out", {
        position: "top-center",
        theme: "light",
        closeOnClick: true,
        pauseOnHover: true,
      });
      localStorage.removeItem("token");
      localStorage.removeItem("can-id");
      setUserLogin(false);
    } else {
      toast.error("Invalid details", {
        position: "top-center",
      });
    }
  }
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [anchorElCan, setAnchorElCan] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const openCan = Boolean(anchorElCan);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClickCan = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElCan(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleCloseCan = () => {
    setAnchorElCan(null);
  };
  const logoutButton = () => {
    setAnchorEl(null);
    logout();
    history("/home");
  };

  const logoutButtonClient = () => {
    setAnchorEl(null);
    logoutClient();
    history("/home");
  };

  const profileButton = () => {
    history("/candidate");
    setProfileType("profile");
  };

  const jobButton = () => {
    history("/candidate");
    setProfileType("jobs");
  };

  const resumeButton = () => {
    history("/candidate");
    setProfileType("resume");
  };

  const cpButtonm = () => {
    history("/candidate");
    setProfileType("cp");
  };

  const clientProfile = () => {
    history("/client");
    setClientProfileType("profile");
  };

  const clientJob = () => {
    history("/client");
    setClientProfileType("jobs");
  };

  const clientPostJob = () => {
    history("/client");
    setClientProfileType("post-job");
  };

  const clientCP = () => {
    history("/client");
    setClientProfileType("cp");
  };

  async function getCandidatesDeatils(candidate_id) {
    const URL = `candidate/${candidate_id}`;
    const { result, status } = await API_POST(URL, "delete");
    setCandidateId(result);
  }

  async function getClientsDetails(client_id) {
    const URL = `client/${client_id}`;
    const { result, status } = await API_POST(URL, "details");
    setClientId(result);
  }

  const getClientDetails = (bool) => {
    bool
      ? (setClientLogin(true),
        getClientsDetails(localStorage.getItem("client-id")))
      : setClientLogin(false);
  };

  const getCandidateDetails = (bool) => {
    bool
      ? (setUserLogin(true),
        getCandidatesDeatils(localStorage.getItem("can-id")))
      : setUserLogin(false);
  };

  useEffect(() => {
    localStorage.getItem("token")
      ? getCandidateDetails(true)
      : getCandidateDetails(false);
    // console.log(localStorage.getItem("client-token"));
    localStorage.getItem("client-token")
      ? getClientDetails(true)
      : getClientDetails(false);
  }, []);

  return (
    <div className="relative border-b-[1px]">
      <nav className="flex justify-between p-6">
        <div className="flex flex-row">
          <NavLink to="/home">
            <img src="/mj.png" alt="" className="w-[70px]" />
          </NavLink>
          <div className="flex items-center font-medium gap-10 ml-8 text-xl">
            <NavLink to="/home">
              <div onClick={reset}>Home</div>
            </NavLink>
            <NavLink to="/jobs">
              <div onClick={reset}>Jobs</div>
            </NavLink>
            <NavLink to="/college">
              <div>Colleges</div>
            </NavLink>
          </div>
        </div>
        <div className="flex items-center">
          {userLogin ? (
            <div>
              <Button
                id="account-btn"
                aria-controls={open ? "account-btn" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
                sx={{
                  backgroundColor: "#b52f99",
                  color: "white",
                  borderRadius: "20px",
                  paddingX: "20px",
                  fontWeight: "bold",
                  "&:hover": {
                    backgroundColor: "#90267A",
                  },
                }}
              >
                Account
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem onClick={profileButton}>My Profile</MenuItem>
                <MenuItem onClick={jobButton}>My Jobs</MenuItem>
                <MenuItem onClick={resumeButton}>My Resumes</MenuItem>
                <MenuItem onClick={cpButtonm}>Change Password</MenuItem>
                <MenuItem onClick={logoutButton}>Logout</MenuItem>
              </Menu>
            </div>
          ) : clientLogin ? (
            <div>
              <Button
                id="account-btn"
                aria-controls={open ? "account-btn" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
                sx={{
                  backgroundColor: "#b52f99",
                  color: "white",
                  borderRadius: "20px",
                  paddingX: "20px",
                  fontWeight: "bold",
                  "&:hover": {
                    backgroundColor: "#90267A",
                  },
                }}
              >
                Account
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem onClick={clientProfile}>Profile</MenuItem>
                <MenuItem onClick={clientJob}>Jobs</MenuItem>
                <MenuItem onClick={clientPostJob}>Post Job</MenuItem>
                <MenuItem onClick={clientCP}>Change Password</MenuItem>
                <MenuItem onClick={logoutButtonClient}>Logout</MenuItem>
              </Menu>
            </div>
          ) : (
            <div className="flex items-center gap-5 max-sm:flex-col">
              {/* <div className="flex gap-3">
                <button
                  onClick={changeLoginView}
                  className="ease-in-out duration-500 hover:shadow-purple-buttons rounded-full text-lg pb-[6px] pt-1 px-6 border-purple-button border-solid border-[1px]"
                >
                  Login
                </button>
                <button
                  onClick={changeRegisterView}
                  className="ease-in-out duration-500 rounded-full text-lg pb-[6px] pt-1 px-6 bg-purple-button-before hover:bg-purple-button text-white"
                >
                  Register
                </button>
              </div> */}
              <Button
                id="account-btn"
                aria-controls={openCan ? "account-btn" : undefined}
                aria-haspopup="true"
                aria-expanded={openCan ? "true" : undefined}
                onClick={handleClickCan}
                sx={{
                  backgroundColor: "#b52f99",
                  color: "white",
                  borderRadius: "20px",
                  paddingX: "20px",
                  paddingY: "7px",
                  fontWeight: "bold",
                  "&:hover": {
                    backgroundColor: "#90267A",
                  },
                }}
              >
                JOB SEEKERS
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorElCan}
                open={openCan}
                onClose={handleCloseCan}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem onClick={changeLoginView}>Login</MenuItem>
                <MenuItem onClick={changeRegisterView}>Register</MenuItem>
              </Menu>
              <div className="h-10 w-[1px] bg-slate-400"></div>
              <Button
                id="account-btn"
                aria-controls={open ? "account-btn" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
                sx={{
                  backgroundColor: "#b52f99",
                  color: "white",
                  borderRadius: "20px",
                  paddingX: "20px",
                  paddingY: "7px",
                  fontWeight: "bold",
                  "&:hover": {
                    backgroundColor: "#90267A",
                  },
                }}
              >
                Employers/Post Job
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem onClick={changeClientLoginView}>Login</MenuItem>
                <MenuItem onClick={changeClientRegisterView}>Register</MenuItem>
              </Menu>
            </div>
          )}
        </div>
      </nav>
      <div className={`${loginview}  top-[-1px] z-30`}>
        <Login
          changeFunc={changeLoginView}
          changeRegister={changeRegisterView}
        />
      </div>
      <div className={`${registerview} top-[-1px] z-30`}>
        <Register
          changeFunc={changeRegisterView}
          changeLogin={changeLoginView}
        />
      </div>
      <div className={`${clientregisterview} top-[-1px] z-30`}>
        <ClientRegister
          changeFunc={changeClientRegisterView}
          changeLogin={changeClientLoginView}
        />
      </div>
      <div className={`${clientloginview} top-[-1px] z-30`}>
        <ClientLogin
          changeFunc={changeClientLoginView}
          changeRegister={changeClientRegisterView}
        />
      </div>
      <ToastContainer />
    </div>
  );
};

export default Header;
