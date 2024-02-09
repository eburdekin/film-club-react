import { useState, useEffect } from "react";
import ClubSearch from "../components/ClubSearch";
import ClubList from "../components/ClubList";
import NewClubModal from "../components/NewClubModal";

export default function Home() {
  const [clubs, setClubs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const filteredClubs = clubs.filter((club) =>
    club.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white leading-[1.4] mb-5">
        Browse clubs
      </h2>
      <ClubSearch setSearchTerm={setSearchTerm} />
      <button
        onClick={toggleModal}
        className="bg-gray-200 text-black dark:hover:text-white p-2 mt-8 rounded block hover-effect"
      >
        + New Club
      </button>
      <ClubList clubs={filteredClubs} />
      {isModalOpen && <NewClubModal onClose={() => setIsModalOpen(false)} />}
    </>
  );
}
