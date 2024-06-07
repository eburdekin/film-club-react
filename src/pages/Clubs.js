import { useState, useEffect } from "react";
import ClubSearch from "../components/ClubSearch";
import ClubList from "../components/ClubList";
import NewClubModal from "../components/modals/NewClubModal";
import H2 from "../components/UI/H2";

export default function Home() {
  const [clubs, setClubs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

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
    } finally {
      setLoading(false);
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
        className="bg-purple-500 dark:bg-purple-400 text-white dark:text-black dark:hover:text-white my-4 p-2 rounded-xl block hover-effect"
      >
        + New Club
      </button>
      {loading ? (
        <div
          //   className="dark:bg-gray-900 fixed top-0 left-0 w-full flex items-center justify-center h-full"
          style={{ zIndex: 9999 }}
        >
          <div
            className="relative flex items-center justify-center min-h-screen"
            style={{ marginTop: "-10vh" }}
          >
            <img
              src="/reel.png"
              alt="loading film screen"
              className="animate-spin h-20 w-20 dark:invert"
            />
          </div>
        </div>
      ) : (
        <ClubList clubs={filteredClubs} />
      )}
      {isModalOpen && <NewClubModal onClose={handleClose} />}
    </>
  );
}
