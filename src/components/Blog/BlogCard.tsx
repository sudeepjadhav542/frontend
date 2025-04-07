import React from "react";
import { useNavigate } from "react-router-dom";

const BlogCard = ({ id, title, author, date, summary, image }) => {
  const navigate = useNavigate();

  return (
    <div
      className="bg-white shadow-lg rounded-2xl overflow-hidden w-full max-w-md cursor-pointer hover:shadow-xl transition"
      onClick={() => navigate(`/blog/${id}`)}
    >
      {image && <img src={image} alt={title} className="w-full h-48 object-cover" />}
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
        <p className="text-sm text-gray-500">By {author} • {date}</p>
        <p className="text-gray-600 mt-2">{summary}</p>
        <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
          Read More
        </button>
      </div>
    </div>
  );
};

export default BlogCard;
