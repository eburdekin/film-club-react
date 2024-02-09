import Profile from "../routes/Profile";
import { useState, useEffect } from "react";
import NewClubModal from "./NewClubModal";

import { useUser } from "./UserContext";

export default function MyClubs() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useUser();
  const [userClubs, setUserClubs] = useState([]);
  const [clubs, setClubs] = useState([]);

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

  useEffect(() => {
    fetchClubs();
  }, []);

  useEffect(() => {
    if (user && user.id && clubs && clubs.length > 0) {
      const userClubs = clubs.filter((club) =>
        club.members.some((member) => member.id === user.id)
      );
      setUserClubs(userClubs);
    }
  }, [user, clubs]);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    fetchClubs();
  };

  return (
    <Profile>
      <button
        onClick={toggleModal}
        className="bg-gray-200 text-black dark:hover:text-white p-2 rounded block hover-effect"
      >
        + New Club
      </button>
      <h3 className="text-2xl mb-6">My clubs</h3>
      {user && userClubs.length > 0 && (
        <div className="mb-8">
          <h3 className="text-2xl mb-6 dark:text-gray-300">My clubs</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {userClubs.map((club) => (
              <a href={`/clubs/${club.id}`} key={club.id}>
                <div className="md:h-36 flex flex-col justify-center p-4 bg-gray-300 dark:bg-gray-400 rounded-md hover-effect">
                  <b>{club.name}</b>
                  <br />
                  <span className="text-xs">{club.description}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}
      {isModalOpen && <NewClubModal onClose={handleClose} />}
    </Profile>
  );
}
