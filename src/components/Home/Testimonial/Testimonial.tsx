import React from "react";
import { Testimonials } from "../../../Data/Testimonial/Testimonials";

const Testimonial = () => {
  return (
    <div className="flex flex-col items-center my-16 pb-11">
      
      <div className="font-inter w-[660px] bg-white pt-10 pb-7 px-14 text-lg rounded-2xl">
        <p className="Arial, sans-serif; text-justify">{Testimonials[0].description}</p>
        <h1 className="text-xl mt-8 Arial, sans-serif;">{Testimonials[0].name}</h1>
        <h2 className="text-lg Arial, sans-serif; text-gray-500">{Testimonials[0].location}</h2>
      </div>
    </div>
  );
};

export default Testimonial;
