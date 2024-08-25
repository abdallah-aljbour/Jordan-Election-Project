import React, { useState } from "react";
import axios from "../components/axios";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    nationalID: "", // Updated to match Citizen model's NationalID field
    password: "", // No change needed here
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const sharedStyles = {
    pageContainer:
      "flex justify-center items-center min-h-screen bg-gray-100 p-4",
    formContainer:
      "bg-white p-8 rounded-lg shadow-lg w-full max-w-md border border-gray-200",
    title: "text-3xl font-bold mb-6 text-center text-gray-800",
    input:
      "w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition duration-300 mb-4",
    button:
      "w-full bg-[#DA2A29] text-white p-3 rounded-md hover:bg-red-600 transition duration-300 font-semibold text-lg shadow-md",
    errorText: "text-red-500 text-center mb-4",
    linkText: "mt-6 text-center text-gray-600",
    link: "text-[#DA2A29] hover:underline font-semibold",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
      localStorage.setItem("nationalID", formData.nationalID); // Find the user in the database
    try {
      console.log("Attempting login with:", formData);
      const response = await axios.post(
        "http://localhost:4026/api/users/login",
        formData
      );
      console.log("Login response:", response.data);
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("nationalID",formData.nationalID);
        console.log("Token stored, navigating to /chat");
        navigate("/");
        console.log("Navigation called");
      } else {
        setError("Login failed: No token received");
      }
    } catch (error) {
      console.error(
        "Error during login:",
        error.response ? error.response.data : error.message
      );
      setError(
        error.response
          ? error.response.data.error
          : "An error occurred during login"
      );
    }
  };

  return (
    <div className={sharedStyles.pageContainer}>
      <div className={sharedStyles.formContainer}>
        <h2 className={sharedStyles.title}>تسجيل الدخول</h2>
        {error && <p className={sharedStyles.errorText}>{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="nationalID"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              رقم الهوية الوطنية
            </label>
            <input
              id="nationalID"
              type="text"
              name="nationalID" // Updated to match Citizen model's NationalID field
              value={formData.nationalID}
              onChange={handleChange}
              placeholder="أدخل رقم الهوية الوطنية"
              className={sharedStyles.input}
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              كلمة المرور
            </label>
            <input
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="أدخل كلمة المرور"
              className={sharedStyles.input}
              required
            />
          </div>
          <button type="submit" className={sharedStyles.button}>
            تسجيل الدخول
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
