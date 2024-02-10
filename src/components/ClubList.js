import { useState, useEffect } from "react";
import ClubCard from "./ClubCard";

import { useUser } from "./UserContext";

export default function ClubList({ clubs }) {
  const { user } = useUser();
  const [userClubs, setUserClubs] = useState([]);

  useEffect(() => {
    if (user && user.id && clubs && clubs.length > 0) {
      const userClubs = clubs.filter((club) =>
        club.members.some((member) => member.id === user.id)
      );
      setUserClubs(userClubs);
    }
  }, [user, clubs]);

  return (
    <div className="mt-8">
      {user && userClubs.length > 0 && (
        <div className="mb-8">
          <h3 className="text-2xl mb-6 dark:text-gray-300">My clubs</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {userClubs.map((club) => (
              <ClubCard key={club.id} club={club} />
            ))}
          </div>
        </div>
      )}
      <h3 className="text-2xl mb-6 dark:text-gray-300">All clubs</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {clubs.map((club) => (
          <ClubCard key={club.id} club={club} />
        ))}
      </div>
    </div>
  );
}
