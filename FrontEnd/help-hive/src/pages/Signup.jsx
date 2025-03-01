import React from "react";
import bgImage from "../assets/BG.png";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";

const Signup = ({ onLoginSuccess }) => {
  const navigate = useNavigate();

  const validationSchema = () =>
    Yup.object({
      firstName: Yup.string().required("First name is required"),
      lastName: Yup.string(),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      // phonenumber: Yup.string()
      //   .matches(/^[0-9]{11}$/, "Phone number must be exactly 10 digits")
      //   .required("Phone number is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm Password is required"),
      role: Yup.string().required("Please select a role"),
    });

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    const data = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      //     phonenumber: values.phonenumber,
      password: values.password,
      role: values.role,
    };

    axios
      .post("http://localhost:4000/api/v1/signup", data)
      .then(function (res) {
        onLoginSuccess(data);
        navigate("/profile");
        console.log(res.data);
      })
      .catch(function (err) {
        setSubmitting(false);
        toast.error("Register failed! Please try again.");
        console.log(err);
      });

    setSubmitting(false);
    resetForm();
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
    >
      <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-4xl m-auto">
        <h2 className="text-3xl font-bold text-center text-gray-700 mb-6">
          Sign Up
        </h2>

        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            phonenumber: "",
            password: "",
            confirmPassword: "",
            role: "volunteer",
          }}
          validationSchema={validationSchema()}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600">
                    First Name
                  </label>
                  <Field
                    type="text"
                    name="firstName"
                    className="w-full p-3 border border-gray-300 rounded-md mt-2"
                    placeholder="Enter your first name"
                  />
                  <ErrorMessage
                    name="firstName"
                    component="p"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">
                    Last Name
                  </label>
                  <Field
                    type="text"
                    name="lastName"
                    className="w-full p-3 border border-gray-300 rounded-md mt-2"
                    placeholder="Enter your last name"
                  />
                  <ErrorMessage
                    name="lastName"
                    component="p"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
              </div>

              <div className="mt-4">
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="mt-0">
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

                <div className="mt-0">
                  <label className="block text-sm font-medium text-gray-600">
                    Confirm Password
                  </label>
                  <Field
                    type="password"
                    name="confirmPassword"
                    className="w-full p-3 border border-gray-300 rounded-md mt-2"
                    placeholder="Confirm your password"
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    component="p"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-600">
                  Role
                </label>
                <Field
                  as="select"
                  name="role"
                  className="w-full p-3 border border-gray-300 rounded-md mt-2"
                >
                  <option value="volunteer">Volunteer</option>
                  <option value="host">Event Host</option>
                </Field>
                <ErrorMessage
                  name="role"
                  component="p"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <button
                type="submit"
                className={`w-full py-3 mt-6 rounded-md text-white text-lg font-medium transition ${
                  isSubmitting ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
                }`}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Processing..." : "Sign Up"}
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
            onClick={() => navigate("/login")}
            className="text-sm text-blue-500 hover:underline"
          >
            Already have an account? Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
