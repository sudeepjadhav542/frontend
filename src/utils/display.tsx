import React from "react";

const Displayimage = (props) => {
  return (
    <div>
      <div className="flex items-center justify-center gap-10">
        {props.arr.map((e,key) => {
          return (
            <div key={key} className="w-[300px] h-[200px] drop-shadow-xl">
              <img src={e.img} alt="" className="rounded-lg" />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Displayimage;
