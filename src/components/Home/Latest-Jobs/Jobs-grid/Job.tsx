import React from 'react'

const Job = (props) => {
  return (
    <div className="flex flex-col border-solid border-2 rounded-md py-7 px-6 gap-5 w-[700px] h-[350px]">
              <div className="flex justify-around">
                <div className="flex flex-col w-auto">
                  <h1 className="text-2xl font-bold">{props.element.job_title}</h1>
                  <div>
                    <h2 className="text-gray-800 text-xl font-medium">
                      @ {props.element.job_org}
                    </h2>
                  </div>
                  <div className="flex items-center">
                    <img
                      src="home/icons/Location_icon.png"
                      alt=""
                      className="w-4 h-5"
                    />
                    <div className="text-gray-500 max-w-[170px] text-wrap font-medium ml-1 text-lg">
                      {props.element.location}
                    </div>
                  </div>
                  <div className="flex ml-[-1px] text-lg">
                    <img src="SVG/Calendar.svg" alt="" className="w-5 h-6" />
                    <div className="text-gray-500 font-medium ml-1">
                      {props.element.date_posted}
                    </div>
                  </div>
                  <div className="flex items-center text-lg">
                    <img src="SVG/Money.svg" alt="" className="w-5 h-7" />
                    <div className="text-gray-500 font-medium mt-[-1px] ml-1">
                      {/* {props.element.salaryrange[0]} - {props.element.salaryrange[1]} */}
                      { props.element.salary}
                    </div>
                  </div>
                </div>
                <div>
                  <img
                     src={props.element.image_url}
                    alt=""
                    className="w-[300px] h-[150px] border-solid border-2 rounded-md object-contain"
                  />
                </div>
              </div>
              <div className="flex justify-around">
                <div className="flex flex-col gap-1 items-center justify-center w-36 h-24 text-gray-800 border-solid border-2 text-lg rounded-md">
                  <h1 className="font-medium">Experience</h1>
                  <h2>{props.element.experience}</h2>
                </div>
                <div className="flex flex-col justify-center items-center w-36 h-24 text-gray-800 border-solid border-2 text-lg rounded-md">
                  <h1 className="font-medium">Qualification</h1>
                  <h2 className="flex flex-col items-center">
                    {/* {props.element.qualification.map((d) => {
                      return (
                        <>
                          <div>{d}</div>
                        </>
                      );
                    })} */}
                    {props.element.education}
                  </h2>
                </div>
              </div>
            </div>
  )
}

export default Job