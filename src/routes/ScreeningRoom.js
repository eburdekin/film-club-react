import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

export default function ScreeningRoom() {
  const [room, setRoom] = useState(null);
  const { roomId } = useParams();

  useEffect(() => {
    // Fetch room details using roomId
    fetch(`http://127.0.0.1:5555/rooms/${roomId}`)
      .then((response) => response.json())
      .then((roomData) => {
        setRoom(roomData);
      })
      .catch((error) => {
        console.error("Error fetching room details:", error);
      });
  }, [roomId]);

  if (!room) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white leading-[1.4] mb-5">
        {room.name}
      </h2>
      <div className="bg-gray-100 dark:bg-gray-300 flex-[8] p-4 rounded min-h-[300px]">
        {/* Display the name of the movie */}
        <div>
          <h3>Movie: {room.movie.title}</h3>
        </div>
        {/* Display posts */}
        <div>
          <h3>Posts:</h3>
          <ul>
            {room.posts.map((post) => (
              <li key={post.id}>{post.content}</li>
            ))}
          </ul>
        </div>
        {/* Display ratings */}
        <div>
          <h3>Ratings:</h3>
          <ul>
            {room.ratings.map((rating) => (
              <li key={rating.id}>{rating.rating}</li>
            ))}
          </ul>
        </div>
      </div>
      <Link
        to={`/clubs/${room.club.id}`}
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
        Back to {room.club.name}
      </Link>
    </div>
  );
}
