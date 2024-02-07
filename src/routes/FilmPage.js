// this will be a Club's main page, showing members, join/leave, screening rooms future, active, past.
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import SideNavLink from "../components/SideNavLink";

import { useUser } from "../components/UserContext";

export default function ClubDetails() {
  const { user } = useUser();
  const [film, setFilm] = useState([]);
  const { filmId } = useParams(); // Get clubId from URL parameters

  // Fetch club details using clubId
  useEffect(() => {
    fetch(`/movies/${filmId}`)
      .then((response) => response.json())
      .then((film) => {
        // Process club details
        setFilm(film);
      })
      .catch((error) => {
        console.error("Error fetching club details:", error);
      });
  }, [filmId]);

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white leading-[1.4] mb-5">
        {film.title}
      </h2>
      <div className="flex flex-col md:flex-row gap-8">
        {/* Navigation as tabs on small screens */}

        {/* <nav className="bg-gray-100 p-2 rounded-md md:hidden"> */}
        {/* <ul className="flex justify-evenly"> */}
        {/* <SideNavLink>Join/Leave</SideNavLink> */}
        {/* Uncomment the following when needed */}
        {/* <li>
            <ProfileNavLink href="/profile/account">Account</ProfileNavLink>
          </li> */}
        {/* <SideNavLink>Club Link</SideNavLink> */}
        {/* </ul> */}
        {/* </nav> */}
        {/* Sidebar navigation on larger screens */}
        {/* <aside className="hidden md:flex md:flex-[2]">
          <nav>
            <ul className="grid gap-3">
              <SideNavLink>Join/Leave</SideNavLink>
            </ul>
          </nav>
        </aside> */}
        {/* Main content */}
        <div className="bg-gray-100 dark:bg-gray-300 flex-[8] p-4 rounded min-h-[300px]">
          <h3 className="text-bold text-lg">{film.summary}</h3>
          <img
            className="w-30 h-auto"
            src={`https://image.tmdb.org/t/p/w185${film.poster_image}`}
            alt={film.title}
          />
          Average rating, latest posts, all screening rooms
          <h3 className="text-bold text-lg mt-2">Screening Rooms</h3>
          {user ? (
            <ul>
              {film.screening_rooms &&
                film.screening_rooms.map((room) => (
                  <a key={room.id} href={`/rooms/${room.id}`}>
                    <li className="bg-gray-400 p-2 rounded-md hover-effect">
                      <b>{room.name}</b>, hosted by {room.club.name}
                    </li>
                  </a>
                ))}
            </ul>
          ) : (
            <>Log in or create an account to view.</>
          )}
        </div>
      </div>
      <Link
        to="/films"
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
        Back to Films
      </Link>
    </div>
  );
}
