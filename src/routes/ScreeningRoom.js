import { useState, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { useUser } from "../components/UserContext";

export default function ScreeningRoom() {
  const [room, setRoom] = useState(null);
  const [newPostContent, setNewPostContent] = useState("");
  const [selectedRating, setSelectedRating] = useState(0);
  const { roomId } = useParams();
  const { user } = useUser();
  const postsEndRef = useRef(null);

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
  }, [roomId, newPostContent, selectedRating]);

  useEffect(() => {
    // Scroll to the bottom of the posts container whenever new posts are added
    if (room && postsEndRef.current) {
      postsEndRef.current.scrollTop = postsEndRef.current.scrollHeight;
    }
  }, [room]);

  const handlePostSubmit = () => {
    // Prepare data for the new post
    const postData = {
      content: newPostContent,
      author_id: user.id,
      screening_room_id: roomId,
    };

    // Make a POST request to the backend route for creating new posts
    fetch("http://127.0.0.1:5555/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    })
      .then((response) => {
        if (response.ok) {
          // Clear the input field after submitting the post
          setNewPostContent("");
          console.log("New Post Submitted Successfully");
        } else {
          console.error("Error submitting new post");
        }
      })
      .catch((error) => {
        console.error("Error submitting new post:", error);
      });
  };

  const handleRatingSubmit = () => {
    if (selectedRating === 0) {
      console.log("Please select a rating");
      return;
    }

    // Prepare data for the new rating
    const ratingData = {
      rating: selectedRating,
      author_id: user.id,
      screening_room_id: roomId,
    };

    // Make a POST request to the backend route for creating new ratings
    fetch("http://127.0.0.1:5555/ratings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ratingData),
    })
      .then((response) => {
        if (response.ok) {
          // Clear the selected rating after submitting the rating
          setSelectedRating(0);
          console.log("New Rating Submitted Successfully");
        } else {
          console.error("Error submitting new rating");
        }
      })
      .catch((error) => {
        console.error("Error submitting new rating:", error);
      });
  };

  if (!room) {
    return <div>Loading...</div>;
  }

  // Calculate average rating
  const totalRatings = room.ratings.length;
  const sumOfRatings = room.ratings.reduce(
    (acc, rating) => acc + rating.rating,
    0
  );
  const averageRating = totalRatings > 0 ? sumOfRatings / totalRatings : 0;

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white leading-[1.4] mb-5">
        {room.name}
      </h2>
      <div className="bg-gray-100 dark:bg-gray-300 p-4 rounded min-h-[300px]">
        {/* Display the average rating */}
        <div>
          <h3>Average Rating: {averageRating}</h3>
        </div>
        {/* Display posts */}
        <div>
          <h3>Posts:</h3>
          <div ref={postsEndRef} className="h-80 overflow-y-auto">
            <ul className="list-none p-0">
              {room.posts.map((post) => (
                <li
                  key={post.id}
                  className="mb-2 bg-gray-200 dark:bg-gray-400 rounded-lg p-4"
                >
                  <div className="font-bold text-sm">
                    {post.author.username}
                  </div>
                  <div className="text-gray-700 dark:text-gray-300 mt-2">
                    {post.content}
                  </div>
                  <div className="text-xs font-bold text-gray-500 mt-1">
                    {post.timestamp}
                  </div>
                </li>
              ))}
            </ul>
          </div>
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
        {/* New post input form */}
        <div>
          <h3>New Post:</h3>
          <input
            type="text"
            value={newPostContent}
            onChange={(e) => setNewPostContent(e.target.value)}
          />
          <button onClick={handlePostSubmit}>Submit</button>
        </div>
        {/* Rate movie */}
        <div>
          <h3>Rate Movie:</h3>
          {/* Star rating system */}
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={star <= selectedRating ? "star selected" : "star"}
              onMouseEnter={() => setSelectedRating(star)}
              onMouseLeave={() => setSelectedRating(0)}
              onClick={handleRatingSubmit}
            >
              &#9733;
            </span>
          ))}
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
