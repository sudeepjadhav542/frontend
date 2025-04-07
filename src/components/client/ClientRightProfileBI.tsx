// @ts-nocheck
import React, { useContext } from "react";
import { JobIndex } from "../context/job_list_context";
import DropDownMenu from "../candidate/DropDownMenu";
import { sector } from "../../Data/Jobs/Categories/Cat_data";

const ClientRightProfileBI = () => {
  const { clientid, setClientId, clientprofileBI, setClientProfileBI } =
    useContext(JobIndex);

  // const clientDetails = clientId || [];
//   console.log(clientprofileBI);

console.log(clientid);



  const adddata = (e) => {
    const { name, value } = e.target;

    setClientProfileBI(() => {
      return {
        ...clientprofileBI,
        [name]: value,
      };
    });
  };

  const addDataMenu = (name, value) => {
    setClientProfileBI(() => {
      return {
        ...clientprofileBI,
        [name]: value,
      };
    });
  };
  return (
    <div className="w-full border-[1px] gap-4 flex flex-col p-5">
      <div className="flex justify-center">
        <h1 className="text-2xl font-semibold text-purple-button">
          BASIC INFORMATION
        </h1>
      </div>
      <div className="w-full border-t-[1px] border-gray-100" />
      <div className="flex w-full justify-around gap-10">
        <div className="flex flex-col gap-2">
          <label
            htmlFor="first_name"
            className="text-lg font-medium font-inter"
          >
            First Name
          </label>
          <input
            type="text"
            onChange={adddata}
            placeholder={clientid.first_name || "Enter First name"}
            value={clientprofileBI.first_name}
            name="first_name"
            id="first_name"
            className="h-10 p-3 focus:outline-none border-[1px] border-gray-300 rounded-[4px] w-[300px]"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="last_name" className="text-lg font-medium font-inter">
            Last Name
          </label>
          <input
            type="text"
            onChange={adddata}
            placeholder={clientid.last_name || "Enter Last name"}
            value={clientprofileBI.last_name}
            name="last_name"
            id="last_name"
            className="h-10 p-3 focus:outline-none border-[1px] border-gray-300 rounded-[4px] w-[300px]"
          />
        </div>
      </div>
      <div className="flex w-full justify-around gap-10">
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-lg font-medium font-inter">
            Email
          </label>
          <input
            type="text"
            onChange={adddata}
            placeholder={clientid.email || "Enter Email"}
            value={clientprofileBI.email}
            name="email"
            id="email"
            className="h-10 p-3 focus:outline-none border-[1px] border-gray-300 rounded-[4px] w-[300px]"
          />
        </div>
        <div className="flex flex-col gap-2 w-[300px]">
          <label htmlFor="sector" className="text-lg font-medium font-inter">
            Sector
          </label>
          <DropDownMenu
            options={sector}
            name={clientid.sector ? clientid.sector : "Select Sector"}
            onchange={addDataMenu}
            id={"sector"}
            selectedOption={undefined}
            setSelected={undefined}
          />
        </div>
      </div>
      <div className="flex w-full justify-around gap-10">
        <div className="flex flex-col gap-2">
          <label htmlFor="phone_no" className="text-lg font-medium font-inter">
            Phone
          </label>
          <input
            type="text"
            onChange={adddata}
            placeholder={clientid.phone_no || "Enter Phone Number"}
            value={clientprofileBI.phone_no}
            name="phone_no"
            id="phone_no"
            className="h-10 p-3 focus:outline-none border-[1px] border-gray-300 rounded-[4px] w-[300px]"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="company_name" className="text-lg font-medium font-inter">
            Company Name
          </label>
          <input
            type="text"
            onChange={adddata}
            placeholder={clientid.company_name || "Enter Company Name"}
            value={clientprofileBI.company_name}
            name="college_name"
            id="college_name"
            className="h-10 p-3 focus:outline-none border-[1px] border-gray-300 rounded-[4px] w-[300px]"
          />
        </div>
      </div>
      <div className="flex w-full ml-[85px] gap-10">
        <div className="flex flex-col gap-2 justify-start">
          <label htmlFor="" className="text-lg font-medium font-inter">
            Company Website
          </label>
          <input
            type="text"
            onChange={adddata}
            placeholder={clientid.company_url || "Enter Company Website"}
            value={clientprofileBI.company_url}
            name="company_url"
            id="company_url"
            className="h-10 p-3 focus:outline-none border-[1px] border-gray-300 rounded-[4px] w-[500px]"
          />
        </div>
      </div>
    </div>
  );
};

export default ClientRightProfileBI;
