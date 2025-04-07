// // src/components/Admin/AdminBlogs.tsx
// import React, { useEffect, useState } from "react";
// import { API_GET, API_POST, API_PUT, API_DELETE } from "../../utils/api_structure";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { Link } from 'react-router-dom';
// import BlogForm from "../Blog/BlogForm";
// import BlogList from "../Blog/BlogList";

// const AdminBlogs = () => {
//   const [blogs, setBlogs] = useState([]);
//   const [newBlog, setNewBlog] = useState({
//     title: "",
//     content: "",
//     author: "",
//   });

//   useEffect(() => {
//     fetchBlogs();
//   }, []);

//   const fetchBlogs = async () => {
//     const URL = "blogs";
//     const { result, status } = await API_GET(URL);
//     if (status === 200) {
//       setBlogs(result);
//     }
//   };

  

//   const addBlog = async () => {
//     const URL = "blogs";
//     const { result, status } = await API_POST(URL, newBlog);
//     if (status === 201) {
//       toast.success("Blog added successfully!", {
//         position: "top-center",
//         theme: "light",
//         closeOnClick: true,
//         pauseOnHover: true,
//       });
//       setNewBlog({ title: "", content: "", author: "" });
//       fetchBlogs();
//     } else {
//       toast.error(result.error, {
//         position: "top-center",
//         theme: "light",
//         closeOnClick: true,
//         pauseOnHover: true,
//       });
//     }
//   };

//   const updateBlog = async (blogId, updatedBlog) => {
//     const URL = `blogs/${blogId}`;
//     const { result, status } = await API_PUT(URL, updatedBlog);
//     if (status === 200) {
//       toast.success("Blog updated successfully!", {
//         position: "top-center",
//         theme: "light",
//         closeOnClick: true,
//         pauseOnHover: true,
//       });
//       fetchBlogs();
//     } else {
//       toast.error(result.error, {
//         position: "top-center",
//         theme: "light",
//         closeOnClick: true,
//         pauseOnHover: true,
//       });
//     }
//   };

//   const deleteBlog = async (blogId) => {
//     const URL = `blogs/${blogId}`;
//     const { result, status } = await API_DELETE(URL);
//     if (status === 200) {
//       toast.success("Blog deleted successfully!", {
//         position: "top-center",
//         theme: "light",
//         closeOnClick: true,
//         pauseOnHover: true,
//       });
//       fetchBlogs();
//     } else {
//       toast.error(result.error, {
//         position: "top-center",
//         theme: "light",
//         closeOnClick: true,
//         pauseOnHover: true,
//       });
//     }
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Manage Blogs</h1>
//       <div className="mb-4">
//         <BlogForm
//           blog={newBlog}
//           setBlog={setNewBlog}
//           onSubmit={addBlog}
//           buttonLabel="Add Blog"
//         />
//       </div>
//       <div>
//         <h2 className="text-xl font-bold mb-2">Blogs</h2>
//         <BlogList
//           blogs={blogs}
//           onEdit={updateBlog}
//           onDelete={deleteBlog}
//         />
//       </div>
//       <Link to="/admin/login" className="block mt-4 text-sm text-blue-500 hover:underline">
//         Logout
//       </Link>
//     </div>
//   );
// };

// export default AdminBlogs;