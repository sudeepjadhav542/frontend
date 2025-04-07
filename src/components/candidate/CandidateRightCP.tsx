import React, { useState } from "react";
import { API_PATCH_AUTH } from "../../utils/api_structure";
import { toast } from "react-toastify";

const CandidateRightCP = () => {
  const [passworddetails, setPasswordDetails] = useState({
    new_password: "",
    confirm_password: "",
  });

  console.log(passworddetails);

  const can_id = localStorage.getItem("can-id");

  async function changePass() {
    const URL = `candidate-pass-change/${can_id}`;
    const token = localStorage.getItem("token");
    const { result, status } = await API_PATCH_AUTH(
      URL,
      passworddetails,
      token
    );
    if (status == 200) {
      toast.success("PWD C", {
        position: "top-center",
        theme: "light",
        closeOnClick: true,
        pauseOnHover: true,
      });
    }
  }

  const adddata = (e) => {
    const { name, value } = e.target;

    setPasswordDetails(() => {
      return {
        ...passworddetails,
        [name]: value,
      };
    });
  };

  return (
    <div className="w-full border-[1px] gap-4 flex flex-col p-5">
      <div>
        <h1 className="text-2xl font-semibold text-purple-button">
          CHANGE PASSWORD
        </h1>
      </div>
      <div className="w-full border-t-[1px] border-gray-100" />
      <div className="flex gap-10 items-center justify-center mt-10">
        <div className="flex flex-col">
          <label htmlFor="new_password" className="text-lg font-medium">
            New Password
          </label>
          <input
            type="password"
            placeholder="New Password"
            onChange={adddata}
            value={passworddetails.new_password}
            id="new_password"
            name="new_password"
            className="h-10 p-3 focus:outline-none border-[1px] border-gray-300 rounded-[4px] w-[300px]"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="confirm_password" className="text-lg font-medium">
            Re-Type Password
          </label>
          <input
            type="password"
            placeholder="Re-Type Password"
            onChange={adddata}
            value={passworddetails.confirm_password}
            id="confirm_password"
            name="confirm_password"
            className="h-10 p-3 focus:outline-none border-[1px] border-gray-300 rounded-[4px] w-[300px]"
          />
        </div>
      </div>
      <div className="flex my-5 w-full justify-center items-center">
        <button
          onClick={changePass}
          className="bg-purple-button py-2 px-5 rounded-lg text-white font-medium text-base"
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default CandidateRightCP;
