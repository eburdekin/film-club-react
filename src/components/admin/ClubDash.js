import React, { useState, useEffect } from "react";
import H3 from "../UI/H3";
import Admin from "../../pages/Admin";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers } from "@fortawesome/free-solid-svg-icons";

export default function ClubDash() {
  const [clubs, setClubs] = useState([]);

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
    <Admin>
      <div>
        <H3>
          <FontAwesomeIcon icon={faUsers} /> Clubs
        </H3>
        <div className="overflow-x-auto text-xs md:text-md">
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className=" px-2 md:px-4 py-2">Name</th>
                <th className=" px-2 md:px-4 py-2">Description</th>
                <th className=" px-2 md:px-4 py-2">Members</th>
                <th className=" px-2 md:px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {clubs.map((club) => (
                <tr key={club.id}>
                  <td className="border px-2 md:px-4 py-2">{club.name}</td>
                  <td className="border px-2 md:px-4 py-2">
                    {club.description}
                  </td>
                  <td className="border px-2 md:px-4 py-2">
                    {club.members.map((member) => member.username).join(", ")}
                  </td>
                  <td className="border px-4 py-2">
                    <button
                      onClick={() => handleClubDelete(club.id)}
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
      </div>
    </Admin>
  );
}
