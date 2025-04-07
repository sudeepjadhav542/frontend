import React, { useState } from "react";
import { toast } from "react-toastify";
import { API_POST } from "../utils/api_structure";
import "./JobFairRegistration.css";

const JobFairRegistration = () => {

  const d = new Date();
  const currentYear = d.getFullYear();
  const month = d.getMonth() + 1;
  const day = d.getDate();

  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    gender: "",
    phone: "",
    email: "",
    institution: "",
    degree: "",
    graduation_year: "",
    reg_no: "",
    resume: null as File | null,
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFormData({ ...formData, resume: e.target.files[0] });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.name || !formData.email || !formData.phone || !formData.resume) {
      toast.error("Please fill all required fields!", { position: "top-center" });
      return;
    }

    const data = new FormData();
    Object.keys(formData).forEach((key) => data.append(key, formData[key]));

    try {
      const response = await API_POST("jobfair/register", data);
      if (response && response.status === 201) {
        toast.success("Registration successful!", { position: "top-center" });
        console.log("Student ID:", response.result.student_id);
      } else {
        toast.error("Registration failed", { position: "top-center" });
      }
    } catch (error) {
      toast.error("User already exist", { position: "top-center" });
      console.error("Error Details:", error);
    }
  };

  return (
    <div className="registration-container">
      <h1 className="form-title">Bangalore Job Fair Registration ({day}-{month}-{currentYear})</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data" className="form-grid">
        {/* Row 1 */}
        <div className="form-group">
          <label>Full Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />
        </div>
        <div className="form-group">
          <label>Date of Birth</label>
          <input type="date" name="dob" value={formData.dob} onChange={handleInputChange} required />
        </div>

        {/* Row 2 */}
        <div className="form-group">
          <label>Gender</label>
          <select name="gender" value={formData.gender} onChange={handleInputChange} required>
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="form-group">
          <label>Contact Number</label>
          <input type="text" name="phone" value={formData.phone} onChange={handleInputChange} required />
        </div>

        {/* Row 3 */}
        <div className="form-group">
          <label>Email Address</label>
          <input type="email" name="email" value={formData.email} onChange={handleInputChange} required />
        </div>
        <div className="form-group">
          <label>Institution</label>
          <input type="text" name="institution" value={formData.institution} onChange={handleInputChange} />
        </div>

        {/* Row 4 */}
        <div className="form-group">
          <label>Degree</label>
          <input name="degree" value={formData.degree} onChange={handleInputChange} required/>
        </div>
        <div className="form-group">
          <label>Graduation Year</label>
          <select name="graduation_year" value={formData.graduation_year} onChange={handleInputChange} required>
            <option value="">Select</option>
            <option value="2024">2024</option>
            <option value="2025">2025</option>
            <option value="2026">2026</option>
          </select>
        </div>

        {/* Row 5 */}
        <div className="form-group">
          <label>Register Number</label>
          <input type="text" name="reg_no" value={formData.reg_no} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label>Resume</label>
          <input type="file" name="resume" onChange={handleFileChange} required />
        </div>

        {/* Submit Button (Spans Two Columns) */}
    
        <div className="div-image ">
          <h3>Please scan the below QR code to make your payment</h3>
          <img src="/qr-code.jpg" alt="" className="qr-code"/>
        </div>
        
        <div className="form-group full-width">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default JobFairRegistration;
