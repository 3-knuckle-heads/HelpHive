import React, { useState } from "react";
import bgImage from "../assets/BG.png";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = ({ onLoginSuccess }) => {
  const navigate = useNavigate();

  const validationSchema = () =>
    Yup.object({
      fullName: Yup.string(),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
      confirmPassword: Yup.string(),
      role: Yup.string(),
      dateOfBirth: Yup.date().nullable(),
    });

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    setTimeout(() => {
      const storedUserData = JSON.parse(localStorage.getItem("userData")) || {};

      if (
        storedUserData[values.email] &&
        storedUserData[values.email].password === values.password
      ) {
        // Simulate API call for login
        onLoginSuccess(storedUserData[values.email]);
        navigate("/");
      } else {
        toast.error("Invalid email or password.");
      }

      setSubmitting(false);
      resetForm();
    }, 2000);
  };

  return (
    <div
      className="flex flex-col items-left min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
    >
      <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md sm:max-w-xl md:max-w-2xl lg:max-w-3xl m-auto">
        <h2 className="text-3xl font-bold text-center text-gray-700 mb-6">
          Login
        </h2>
        <Formik
          initialValues={{
            fullName: "",
            email: "",
            password: "",
            confirmPassword: "",
            role: "",
            profilePic: "",
          }}
          validationSchema={validationSchema()}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, setFieldValue }) => (
            <Form>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">
                  Email
                </label>
                <Field
                  type="email"
                  name="email"
                  className="w-full p-3 border border-gray-300 rounded-md mt-2"
                  placeholder="Enter your email"
                />
                <ErrorMessage
                  name="email"
                  component="p"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">
                  Password
                </label>
                <Field
                  type="password"
                  name="password"
                  className="w-full p-3 border border-gray-300 rounded-md mt-2"
                  placeholder="Enter your password"
                />
                <ErrorMessage
                  name="password"
                  component="p"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <button
                type="submit"
                className={`w-full py-3 mt-2 ${
                  isSubmitting ? "bg-gray-400" : "bg-blue-600"
                } text-white rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500`}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Processing..." : "Login"}
              </button>
              <ToastContainer
                position="bottom-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
              />
            </Form>
          )}
        </Formik>
        <div className="text-center mt-4">
          <button
            onClick={() => navigate("/signup")}
            className="text-sm text-blue-500 hover:underline"
          >
            {"Don't have an account? Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
