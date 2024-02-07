import { useState } from "react";

const NewClubModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    public: true,
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleToggleChange = () => {
    setFormData({
      ...formData,
      public: !formData.public,
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
              value={formData.description}
              onChange={handleInputChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            ></input>
          </div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-gray-700">
              Visibility:
            </span>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                name="isPublic"
                checked={formData.public}
                onChange={handleToggleChange}
                className="h-5 w-5 text-cyan-600 focus:ring-cyan-500 border-gray-300 rounded-md"
              />
              <span className="ml-2 text-sm text-gray-700">Public</span>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-cyan-500 text-white px-4 py-2 rounded-md hover:bg-cyan-600 focus:outline-none focus:bg-cyan-600"
            >
              Create Club
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

export default NewClubModal;