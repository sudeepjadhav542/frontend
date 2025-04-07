// @ts-nocheck
import { useContext } from "react";
import { JobIndex } from "../components/context/job_list_context";


const fetchskills = async (job_index) => {
  try {
    const res = await fetch(`http://127.0.0.1:8000/skill?id=${job_index.id}`);
    if (!res.ok) {
      throw new Error("Network res not ok");
    }
    const result = await res.json();
    // console.log("result = " + JSON.stringify(result));
    return result;
  } catch (error) {
    console.error(" jls error = " + error);
  }
};

export default fetchskills;
