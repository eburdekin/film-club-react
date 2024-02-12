import { useState, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { useUser } from "../components/UserContext";
import StarRating from "../components/screening_room/StarRating";
import Posts from "../components/screening_room/Posts";
import Ratings from "../components/screening_room/Ratings";

export default function ScreeningRoom() {
  const [room, setRoom] = useState(null);
  const [newPostContent, setNewPostContent] = useState("");
  const [selectedRating, setSelectedRating] = useState(null);
  const { roomId } = useParams();
  const { user } = useUser();
  const postsEndRef = useRef(null);

  useEffect(() => {
    // Fetch room details using roomId
    fetch(`/rooms/${roomId}`)
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
    fetch("/posts", {
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
    fetch("/ratings", {
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
  const averageRating =
    totalRatings > 0 ? (sumOfRatings / totalRatings).toFixed(1) : 0;

  return (
    <>
      <h2 className="text-3xl text-gray-900 dark:text-white leading-[1.4] mb-5">
        <b>{room.club.name}</b>: Screening Room #{room.id}
      </h2>
      <div className="flex flex-col md:flex-row gap-8">
        <nav className="p-2 rounded-md md:hidden">
          <div className="col-span-1">
            <h4>Discussing:</h4>
            <h3 className="text-bold text-xl">{room.movie.title}</h3>
            <img
              className="w-20 h-auto"
              src={`https://image.tmdb.org/t/p/w185${room.movie.poster_image}`}
              alt={room.movie.title}
            />
          </div>
        </nav>
        {/* Sidebar navigation on larger screens */}
        <aside className="hidden md:flex md:flex-[2] dark:text-white">
          <nav>
            <div className="col-span-1">
              <h4>Discussing:</h4>
              <h3 className="text-bold text-xl">{room.movie.title}</h3>
              <img
                className="w-30 h-auto"
                src={`https://image.tmdb.org/t/p/w185${room.movie.poster_image}`}
                alt={room.movie.title}
              />
              <div>
                <h4 className="text-sm">
                  Average Rating from {room.club.name}:
                  <br />
                  <StarRating averageRating={averageRating} />
                  {averageRating} stars
                </h4>
              </div>
            </div>
          </nav>
        </aside>
        <div className="bg-gray-100 dark:bg-gray-300 flex-[8] p-4 rounded min-h-[300px]">
          <Posts postsEndRef={postsEndRef} room={room} />
          {/* Display ratings */}
          {/* <div>
            <h3>Ratings:</h3>
            <ul>
              {room.ratings.map((rating) => (
                <li key={rating.id}>{rating.rating}</li>
              ))}
            </ul>
          </div> */}
          {/* New post input form */}
          <div>
            <h3>New Post:</h3>
            <input
              type="text"
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
            />
            <br />
            <button
              className="bg-cyan-600 dark:bg-cyan-400 text-sm p-1 rounded-xl text-white dark:text-black"
              onClick={handlePostSubmit}
            >
              Submit Post
            </button>
          </div>
          {/* Rate movie */}
          <div>
            <h3>Rate Movie:</h3>
            {/* Star rating system */}
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={star <= selectedRating ? "star selected" : "star"}
                // onMouseEnter={() => setSelectedRating(star)}
                // onMouseLeave={() => setSelectedRating(null)}
                onClick={() => setSelectedRating(star)}
              >
                &#9733;
              </span>
            ))}
            <br />
            <button
              className="bg-cyan-600 dark:bg-cyan-400 text-sm p-1 rounded-xl text-white dark:text-black"
              onClick={handleRatingSubmit}
            >
              Submit Rating
            </button>
          </div>
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
    </>
  );
}
