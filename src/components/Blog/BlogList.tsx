// BlogList.js
import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import blogs from "./Blog_Details";
import  "./BlogList.css"; // Ensure correct import path
import Footer from "../Footer/Footer";

const BlogList = () => {
  return (
    <>
      <Helmet>
        <title>Blog Posts</title>
        <meta
          name="description"
          content="Read the latest blog posts from our platform. Stay updated with industry insights and tips."
        />
      </Helmet>
      <div className="blog-list">
        {blogs.map((blog) => (
          <div key={blog.id} className="blog-card">
            {blog.image_url && (
              <img
                src={blog.image_url}
                alt={blog.title}
                className="blog-card-image"
              />
            )}
            <div className="blog-card-content">
              <h2 className="blog-card-title">{blog.title}</h2>
              <p className="blog-card-summary">{blog.summary}</p>
              <p className="blog-card-date">Published on: {blog.date}</p>
              <Link to={`/blogs/${blog.id}`} className="read-more-link">
                Read More
              </Link>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
};

export default BlogList;