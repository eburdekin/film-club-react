// this will be a Club's main page, showing members, join/leave, screening rooms future, active, past.
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import SideNavLink from "../components/SideNavLink";

export default function ClubDetails() {
  const [club, setClub] = useState([]);
  const { clubId } = useParams(); // Get clubId from URL parameters

  // Fetch club details using clubId
  useEffect(() => {
    fetch(`http://127.0.0.1:5555/clubs/${clubId}`)
      .then((response) => response.json())
      .then((club) => {
        // Process club details
        setClub(club);
      })
      .catch((error) => {
        console.error("Error fetching club details:", error);
      });
  }, [clubId]);

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white leading-[1.4] mb-5">
        {club.name}
      </h2>
      <div className="flex flex-col md:flex-row gap-8">
        {/* Navigation as tabs on small screens */}

        <nav className="bg-gray-100 p-2 rounded-md md:hidden">
          <ul className="flex justify-evenly">
            <SideNavLink>Join/Leave</SideNavLink>
            {/* Uncomment the following when needed */}
            {/* <li>
            <ProfileNavLink href="/profile/account">Account</ProfileNavLink>
          </li> */}
            {/* <SideNavLink>Club Link</SideNavLink> */}
          </ul>
        </nav>
        {/* Sidebar navigation on larger screens */}
        <aside className="hidden md:flex md:flex-[2]">
          <nav>
            <ul className="grid gap-3">
              <SideNavLink>Join/Leave</SideNavLink>
              {/* Uncomment the following when needed */}
              {/* <li>
              <ProfileNavLink href="/profile/account">Account</ProfileNavLink>
            </li> */}
            </ul>
          </nav>
        </aside>
        {/* Main content */}
        <div className="bg-gray-100 dark:bg-gray-300 flex-[8] p-4 rounded min-h-[300px]">
          {club.description}
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
