import { useState, useEffect } from "react";

export default function ClubList() {
  const [clubs, setClubs] = useState([]);

  useEffect(() => {
    const fetchClubs = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5555/clubs");
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

  return (
    <div className="mt-8">
      <span className="text-red-600">If logged in:</span>
      <h3 className="text-xl font-bold mb-6 dark:text-gray-300">My clubs</h3>
      <h3 className="text-xl font-bold mb-6 dark:text-gray-300">All clubs</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {clubs.map((club) => (
          <a href={`/clubs/${club.id}`}>
            <div
              key={club.id}
              className="p-4 bg-gray-100 dark:bg-gray-300  rounded-md hover-effect"
            >
              {club.name}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
