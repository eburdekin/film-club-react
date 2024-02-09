import { useState, useEffect } from "react";

import { useUser } from "./UserContext";

export default function ClubList({ clubs }) {
  const { user } = useUser();

  return (
    <div className="mt-8">
      <div className="mb-8">
        {user && user.clubs && user.clubs.length > 0 ? (
          <>
            <h3 className="text-2xl mb-6 dark:text-gray-300">My clubs</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {user.clubs.map((club) => (
                <a href={`/clubs/${club.id}`} key={club.id}>
                  <div className="md:h-36 flex flex-col justify-center p-4 bg-gray-100 dark:bg-gray-300 rounded-md hover-effect">
                    <b>{club.name}</b>
                    <br />
                    <span className="text-xs">{club.description}</span>
                  </div>
                </a>
              ))}
            </div>
          </>
        ) : (
          ""
        )}
      </div>
      <h3 className="text-2xl mb-6 dark:text-gray-300">All clubs</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {clubs.map((club) => (
          <a href={`/clubs/${club.id}`} key={club.id}>
            <div className="md:h-36 flex flex-col justify-center p-4 bg-gray-100 dark:bg-gray-300 rounded-md hover-effect">
              <b>{club.name}</b>
              <br />
              <span className="text-xs">{club.description}</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
