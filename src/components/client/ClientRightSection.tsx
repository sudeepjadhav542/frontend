// @ts-nocheck
import React, { useContext } from "react";
import { JobIndex } from "../context/job_list_context";
import ClientRightProfile from "./ClientRightProfile";
import ClientRightJobs from "./ClientRightJobs";
import ClientRightPostJobs from "./ClientRightPostJobs";
import ClientRightCP from "./ClientRightCP";
import ClientJobView from "./ClientJobView";
import ClientCandiateList from "./ClientCandiateList";

const ClientRightSection = () => {
  const { clientprofiletype, setClientProfileType } = useContext(JobIndex);

  return (
    <div className="bg-white flex-grow">
      {clientprofiletype === "profile" ? (
        <ClientRightProfile />
      ) : clientprofiletype === "jobs" ? (
        <ClientRightJobs />
      ) : clientprofiletype === "post-job" ? (
        <ClientRightPostJobs />
      ) : clientprofiletype === "cp" ? (
        <ClientRightCP />
      ) : clientprofiletype === "view-job" ? (
        <ClientJobView />
      ) : clientprofiletype === "candidate-list" ? (
        <ClientCandiateList />
      ) : (
        <div>Hello</div>
      )}
    </div>
  );
};

export default ClientRightSection;
