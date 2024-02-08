import { useState } from "react";

const FilmSearch = ({ setSearchTerm }) => {
  const [search, setSearch] = useState("");

  const handleSearchChange = (e) => {
    const searchTerm = e.target.value;
    setSearch(searchTerm);
    setSearchTerm(searchTerm); // Pass the search term to the parent component
  };

  return (
    <input
      type="text"
      value={search}
      onChange={handleSearchChange}
      className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-gray-500"
      placeholder="Search films by name..."
    />
  );
};

export default FilmSearch;
