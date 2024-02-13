import { useState } from "react";

const NewRoomModal = ({ onClose, clubId }) => {
  const [formData, setFormData] = useState({
    movie_id: "", // Add movie ID field
    club_id: clubId, // Add club ID field
  });

  const [errorMessage, setErrorMessage] = useState("");

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
      const response = await fetch(
        `/clubs/${formData.club_id}/screening_rooms/new`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log("New room added:", data);
        onClose(); // Close the modal after successful creation
      } else {
        throw new Error("Failed to add screening room");
      }
    } catch (error) {
      console.error("Error adding screening room:", error.message);
      setErrorMessage(
        error.message || "Failed to add screening room. Please try again."
      );
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="bg-gray-100 dark:bg-gray-300 w-96 p-8 rounded-lg shadow-lg z-10 text-center">
        <h2 className="text-2xl font-semibold mb-4">New Screening Room</h2>
        {errorMessage && <p className="text-red-500 mb-2">{errorMessage}</p>}
        <form onSubmit={handleSubmit}>
          {/* Add input field for movie ID */}
          <div className="mb-4">
            <label
              htmlFor="movie_id"
              className="block text-sm font-medium text-gray-700"
            >
              Movie ID
            </label>
            <input
              type="text"
              id="movie_id"
              name="movie_id"
              value={formData.movie_id}
              onChange={handleInputChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          {/* Add input field for club ID */}
          <div className="mb-4">
            <label
              htmlFor="club_id"
              className="block text-sm font-medium text-gray-700"
            >
              Club ID
            </label>
            <input
              type="text"
              id="club_id"
              name="club_id"
              value={formData.club_id}
              onChange={handleInputChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
            >
              Add Screening Room
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

export default NewRoomModal;
