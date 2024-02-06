import { useState } from "react";

const LoginModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

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
      const response = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // "Access-Control-Allow-Credentials": "true",
        },
        body: JSON.stringify(formData),
        // credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        console.log("Successful login", data);
        // onClose(); // Close the modal after successful creation
      } else {
        const errorData = await response.json();
        // Check if errorData contains specific field errors
        if (errorData.error && typeof errorData.error === "object") {
          const errorMessage = Object.values(errorData.error)
            .map((errors) => errors.join(", "))
            .join(", ");
          throw new Error(errorMessage);
        } else {
          throw new Error("Log in failed");
        }
      }
    } catch (error) {
      console.error("Log in failed:", error.message);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="bg-gray-100 dark:bg-gray-300 w-96 p-8 rounded-lg shadow-lg z-10 text-center">
        <h2 className="text-2xl font-semibold mb-4">Log In</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="username"
              id="username"
              name="username"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={formData.username}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-2">
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
              Log In
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
      </div>
    </div>
  );
};

export default LoginModal;
