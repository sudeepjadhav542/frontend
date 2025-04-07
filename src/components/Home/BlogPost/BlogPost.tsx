import React from "react";

const BlogPost = () => {
  return (
    <div className="flex gap-[180px] justify-center my-10">
      <div>
        <img
          src="Background2.jpg"
          alt=""
          className="w-[550px] rounded-sm drop-shadow-lg"
        />
        <div className="flex flex-col gap-2 mt-8">
          <h1 className="font-poppins font-bold text-3xl">BLOG TITLE</h1>
          <p className="w-[500px] text-2xl font-medium font-poppins text-gray-600">
            These are short, famous texts in English from classic sources like
            the Bible or Shakespeare. Some texts have word definitions and
            explanations to help you.
          </p>
        </div>
      </div>
      <div>
        <img
          src="Background2.jpg"
          alt=""
          className="w-[550px] rounded-sm drop-shadow-lg"
        />
        <div className="flex flex-col gap-2 mt-8">
          <h1 className="font-poppins font-bold text-3xl">BLOG TITLE</h1>
          <p className="w-[500px] text-2xl font-medium font-poppins text-gray-600">
            These are short, famous texts in English from classic sources like
            the Bible or Shakespeare. Some texts have word definitions and
            explanations to help you.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
