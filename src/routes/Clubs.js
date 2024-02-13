import { useState, useEffect } from "react";
import ClubSearch from "../components/ClubSearch";
import ClubList from "../components/ClubList";
import NewClubModal from "../components/modals/NewClubModal";
import H2 from "../components/H2";

export default function Home() {
  const [clubs, setClubs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    fetchClubs();
  };

  const filteredClubs = clubs.filter((club) =>
    club.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <H2>Browse clubs</H2>
      <ClubSearch setSearchTerm={setSearchTerm} />
      <button
        onClick={toggleModal}
        className="bg-gray-200 text-black dark:hover:text-white p-2 mt-8 rounded block hover-effect"
      >
        + New Club
      </button>
      <ClubList clubs={filteredClubs} />
      {isModalOpen && <NewClubModal onClose={handleClose} />}
    </>
  );
}
