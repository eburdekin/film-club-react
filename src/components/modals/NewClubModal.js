import { useState } from "react";

import { useUser } from "../../contexts/userContext";

export default function NewClubModal({ onClose }) {
  const { user } = useUser();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleJoin = (clubId) => {
    const url = `/clubs/${clubId}/add_user`;
    const method = "POST";

    fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_id: user.id }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/clubs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const data = await response.json();
        console.log("New club created:", data);
        handleJoin(data.id);
        onClose(); // Close the modal after successful creation
      } else {
        const errorData = await response.json();
        // Check if errorData contains specific field errors
        if (errorData.error && typeof errorData.error === "object") {
          const errorMessage = Object.values(errorData.error)
            .map((errors) => errors.join(", "))
            .join(", ");
          throw new Error(errorMessage);
        } else {
          throw new Error("Failed to create club");
        }
      }
    } catch (error) {
      console.error("Error creating club:", error.message);
      setErrorMessage(
        error.message || "Failed to create club. Please try again."
      );
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="bg-gray-100 dark:bg-gray-300 w-96 p-8 rounded-lg shadow-lg z-10 text-center">
        <h2 className="text-2xl font-semibold mb-4">New Club</h2>
        {errorMessage && <p className="text-red-500 mb-2">{errorMessage}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              maxLength="50"
              value={formData.name}
              onChange={handleInputChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <input
              type="text"
              id="description"
              name="description"
              maxLength="150"
              value={formData.description}
              onChange={handleInputChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            ></input>
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-500 focus:outline-none focus:bg-purple-500"
            >
              Create Club
            </button>
            <button
              type="button"
              onClick={onClose}
              className="text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
