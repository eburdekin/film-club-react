import ClubSearch from "../components/ClubSearch";
import ClubList from "../components/ClubList";
import { useState } from "react";
import NewClubModal from "../components/NewClubModal";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white leading-[1.4] mb-5">
        Browse clubs
      </h2>
      <ClubSearch />
      <button
        onClick={toggleModal}
        className="bg-gray-200 text-black dark:hover:text-white p-2 mt-8 rounded block hover-effect"
      >
        + New Club
      </button>
      <ClubList />
      {isModalOpen && <NewClubModal onClose={() => setIsModalOpen(false)} />}
    </>
  );
}
