import React, { useState, useEffect } from "react";
import H3 from "../UI/H3";
import Admin from "../../routes/Admin";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilm } from "@fortawesome/free-solid-svg-icons";

export default function RoomDash() {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await fetch("/rooms");
        if (!response.ok) {
          throw new Error("Failed to fetch rooms");
        }
        const data = await response.json();
        setRooms(data);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };

    fetchRooms();
  }, []);

  const handleRoomDelete = async (roomId) => {
    try {
      const response = await fetch(`/rooms/${roomId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete room");
      }
      setRooms(rooms.filter((room) => room.id !== roomId));
      console.log("Room deleted successfully");
    } catch (error) {
      console.error("Error deleting room:", error);
    }
  };

  return (
    <Admin>
      <div>
        <H3>
          <FontAwesomeIcon icon={faFilm} /> Rooms
        </H3>
        <div className="overflow-x-auto text-xs md:text-md">
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className=" px-2 md:px-4 py-2">ID</th>
                <th className=" px-2 md:px-4 py-2">Club</th>
                <th className=" px-2 md:px-4 py-2">Movie</th>
                <th className=" px-2 md:px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rooms.map((room) => (
                <tr key={room.id}>
                  <td className="border px-2 md:px-4 py-2">{room.id}</td>
                  <td className="border px-2 md:px-4 py-2">{room.club.name}</td>
                  <td className="border px-2 md:px-4 py-2">
                    {room.movie.title}
                  </td>
                  <td className="border px-4 py-2">
                    <button
                      onClick={() => handleRoomDelete(room.id)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
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
