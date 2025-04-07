// Blog.js
import React from 'react';
import { useParams } from 'react-router-dom';
import blogs from "./Blog_Details"; 
import { Helmet } from 'react-helmet';
import './Blog.css';
import './BlogDetails.css'; 
import Footer from '../Footer/Footer';

const Blog = () => {
  const { id } = useParams();
  const blog = id ? blogs.find(blog => blog.id === parseInt(id)) : undefined;

  if (!blog) {
    return <div>Blog not found</div>;
  }

  return (
    <>
    <div className="blog-container">
      <Helmet>
        <title>{blog.title}</title>
        <meta name="description" content={blog.summary} />
      </Helmet>
      {blog.image_url && (
          <img
            src={blog.image_url}
            alt={blog.title}
            className="blog-image"
          />
        )}
      <h1 className="blog-title">{blog.title}</h1>
      <div className="blog-meta">
        <span className="blog-author">Author:</span> Mailerjobs Editorial Team
        <br />
        <span className="blog-date">Published on:</span> {blog.date}
      </div>
      <div
        className="blog-content"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />
    </div>
    <Footer />
    </>
  );
};

export default Blog;