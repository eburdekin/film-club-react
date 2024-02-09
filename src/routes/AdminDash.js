import React, { useState, useEffect } from "react";

import UserRoleModal from "../components/UserRoleModal";

export default function AdminDash() {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [clubs, setClubs] = useState([]);

  const toggleModal = (user) => {
    setIsModalOpen(!isModalOpen);
    console.log(user);
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

  useEffect(() => {
    const fetchClubs = async () => {
      try {
        const response = await fetch("/clubs");
        if (!response.ok) {
          throw new Error("Failed to fetch clubs");
        }
        const data = await response.json();
        setClubs(data);
      } catch (error) {
        console.error("Error fetching clubs:", error);
      }
    };

    fetchClubs();
  }, []);

  const handleClubDelete = async (clubId) => {
    try {
      const response = await fetch(`/clubs/${clubId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete club");
      }
      setClubs(clubs.filter((club) => club.id !== clubId));
      console.log("Club deleted successfully");
    } catch (error) {
      console.error("Error deleting club:", error);
    }
  };

  return (
    <div className="mt-8">
      <h3 className="text-2xl mb-6 font-bold dark:text-gray-300">Users</h3>
      <table className="table-auto  dark:text-gray-300">
        <thead>
          <tr>
            <th className="px-4 py-2 w-1/5">Username</th>
            <th className="px-4 py-2 w-1/5">Email</th>
            <th className="px-4 py-2 w-1/5">Clubs</th>
            <th className="px-4 py-2 w-1/6">Role</th>
            <th className="px-4 py-2 w-1/4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="border px-4 py-2">{user.username}</td>
              <td className="border px-4 py-2">{user.email}</td>
              <td className="border px-4 py-2">
                {/* Render user's clubs */}
                {user.clubs.map((club) => club.name).join(", ")}
              </td>
              <td className="border px-4 py-2">{user.role.name}</td>
              <td className="border px-4 py-2">
                <button
                  onClick={(e) => toggleModal(user)}
                  className="mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleUserDelete(user.id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3 className="text-2xl mb-6 font-bold mt-8 dark:text-gray-300">Clubs</h3>
      <table className="table-auto  dark:text-gray-300">
        <thead>
          <tr>
            <th className="px-4 py-2 w-1/5">Name</th>
            <th className="px-4 py-2 w-1/5">Description</th>
            <th className="px-4 py-2 w-1/5">Members</th>
            <th className="px-4 py-2 w-1/4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {clubs.map((club) => (
            <tr key={club.id}>
              <td className="border px-4 py-2">{club.name}</td>
              <td className="border px-4 py-2">{club.description}</td>
              <td className="border px-4 py-2">
                {club.members.map((member) => member.username).join(", ")}
              </td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => handleClubDelete(club.id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isModalOpen && (
        <UserRoleModal
          onClose={() => setIsModalOpen(false)}
          user={selectedUser}
          onRoleAssigned={handleRoleAssigned}
        />
      )}
    </div>
  );
}
