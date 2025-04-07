import React from "react";
import Carousel from "react-material-ui-carousel";
import { hiring } from "../../../Data/Hiring/Hiring";
import { splitArray } from "../../../utils/split";
import Displayimage from "../../../utils/display";
const HiringSection = () => {
  // console.log("arr1 = "+arr1+"arr2 = "+arr2);
  let [arr1, arr2, arr3, arr4, arr5, arr6] = splitArray(hiring);
  return (
    <Carousel 
    autoPlay={true}
    navButtonsAlwaysInvisible={true}
    animation="slide"
    duration={900}
    interval={3000}
    indicators={false}
    className="flex flex-col w-[1300px] h-[200px] mt-[90px] mb-[50px] justify-center">
      <Displayimage arr={arr1}/>
      <Displayimage arr={arr2}/>
      <Displayimage arr={arr3}/>
      <Displayimage arr={arr4}/>
      <Displayimage arr={arr5}/>

    </Carousel>
  );
};

export default HiringSection;
