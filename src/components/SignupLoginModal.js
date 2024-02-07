import React, { useState } from "react";

const LoginModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "", // New field for sign up
    password: "",
  });
  const [isLoginMode, setIsLoginMode] = useState(true); // Toggle state

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = isLoginMode ? "/login" : "/signup";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const userData = await response.json(); // Assuming the response contains user data
        console.log("Successful operation", userData);
        onClose(userData);
      } else {
        const errorData = await response.json();
        // Handle errors
        throw new Error("Operation failed");
      }
    } catch (error) {
      console.error("Operation failed:", error.message);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="bg-gray-100 dark:bg-gray-300 w-96 p-8 rounded-lg shadow-lg z-10 text-center">
        <h2 className="text-2xl font-semibold mb-4">
          {isLoginMode ? "Log In" : "Sign Up"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={formData.username}
              onChange={handleInputChange}
              required
            />
          </div>
          {isLoginMode ? null : (
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={formData.email}
                onChange={handleInputChange}
                required
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
            <input
              type="password"
              id="password"
              name="password"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="text-xs mb-4">Forgot your password? Click here.</div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-cyan-500 text-white px-4 py-2 rounded-md hover:bg-cyan-600 focus:outline-none focus:bg-cyan-600"
            >
              {isLoginMode ? "Log In" : "Sign Up"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="text-gray-600 hover:text-gray-800 focus:outline-none"
            >
              Cancel
            </button>
          </div>
        </form>
        <div className="mt-2">
          <button
            onClick={() => setIsLoginMode((prevMode) => !prevMode)}
            className="text-sm text-cyan-800 hover:underline focus:outline-none"
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
