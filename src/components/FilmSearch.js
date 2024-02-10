import { useState } from "react";

const FilmSearch = ({
  setSearchTerm,
  // selectedGenre,
  // setSelectedGenre,
  // genreOptions,
}) => {
  const [search, setSearch] = useState("");

  const handleSearchChange = (e) => {
    const searchTerm = e.target.value;
    setSearch(searchTerm);
    setSearchTerm(searchTerm); // Pass the search term to the parent component
  };

  // const handleGenreChange = (e) => {
  //   const selectedGenre = e.target.value;
  //   setSelectedGenre(selectedGenre);
  //   // Here you can handle filtering by genre by passing the selected genre to the parent component
  // };

  return (
    <div className="flex items-center space-x-4">
      <input
        type="text"
        value={search}
        onChange={handleSearchChange}
        className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-gray-500"
        placeholder="Search films by name..."
      />
      {/* <select
        value={selectedGenre}
        onChange={handleGenreChange}
        className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-gray-500"
      >
        <option value="">Filter by genre</option>
        {genreOptions.map((genre, index) => (
          <option key={index} value={genre}>
            {genre}
          </option>
        ))}
      </select> */}
    </div>
  );
};

export default FilmSearch;
