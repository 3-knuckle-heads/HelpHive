import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const Login = ({ onSignupSuccess }) => {
  const [isSignup, setIsSignup] = useState(false);

  const validationSchema = Yup.object({
    fullName: Yup.string().required("Full name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .when("isSignup", {
        is: true,
        then: (schema) => schema.required("Confirm Password is required"),
      }),
    role: Yup.string().required("Please select a role"),
  });

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    setTimeout(() => {
      const userData = {
        fullName: values.fullName,
        email: values.email,
        role: values.role,
      };

      onSignupSuccess(userData);
      setSubmitting(false);
      resetForm();
    }, 2000);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
          {isSignup ? "Sign Up" : "Login"}
        </h2>

        <Formik
          initialValues={{ fullName: "", email: "", password: "", confirmPassword: "", role: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              {isSignup && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-600">Full Name</label>
                  <Field
                    type="text"
                    name="fullName"
                    className="w-full p-3 border border-gray-300 rounded-md mt-2 focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your full name"
                  />
                  <ErrorMessage name="fullName" component="p" className="text-red-500 text-sm mt-1" />
                </div>
              )}

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">Email</label>
                <Field
                  type="email"
                  name="email"
                  className="w-full p-3 border border-gray-300 rounded-md mt-2 focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your email"
                />
                <ErrorMessage name="email" component="p" className="text-red-500 text-sm mt-1" />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">Password</label>
                <Field
                  type="password"
                  name="password"
                  className="w-full p-3 border border-gray-300 rounded-md mt-2 focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your password"
                />
                <ErrorMessage name="password" component="p" className="text-red-500 text-sm mt-1" />
              </div>

              {isSignup && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-600">Confirm Password</label>
                  <Field
                    type="password"
                    name="confirmPassword"
                    className="w-full p-3 border border-gray-300 rounded-md mt-2 focus:ring-2 focus:ring-blue-500"
                    placeholder="Confirm your password"
                  />
                  <ErrorMessage name="confirmPassword" component="p" className="text-red-500 text-sm mt-1" />
                </div>
              )}
              
              {isSignup && (
                    <><div className="mb-4">
                  <label className="block text-sm font-medium text-gray-600">Profile Picture</label>
                  <input
                    type="file"
                    name="profilePic"
                    accept="image/*"
                    onChange={(event) => {
                      setFieldValue("profilePic", event.currentTarget.files[0]);
                    } }
                    className="w-full p-3 border border-gray-300 rounded-md mt-2 focus:ring-2 focus:ring-blue-500" />
                  <ErrorMessage name="profilePic" component="p" className="text-red-500 text-sm mt-1" />
                </div><div className="mb-4">
                    <label className="block text-sm font-medium text-gray-600">Role</label>
                    <Field as="select" name="role" className="w-full p-3 border border-gray-300 rounded-md mt-2">
                      <option value="">Select Role</option>
                      <option value="volunteer">Volunteer</option>
                      <option value="eventHost">Event Host</option>
                    </Field>
                    <ErrorMessage name="role" component="p" className="text-red-500 text-sm mt-1" />
                  </div></>
              )}

              <button
                type="submit"
                className={`w-full py-3 ${isSubmitting ? "bg-gray-400" : "bg-blue-600"} text-white rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500`}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Processing..." : isSignup ? "Sign Up" : "Login"}
              </button>
            </Form>
          )}
        </Formik>

        <div className="text-center mt-4">
          <button onClick={() => setIsSignup(!isSignup)} className="text-sm text-blue-500 hover:underline">
            {isSignup ? "Already have an account? Login" : "Don't have an account? Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
