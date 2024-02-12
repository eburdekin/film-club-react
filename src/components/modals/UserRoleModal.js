import React, { useState } from "react";

const UserRoleModal = ({ onClose, user, onRoleAssigned }) => {
  const [formData, setFormData] = useState({
    role: user.role.id, // assuming user.role contains the role object with an 'id' field
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
      const response = await fetch("http://127.0.0.1:5555/assign_role", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: user.id,
          role_id: formData.role, // assuming role_id corresponds to the role's ID
        }),
      });
      if (response.ok) {
        console.log("Role assigned successfully");
        onRoleAssigned(); // update parent component when role is changed
        onClose(); // Close the modal after successful update
      } else {
        throw new Error("Failed to assign role");
      }
    } catch (error) {
      console.error("Error assigning role:", error.message);
      // Handle error state accordingly
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="bg-gray-100 dark:bg-gray-300 w-96 p-8 rounded-lg shadow-lg z-10 text-center">
        <h2 className="text-2xl font-semibold mb-4">Assign User Role</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="role"
              className="block text-sm font-medium text-gray-700"
            >
              Role
            </label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            >
              <option value="3">Admin</option>
              <option value="2">Moderator</option>
              <option value="1">User</option>
            </select>
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
            >
              Assign Role
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

export default UserRoleModal;
