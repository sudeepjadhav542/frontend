import React from "react";
import { splitArray } from "./split";
import { hiring } from "../Data/Hiring/Hiring";
import Displayimage from "./display";
const Display = (props) => {

  return <Displayimage array={props.arr} />;
};

export default Display;
