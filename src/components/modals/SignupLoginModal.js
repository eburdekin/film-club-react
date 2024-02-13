import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage, useFormik } from "formik";
import * as Yup from "yup";
import { useHistory } from "react-router-dom"; // Import useHistory hook

const LoginModal = ({ onClose, onLogin }) => {
  const history = useHistory();
  const [isLoginMode, setIsLoginMode] = useState(true);

  // email requirement not working with state variable
  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    email: Yup.string()
      .email("Invalid email")
      .when("isLoginMode", {
        is: false,
        then: Yup.string().required("Email is required"),
      }),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = async (values) => {
    try {
      const url = isLoginMode ? "/login" : "/signup";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (response.ok) {
        const userData = await response.json(); // Assuming the response contains user data
        onLogin(userData);
        history.push("/clubs");
      } else {
        const errorData = await response.json();
        // Handle errors
        throw new Error("Invalid username or password");
      }
    } catch (error) {
      console.error("Operation failed:", error.message);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 min-h-screen">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="bg-gray-100 dark:bg-gray-300 w-96 p-8 rounded-lg shadow-lg z-10 text-center">
        <h2 className="text-2xl font-semibold mb-4">
          {isLoginMode ? "Log In" : "Sign Up"}
        </h2>

        <Formik
          initialValues={{
            username: "",
            email: "",
            password: "",
            isLoginMode: isLoginMode,
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <Field
                type="text"
                id="username"
                name="username"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
              />
              <ErrorMessage
                name="username"
                component="div"
                className="text-red-500"
              />
            </div>
            {isLoginMode ? (
              ""
            ) : (
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500"
                />
              </div>
            )}
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <Field
                type="password"
                id="password"
                name="password"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500"
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-500 focus:outline-none focus:bg-purple-500"
              >
                Submit
              </button>
              <button
                onClick={onClose}
                className="font-semibold text-purple-500"
              >
                Cancel
              </button>
            </div>
          </Form>
        </Formik>
        <div className="mt-2">
          <button
            onClick={() => setIsLoginMode((prevMode) => !prevMode)}
            className="text-sm text-purple-800 hover:underline focus:outline-none"
          >
            {isLoginMode
              ? "Don't have an account? Sign Up"
              : "Already have an account? Log In"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
