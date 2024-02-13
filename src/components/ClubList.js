import { useState, useEffect } from "react";
import ClubCard from "./ClubCard";
import H3 from "./UI/H3";

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
          <H3>My clubs</H3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {userClubs.map((club) => (
              <ClubCard key={club.id} club={club} />
            ))}
          </div>
        </div>
      )}
      <H3>All clubs</H3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {clubs.map((club) => (
          <ClubCard key={club.id} club={club} />
        ))}
      </div>
    </div>
  );
}
