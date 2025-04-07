import React from "react";

const CollegeLogin = () => {
  return (
    <div className="w-[470px] h-[400px] bg-white drop-shadow-xl p-7 flex flex-col gap-5 rounded-lg">
      <div className="flex w-full justify-center ">
        <h1 className="text-2xl font-bold font-roboto">LOGIN</h1>
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
            type="text"
            placeholder="Enter Email"
            // onChange={adddata}
            // value={logdata.email}
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
            // onChange={adddata}
            // value={logdata.password}
            name="password"
            id="password"
            className="h-10 rounded-md p-3 bg-password-input bg-no-repeat bg-[right_4px_top_4px] bg-[length:30px_30px] border-[2px] border-input-border focus:outline-none"
          />
        </div>
        <div className="flex justify-center items-center mt-3">
          <button
            // onClick={senddata}
            className="px-[70px] py-2 bg-purple-button text-lg rounded-full font-medium font-roboto text-white "
          >
            Sign In
          </button>
          {/* <a href="" className="font-medium font-roboto text-[#5C5C5C]">
            Forgot Password?
          </a> */}
        </div>
      </div>
    </div>
  );
};

export default CollegeLogin;
