import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFireFlameCurved } from "@fortawesome/free-solid-svg-icons";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";

const FilmSearch = ({
  setSearchTerm,
  setSelectedGenre,
  sortByPopularity,
  sortByReleaseDate,
}) => {
  const [search, setSearch] = useState("");
  const [selectedGenre, setSelectedGenreLocal] = useState("");

  const handleSearchChange = (e) => {
    const searchTerm = e.target.value;
    setSearch(searchTerm);
    setSearchTerm(searchTerm); // Pass the search term to the parent component
  };

  const handleGenreChange = (e) => {
    const selectedGenre = e.target.value;
    setSelectedGenreLocal(selectedGenre);
    setSelectedGenre(selectedGenre); // Pass the selected genre to the parent component
  };

  const genres = [
    { id: 28, name: "Action" },
    { id: 12, name: "Adventure" },
    { id: 16, name: "Animation" },
    { id: 35, name: "Comedy" },
    { id: 80, name: "Crime" },
    { id: 99, name: "Documentary" },
    { id: 18, name: "Drama" },
    { id: 10751, name: "Family" },
    { id: 14, name: "Fantasy" },
    { id: 36, name: "History" },
    { id: 27, name: "Horror" },
    { id: 10402, name: "Music" },
    { id: 9648, name: "Mystery" },
    { id: 10749, name: "Romance" },
    { id: 878, name: "Science Fiction" },
    { id: 10770, name: "TV Movie" },
    { id: 53, name: "Thriller" },
    { id: 10752, name: "War" },
    { id: 37, name: "Western" },
  ];

  return (
    <>
      <div className="flex items-center space-x-4">
        <input
          type="text"
          value={search}
          onChange={handleSearchChange}
          className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-gray-500"
          placeholder="Search films by name..."
        />
        <select
          value={selectedGenre}
          onChange={handleGenreChange}
          className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-gray-500"
        >
          <option value="">Filter by genre</option>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.name}>
              {genre.name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex mx-auto items-center space-x-4 mt-4">
        <button
          onClick={sortByPopularity}
          className="text-md border border-gray-300 dark:border-gray-600 dark:text-white rounded-lg px-2 py-2"
        >
          <FontAwesomeIcon icon={faFireFlameCurved} /> Sort by Popularity
        </button>
        <button
          onClick={sortByReleaseDate}
          className="text-md border border-gray-300 dark:border-gray-600 dark:text-white rounded-lg px-2 py-2"
        >
          <FontAwesomeIcon icon={faCalendar} /> Sort by Release Date
        </button>
      </div>
    </>
  );
};

export default FilmSearch;
