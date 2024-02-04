import Profile from "../routes/Profile";
import { useState } from "react";
import NewClubModal from "../components/NewClubModal";

export default function MyClubs() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  return (
    <Profile>
      <div>These are clubs I'm an admin of.</div>
      <button
        onClick={toggleModal}
        className="bg-gray-100 text-black dark:hover:text-white p-2 rounded block"
      >
        + New Club
      </button>
      <div>These are clubs I'm a member of.</div>
      {isModalOpen && <NewClubModal onClose={() => setIsModalOpen(false)} />}
    </Profile>
  );
}
