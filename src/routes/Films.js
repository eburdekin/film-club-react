import FilmSearch from "../components/FilmSearch";
import FilmList from "../components/FilmList";
// import LoadingScreen from "../components/LoadingScreen";
import H2 from "../components/UI/H2";

import { useState, useEffect } from "react";

export default function Films() {
  const [films, setFilms] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  // const [loading, setLoading] = useState(true);

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
      }
      // finally {
      //   setLoading(false);
      // }
    };

    fetchFilms();
  }, []);

  // const filteredFilms = films.filter((film) =>
  //   film.title.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  const sortByPopularity = () => {
    const sortedFilms = [...films]; // Create a copy of the films array
    sortedFilms.sort((a, b) => b.popularity - a.popularity);
    setFilms(sortedFilms); // Update state with the sorted copy
  };

  const sortByReleaseDate = () => {
    const sortedFilms = [...films]; // Create a copy of the films array
    sortedFilms.sort(
      (a, b) => new Date(b.release_date) - new Date(a.release_date)
    );
    setFilms(sortedFilms); // Update state with the sorted copy
  };

  const filteredFilms = films.filter((film) => {
    const byTitle =
      film && film.title.toLowerCase().includes(searchTerm.toLowerCase());
    const byGenre =
      selectedGenre === "" ||
      film.genres.some((genre) => genre.name === selectedGenre);
    return byTitle && byGenre;
  });

  // if (loading) {
  //   return <LoadingScreen />;
  // }

  return (
    <>
      <H2>Browse films</H2>
      {/* <p className="text-2xl text-gray-700 dark:text-gray-300">Films here.</p> */}
      <FilmSearch
        setSearchTerm={setSearchTerm}
        setSelectedGenre={setSelectedGenre}
        sortByPopularity={sortByPopularity}
        sortByReleaseDate={sortByReleaseDate}
      />
      <FilmList films={filteredFilms} />
    </>
  );
}
