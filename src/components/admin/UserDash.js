import React, { useState, useEffect } from "react";
import H3 from "../UI/H3";
import Admin from "../../routes/Admin";

import UserRoleModal from "../modals/UserRoleModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

export default function UserDash() {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const toggleModal = (user) => {
    setIsModalOpen(!isModalOpen);
    setSelectedUser(user);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/users");
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleRoleAssigned = async () => {
    try {
      const response = await fetch("/users");
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const data = await response.json();
      setUsers(data); // Update the users state with the fetched data
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  //   const handleEdit = (userId) => {
  //     // Handle edit action
  //     console.log("Edit user with id:", userId);
  //   };

  const handleUserDelete = async (userId) => {
    try {
      const response = await fetch(`/users/${userId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete user");
      }
      setUsers(users.filter((user) => user.id !== userId));
      // Handle success
      console.log("User deleted successfully");
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <Admin>
      <div>
        <H3>
          <FontAwesomeIcon icon={faUser} /> Users
        </H3>
        <div className="overflow-x-auto text-xs md:text-md">
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="px-2 md:px-4 py-2">Username</th>
                <th className="px-2 md:px-4 py-2">Email</th>
                <th className="px-2 md:px-4 py-2">Role</th>
                <th className="px-2 md:px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="border px-2 md:px-4 py-2">{user.username}</td>
                  <td className="border px-2 md:px-4 py-2">{user.email}</td>
                  <td className="border px-2 md:px-4 py-2">{user.role.name}</td>
                  <td className="border px-2 md:px-4 py-2">
                    <button
                      onClick={(e) => toggleModal(user)}
                      className="mr-2 bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleUserDelete(user.id)}
                      className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {isModalOpen && (
          <UserRoleModal
            onClose={() => setIsModalOpen(false)}
            user={selectedUser}
            onRoleAssigned={handleRoleAssigned}
          />
        )}
      </div>
    </Admin>
  );
}
