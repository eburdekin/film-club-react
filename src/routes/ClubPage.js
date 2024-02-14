// this will be a Club's main page, showing members, join/leave, screening rooms future, active, past.
import { useState, useEffect, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import NewRoomModal from "../components/modals/NewRoomModal";
// import SideNavLink from "../components/UI/SideNavLink";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faDoorOpen } from "@fortawesome/free-solid-svg-icons";
import { faDoorClosed } from "@fortawesome/free-solid-svg-icons";
import { useUser } from "../components/UserContext";
import H2 from "../components/UI/H2";
import H4 from "../components/UI/H4";
import ClubPageRoomCard from "../components/ClubPageRoomCard";

export default function ClubDetails() {
  const { user } = useUser();
  const { clubId } = useParams();
  const [club, setClub] = useState({});
  const [isMember, setIsMember] = useState(false);
  const [showModal, setShowModal] = useState(false); // State to control the visibility of the modal

  // Fetch club details using clubId
  const fetchClubDetails = useCallback(() => {
    fetch(`/clubs/${clubId}`)
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

  // Fetch club details using clubId
  useEffect(() => {
    fetchClubDetails();
  }, []);

  const handleJoinLeave = () => {
    const url = isMember
      ? `/clubs/${clubId}/remove_user`
      : `/clubs/${clubId}/add_user`;
    const method = isMember ? "POST" : "POST";

    fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_id: user.id }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update membership status");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        // Toggle the membership status
        setIsMember(!isMember);
        // Only refetch club details if leaving club was successful
        // if (isMember) {
        fetchClubDetails();
        // }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const handleClose = () => {
    setShowModal(false);
    fetchClubDetails();
  };

  return (
    <div>
      <H2>{club.name}</H2>
      <div className="flex flex-col md:flex-row gap-8">
        {/* Navigation as tabs on small screens */}
        {user ? (
          <>
            <nav className="bg-white p-2 rounded-md md:hidden">
              <ul className="flex justify-evenly">
                <button
                  // className="bg-purple-500 dark:bg-purple-400 text-white dark:text-black dark:hover:text-white my-4 p-2 rounded-xl block hover-effect"
                  className="text-gray-100"
                  onClick={handleJoinLeave}
                >
                  {isMember ? (
                    <>
                      <FontAwesomeIcon icon={faDoorOpen} /> Leave club
                    </>
                  ) : (
                    <>
                      <FontAwesomeIcon icon={faDoorClosed} /> Join club
                    </>
                  )}
                </button>
                {isMember ? (
                  <button
                    className="bg-purple-500 dark:bg-purple-400 text-white dark:text-black dark:hover:text-white my-4 p-2 rounded-xl block hover-effect"
                    onClick={() => setShowModal(true)}
                  >
                    + Screening Room
                  </button>
                ) : (
                  ""
                )}
              </ul>
            </nav>
            <aside className="hidden md:flex md:flex-[2]">
              <nav>
                <ul className="grid gap-3 rounded">
                  <button
                    className="text-gray-100"
                    // className="bg-purple-500 dark:bg-purple-400 text-white dark:text-black dark:hover:text-white my-1 p-2 rounded-xl block hover-effect"
                    onClick={handleJoinLeave}
                  >
                    {isMember ? (
                      <>
                        <FontAwesomeIcon icon={faDoorOpen} /> Leave club
                      </>
                    ) : (
                      <>
                        <FontAwesomeIcon icon={faDoorClosed} /> Join club
                      </>
                    )}
                  </button>
                  {isMember ? (
                    <button
                      className="bg-purple-500 dark:bg-purple-400 text-white dark:text-black dark:hover:text-white my-1 p-2 rounded-xl block hover-effect"
                      onClick={() => setShowModal(true)}
                    >
                      + Screening Room
                    </button>
                  ) : (
                    ""
                  )}
                </ul>
              </nav>
            </aside>
          </>
        ) : (
          ""
        )}
        {/* Main content */}
        <div className="bg-gray-100 dark:bg-gray-900 flex-[8] p-4 rounded min-h-[300px]">
          <H4>{club.description}</H4>
          <H4>Screening Rooms</H4>
          {user ? (
            <div className="flex flex-wrap gap-2">
              {club.screening_rooms &&
                club.screening_rooms.map((room) => (
                  <div key={room.id} className="w-full md:w-1/3">
                    <ClubPageRoomCard room={room} />
                  </div>
                ))}
            </div>
          ) : (
            <>Log in or create an account to view.</>
          )}
          <H4>Members</H4>
          {user ? (
            <ul>
              {club.members &&
                club.members.map((member) => (
                  <li key={member.id} className="dark:text-gray-100">
                    <FontAwesomeIcon icon={faUser} /> {member.username}
                  </li>
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
      {showModal && (
        <NewRoomModal
          clubId={clubId} // Pass the clubId to the modal component
          onClose={handleClose}
        />
      )}
    </div>
  );
}
