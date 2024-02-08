// this will be a Club's main page, showing members, join/leave, screening rooms future, active, past.
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import SideNavLink from "../components/SideNavLink";

import { useUser } from "../components/UserContext";

export default function ClubDetails() {
  const { user } = useUser();
  const { clubId } = useParams();
  const [club, setClub] = useState([]);
  const [isMember, setIsMember] = useState(false);

  // Fetch club details using clubId
  useEffect(() => {
    fetch(`http://127.0.0.1:5555/clubs/${clubId}`)
      .then((response) => response.json())
      .then((club) => {
        // Process club details
        setClub(club);
        if (user && club.members.some((member) => member.id === user.id)) {
          setIsMember(true);
        } else {
          setIsMember(false);
        }
      })
      .catch((error) => {
        console.error("Error fetching club details:", error);
      });
  }, [clubId, user]);

  const handleJoinLeave = () => {
    const url = isMember
      ? `/clubs/${clubId}/remove_user`
      : `/clubs/${clubId}/add_user`;
    const method = isMember ? "DELETE" : "POST";

    fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_id: user.id }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // Toggle the membership status
        setIsMember(!isMember);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white leading-[1.4] mb-5">
        {club.name}
      </h2>
      <div className="flex flex-col md:flex-row gap-8">
        {/* Navigation as tabs on small screens */}
        {user ? (
          <>
            <nav className="bg-gray-100 p-2 rounded-md md:hidden">
              <ul className="flex justify-evenly">
                <button
                  className="dark:text-gray-100"
                  onClick={handleJoinLeave}
                >
                  {isMember ? "Leave" : "Join"}
                </button>
              </ul>
            </nav>
            <aside className="hidden md:flex md:flex-[2]">
              <nav>
                <ul className="grid gap-3">
                  <button
                    className="dark:text-gray-100"
                    onClick={handleJoinLeave}
                  >
                    {isMember ? "Leave" : "Join"}
                  </button>
                </ul>
              </nav>
            </aside>
          </>
        ) : (
          ""
        )}
        {/* Main content */}
        <div className="bg-gray-100 dark:bg-gray-300 flex-[8] p-4 rounded min-h-[300px]">
          <h3 className="text-bold text-lg">{club.description}</h3>
          <h3 className="text-bold text-lg mt-2">Screening Rooms</h3>
          {user ? (
            <ul>
              {club.screening_rooms &&
                club.screening_rooms.map((room) => (
                  <a key={room.id} href={`/rooms/${room.id}`}>
                    <li className="bg-gray-400 p-2 rounded-md hover-effect">
                      {room.name}
                    </li>
                  </a>
                ))}
            </ul>
          ) : (
            <>Log in or create an account to view.</>
          )}
          <h3 className="text-bold text-lg mt-2">Members</h3>
          {user ? (
            <ul>
              {club.members &&
                club.members.map((member) => (
                  <li key={member.id}>{member.username}</li>
                ))}
            </ul>
          ) : (
            <>Log in or create an account to view.</>
          )}
        </div>
      </div>
      <Link
        to="/clubs"
        className="flex items-center mt-4 text-gray-600 dark:text-gray-400 transition-transform hover:translate-x-1"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 mr-2"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10.293 3.293a1 1 0 0 1 1.414 1.414L6.414 10l5.293 5.293a1 1 0 0 1-1.414 1.414l-6-6a1 1 0 0 1 0-1.414l6-6a1 1 0 0 1 0 1.414z"
            clipRule="evenodd"
          />
        </svg>
        Back to Clubs
      </Link>
    </div>
  );
}
