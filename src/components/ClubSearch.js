import { useState } from "react";

const ClubSearch = () => {
  const [search, setSearch] = useState("");

  return (
    <input
      type="text"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-gray-500"
      placeholder="Search clubs..."
    />
  );
};

export default ClubSearch;
