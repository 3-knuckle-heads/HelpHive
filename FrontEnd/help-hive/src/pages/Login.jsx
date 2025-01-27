import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const LoginPage = () => {
  const [isSignup, setIsSignup] = useState(false);
  
  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .when('isSignup', {
        is: true,
        then: (schema) => schema.required('Confirm Password is required'),
      }),
  });

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    setTimeout(() => {
      console.log('Form Values:', values);
      alert(`${isSignup ? 'Sign up' : 'Login'} successful!`);
      setSubmitting(false);
      resetForm();
    }, 2000);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
          {isSignup ? 'Sign Up' : 'Login'}
        </h2>

        <Formik
          initialValues={{ email: '', password: '', confirmPassword: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email</label>
                <Field
                  type="email"
                  name="email"
                  className="w-full p-3 border border-gray-300 rounded-md mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your email"
                />
                <ErrorMessage name="email" component="p" className="text-red-500 text-sm mt-1" />
              </div>

              <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password</label>
                <Field
                  type="password"
                  name="password"
                  className="w-full p-3 border border-gray-300 rounded-md mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your password"
                />
                <ErrorMessage name="password" component="p" className="text-red-500 text-sm mt-1" />
              </div>

              {isSignup && (
                <div className="mb-4">
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-600">Confirm Password</label>
                  <Field
                    type="password"
                    name="confirmPassword"
                    className="w-full p-3 border border-gray-300 rounded-md mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Confirm your password"
                  />
                  <ErrorMessage name="confirmPassword" component="p" className="text-red-500 text-sm mt-1" />
                </div>
              )}

              <button
                type="submit"
                className={`w-full py-3 ${isSubmitting ? 'bg-gray-400' : 'bg-blue-600'} text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Processing...' : isSignup ? 'Sign Up' : 'Login'}
              </button>
            </Form>
          )}
        </Formik>

        <div className="text-center mt-4">
          <button onClick={() => setIsSignup(!isSignup)} className="text-sm text-blue-500 hover:underline">
            {isSignup ? 'Already have an account? Login' : "Don't have an account? Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
