// @ts-nocheck
import React, { useRef, useState } from "react";
import { API_POST_STUDENT } from "../../utils/api_structure";
import { toast } from "react-toastify";

const CollegeRegister = (props) => {
  const [collegestudent, setCollegeStudent] = useState({
    college_name: props.college_name,
    full_name: "",
    username: "",
    email: "",
    phone_no: "",
    pincode: "",
    city: "",
    usn: "",
    course: "",
  });

  console.log(props.college_name);
  console.log(collegestudent);

  const [resume, setResume] = useState(null);
  const [fileName, setFileName] = useState(""); // State to store the file name

  const fileInputRef = useRef(null);

  const handleButtonClikc = () => {
    fileInputRef.current.click();
  };

  const adddata = (e) => {
    const { name, value } = e.target;

    setCollegeStudent(() => {
      return {
        ...collegestudent,
        [name]: value,
      };
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setResume(file);
    setFileName(file ? file.name : ""); // Update the file name state
  };

  async function submitData(formDataToSend) {
    const URL = "student-add";
    const { result, status } = await API_POST_STUDENT(URL, formDataToSend);
    if (status == 200) {
      toast.success("Applied Successfully", {
        position: "top-center",
        theme: "light",
        closeOnClick: true,
        pauseOnHover: true,
      });
    }
  }

  const handleSubmit = () => {
    const formDataToSend = new FormData();
    Object.entries(collegestudent).forEach(([key, value]) => {
      console.log("key", key, "value", value);
      if (key === "college_name") {
        formDataToSend.append(key, props.college_name);
      } else {
        formDataToSend.append(key, value);
      }
    });
    formDataToSend.append("resume", resume);
    for (let [key, value] of formDataToSend.entries()) {
      console.log(key, value);
    }
    submitData(formDataToSend);
  };

  return (
    <div className="w-[700px] h-auto bg-white shadow-xl pt-7 pb-2  px-7 rounded-lg">
      <div className="flex justify-center mb-2">
        <h1 className="text-xl font-bold font-roboto">REGISTER</h1>
      </div>
      <div className="flex flex-col gap-3 mb-4">
        <div className="flex gap-5">
          <div className="flex flex-col w-[300px] gap-1">
            <label
              htmlFor="full_name"
              className="font-roboto font-medium text-base text-login-register-label"
            >
              Full Name
            </label>
            <input
              type="text"
              placeholder="Enter Full Name"
              onChange={adddata}
              value={collegestudent.full_name}
              name="full_name"
              id="full_name"
              className="h-10 border-input-border border-[2px] rounded-md
              bg-username-input bg-no-repeat bg-[right_4px_top_4px] bg-[length:30px_30px] p-2"
            />
          </div>
          <div className="flex flex-col w-[300px] gap-1">
            <label
              htmlFor="username"
              className="font-roboto font-medium text-base text-login-register-label"
            >
              Username
            </label>
            <input
              type="text"
              placeholder="Enter Username"
              onChange={adddata}
              value={collegestudent.username}
              name="username"
              id="username"
              className="h-10 border-input-border border-[2px] rounded-md
                bg-username-input bg-no-repeat bg-[right_4px_top_4px] bg-[length:30px_30px] p-3"
            />
          </div>
        </div>
        <div className="flex gap-5">
          <div className="flex flex-col w-[300px] gap-1">
            <label
              htmlFor="email"
              className="font-roboto font-medium text-base text-login-register-label"
            >
              Email
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              onChange={adddata}
              value={collegestudent.email}
              name="email"
              id="email"
              className="h-10 border-input-border border-[2px] rounded-md
                bg-email-input bg-no-repeat bg-[right_4px_top_4px] bg-[length:30px_30px] p-2"
            />
          </div>
          <div className="flex flex-col w-[300px] gap-1">
            <label
              htmlFor="phone_no"
              className="font-roboto font-medium text-base text-login-register-label"
            >
              Phone
            </label>
            <input
              type="text"
              placeholder="Enter Phone"
              onChange={adddata}
              value={collegestudent.phone_no}
              name="phone_no"
              id="phone_no"
              className="h-10 border-input-border border-[2px] rounded-md
                bg-phone-input bg-no-repeat bg-[right_6px_top_6px] bg-[length:25px_25px] p-2"
            />
          </div>
        </div>
        <div className="flex gap-5">
          <div className="flex flex-col w-[300px] gap-1">
            <label
              htmlFor="pincode"
              className="font-roboto font-medium text-base text-login-register-label"
            >
              Pincode
            </label>
            <input
              type="text"
              placeholder="Enter Pincode"
              onChange={adddata}
              value={collegestudent.pincode}
              name="pincode"
              id="pincode"
              className="h-10 border-input-border border-[2px] rounded-md
                bg-pincode-input bg-no-repeat bg-[right_7px_top_7px] bg-[length:23px_25px] p-2"
            />
          </div>
          <div className="flex flex-col w-[300px] gap-1">
            <label
              htmlFor="city"
              className="font-roboto font-medium text-base text-login-register-label"
            >
              City
            </label>
            <input
              type="text"
              placeholder="Enter City"
              onChange={adddata}
              value={collegestudent.city}
              name="city"
              id="city"
              className="h-10 border-input-border border-[2px] rounded-md
                bg-pincode-input bg-no-repeat bg-[right_7px_top_7px] bg-[length:23px_25px] p-2"
            />
          </div>
        </div>
        <div className="flex gap-5">
          <div className="flex flex-col w-[300px] gap-1">
            <label
              htmlFor="usn"
              className="font-roboto font-medium text-base text-login-register-label"
            >
              College Register Number
            </label>
            <input
              type="text"
              placeholder="Enter  College Register Number"
              onChange={adddata}
              value={collegestudent.usn}
              name="usn"
              id="usn"
              className="h-10 border-input-border border-[2px] rounded-md
              bg-username-input bg-no-repeat bg-[right_4px_top_4px] bg-[length:30px_30px] p-2"
            />
          </div>
          <div className="flex flex-col w-[300px] gap-1">
            <label
              htmlFor="course"
              className="font-roboto font-medium text-base text-login-register-label"
            >
              Course
            </label>
            <input
              type="text"
              placeholder="Enter Course"
              onChange={adddata}
              value={collegestudent.course}
              name="course"
              id="course"
              className="h-10 border-input-border border-[2px] rounded-md
              bg-username-input bg-no-repeat bg-[right_4px_top_4px] bg-[length:30px_30px] p-2"
            />
          </div>
        </div>
        <div className="my-3">
          <label className="font-roboto font-medium text-base text-login-register-label">Resume</label>
          <div className="flex items-center">
            <button
              onClick={handleButtonClikc}
              className="ease-in-out duration-500 hover:bg-purple-button hover:text-white text-purple-button rounded-full px-5 py-2 font-inter font-medium border-purple-button border-[2px] border-solid"
            >
              Choose File
            </button>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
            {fileName && <span className="ml-2">{fileName}</span>} {/* Display the selected file name */}
          </div>
        </div>
      </div>
      <div className="w-full flex items-center justify-center my-5">
        <button
          onClick={handleSubmit}
          className="bg-purple-button text-white font-roboto font-medium text-lg py-1 px-16 rounded-full"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default CollegeRegister;