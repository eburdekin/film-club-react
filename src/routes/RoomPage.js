import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function RoomPage() {
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
  );
}
