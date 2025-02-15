import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

const Signup = ({ onLoginSuccess }) => {
  const navigate = useNavigate();

  const validationSchema = () =>
    Yup.object({
      fullName: Yup.string().required("Full name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm Password is required"),
      role: Yup.string().required("Please select a role"),
      dateOfBirth: Yup.date().required("Please provide your date of birth"),
    });

  const handleImageChange = (e, setFieldValue) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFieldValue("profilePic", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    setTimeout(() => {
      const storedUserData = JSON.parse(localStorage.getItem("userData")) || {};

      if (storedUserData[values.email]) {
        alert("User with this email already exists.");
        setSubmitting(false);
        return;
      }

      // Create a new profile
      storedUserData[values.email] = {
        email: values.email,
        password: values.password,
        fullName: values.fullName,
        role: values.role,
        dateOfBirth: values.dateOfBirth,
        profilePic: values.profilePic || "",
      };

      localStorage.setItem("userData", JSON.stringify(storedUserData));

      // Simulate API call for signup
      onLoginSuccess(storedUserData[values.email]);
      navigate("/profile");

      setSubmitting(false);
      resetForm();
    }, 2000);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
          {"Sign Up"}
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
                  Full Name
                </label>
                <Field
                  type="text"
                  name="fullName"
                  className="w-full p-3 border border-gray-300 rounded-md mt-2"
                  placeholder="Enter your full name"
                />
                <ErrorMessage
                  name="fullName"
                  component="p"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">
                  Date of Birth
                </label>
                <Field
                  type="date"
                  name="dateOfBirth"
                  className="w-full p-3 border border-gray-300 rounded-md mt-2"
                />
                <ErrorMessage
                  name="dateOfBirth"
                  component="p"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

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

              <div className="mb-4">
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

              <div className="mb-4 mt-16">
                <label
                  htmlFor="profilePic"
                  className="block text-sm font-medium text-gray-600"
                >
                  Profile Picture
                </label>
                <input
                  type="file"
                  name="profilePic"
                  accept="image/*"
                  onChange={(e) => handleImageChange(e, setFieldValue)}
                  className="w-full p-3 border border-gray-300 rounded-md mt-2"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">
                  Role
                </label>
                <Field
                  as="select"
                  name="role"
                  className="w-full p-3 border border-gray-300 rounded-md mt-2"
                >
                  <option value="">Select Role</option>
                  <option value="volunteer">Volunteer</option>
                  <option value="eventHost">Event Host</option>
                </Field>
                <ErrorMessage
                  name="role"
                  component="p"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <button
                type="submit"
                className={`w-full py-3 ${
                  isSubmitting ? "bg-gray-400" : "bg-blue-600"
                } text-white rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500`}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Processing..." : "Sign Up"}
              </button>
            </Form>
          )}
        </Formik>

        <div className="text-center mt-4">
          <button
            onClick={() => navigate("/login")}
            className="text-sm text-blue-500 hover:underline"
          >
            {"Already have an account? Login"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
