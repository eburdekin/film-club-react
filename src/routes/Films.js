import FilmSearch from "../components/FilmSearch";
import FilmList from "../components/FilmList";
import LoadingScreen from "../components/LoadingScreen";

import { useState, useEffect } from "react";

export default function Films() {
  const [films, setFilms] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFilms = async () => {
      try {
        const response = await fetch("/movies");
        if (!response.ok) {
          throw new Error("Failed to fetch films");
        }
        const data = await response.json();
        setFilms(data);
      } catch (error) {
        console.error("Error fetching films:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFilms();
  }, []);

  const filteredFilms = films.filter((film) =>
    film.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white leading-[1.4] mb-5">
        Browse films
      </h2>
      {/* <p className="text-2xl text-gray-700 dark:text-gray-300">Films here.</p> */}
      <FilmSearch setSearchTerm={setSearchTerm} />
      <FilmList films={filteredFilms} />
    </>
  );
}
