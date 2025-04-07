// @ts-nocheck
import React, { useContext } from "react";
import ClientRightProfileBI from "./ClientRightProfileBI";
import ClientRightProfileSL from "./ClientRightProfileSL";
import ClientRightProfileAL from "./ClientRightProfileAL";
import { JobIndex } from "../context/job_list_context";
import { API_POST,API_PATCH_AUTH } from "../../utils/api_structure";

const ClientRightProfile = () => {
  const { clientid, setClientId, clientprofileBI, setClientProfileBI } =
    useContext(JobIndex);

  async function getClientsDetails() {
    const URL = `client/${clientid["id"]}`;
    const { result, status } = await API_POST(URL, "details");
    setClientId(result);
  }

  async function updateDetails() {
    const URL = `client-update/${clientid.id}`;
    const token = localStorage.getItem("client-token")
    console.log("Token: " + token);
    const { result, status } = await API_PATCH_AUTH(URL, clientprofileBI, token);
    getCandidateDeatils();
  }

  console.log(clientprofileBI);

  return (
    <div>
      <ClientRightProfileBI />
      <ClientRightProfileSL />
      <ClientRightProfileAL />
      <button
        onClick={updateDetails}
        className="bg-purple-button w-[200px] py-2 text-lg font-medium font-inter text-white rounded-md"
      >
        Save Settings
      </button>
    </div>
  );
};

export default ClientRightProfile;
