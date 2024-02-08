import Profile from "../routes/Profile";
import { useState } from "react";
import NewClubModal from "../components/NewClubModal";

import { useUser } from "./UserContext";

export default function MyClubs() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useUser();

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
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
      {user && user.clubs && user.clubs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {user.clubs.map((club) => (
            <a href={`/clubs/${club.id}`} key={club.id}>
              <div className="p-4 bg-gray-200  rounded-md hover-effect">
                <b>{club.name}</b>
                <br />
                <span className="text-xs">{club.description}</span>
              </div>
            </a>
          ))}
        </div>
      ) : (
        "Join some clubs!"
      )}
      {isModalOpen && <NewClubModal onClose={() => setIsModalOpen(false)} />}
    </Profile>
  );
}
