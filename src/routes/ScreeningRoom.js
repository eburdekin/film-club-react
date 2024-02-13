import { useState, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { useUser } from "../components/UserContext";
import StarRating from "../components/StarRating";

export default function ScreeningRoom() {
  const [room, setRoom] = useState(null);
  const [newPostContent, setNewPostContent] = useState("");
  const [selectedRating, setSelectedRating] = useState(null);
  const { roomId } = useParams();
  const { user } = useUser();
  const postsEndRef = useRef(null);
  const [hoveredPostId, setHoveredPostId] = useState(null);
  const [editedContent, setEditedContent] = useState();
  const [editingPostId, setEditingPostId] = useState(null);

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
      postsEndRef.current.scrollTop = 0;
    }
  }, [room]);

  const formatTimestamp = (timestamp) => {
    const postDate = new Date(timestamp);

    const options = { timeZone: "America/Los_Angeles" };

    const currentDate = new Date();

    // Check if the post is from today
    if (
      postDate.getDate() === currentDate.getDate() &&
      postDate.getMonth() === currentDate.getMonth() &&
      postDate.getFullYear() === currentDate.getFullYear()
    ) {
      // Format the timestamp to hh:mm format
      return `at ${postDate.toLocaleTimeString("en-US", options)} today`;
    } else {
      // Format the timestamp to hh:mm format and the date to MM/DD/YYYY
      return `at ${postDate.toLocaleTimeString(
        "en-US",
        options
      )} ${postDate.toLocaleDateString("en-US", options)}`;
    }
  };

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

          // Fetch the updated list of posts after submitting the new post
          fetch(`/rooms/${roomId}`)
            .then((response) => response.json())
            .then((roomData) => {
              setRoom(roomData);
            })
            .catch((error) => {
              console.error("Error fetching room details:", error);
            });
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

  const handleEditChange = (postId, updatedContent) => {
    // Prepare data for updating the post
    const postData = {
      content: updatedContent,
    };

    // Make a PATCH request to the backend route for updating posts by ID
    fetch(`/posts/${postId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    })
      .then((response) => {
        if (response.ok) {
          // Fetch the updated list of posts after updating the post
          fetch(`/rooms/${roomId}`)
            .then((response) => response.json())
            .then((roomData) => {
              setRoom(roomData);
            })
            .catch((error) => {
              console.error("Error fetching room details:", error);
            });
        } else {
          console.error("Error updating post");
        }
      })
      .catch((error) => {
        console.error("Error updating post:", error);
      });
  };

  const handleDelete = (postId) => {
    // Logic for handling delete functionality goes here
    console.log("Deleting post with id:", postId);

    // Make a DELETE request to your backend API to delete the post
    fetch(`/posts/${postId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        // You might need to include authentication headers if required by your backend
      },
    })
      .then((response) => {
        if (response.ok) {
          // Update the state to remove the deleted post from the UI
          setRoom((prevRoom) => ({
            ...prevRoom,
            posts: prevRoom.posts.filter((post) => post.id !== postId),
          }));
        } else {
          console.error("Error deleting post");
        }
      })
      .catch((error) => {
        console.error("Error deleting post:", error);
      });
  };

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
            <div>
              <h4 className="text-sm">
                Average Rating from {room.club.name}:
                <br />
                <StarRating averageRating={averageRating} />
                {averageRating} stars
              </h4>
            </div>
            <div className="">
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
                className="bg-purple-500 dark:bg-purple-400 text-sm p-1 rounded-xl text-white dark:text-black"
                onClick={handleRatingSubmit}
              >
                Submit Rating
              </button>
            </div>
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
              <div className="mt-4">
                <h3>Add your rating:</h3>
                {/* Star rating system */}
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={
                      star <= selectedRating ? "star selected" : "star"
                    }
                    // onMouseEnter={() => setSelectedRating(star)}
                    // onMouseLeave={() => setSelectedRating(null)}
                    onClick={() => setSelectedRating(star)}
                  >
                    &#9733;
                  </span>
                ))}
                <br />
                <button
                  className="bg-purple-500 dark:bg-purple-400 text-sm p-1 rounded-xl text-white dark:text-black"
                  onClick={handleRatingSubmit}
                >
                  Submit Rating
                </button>
              </div>
            </div>
          </nav>
        </aside>
        <div className="bg-gray-100 dark:bg-gray-900 flex-[8] p-4 rounded min-h-[300px]">
          <div className="">
            <div className="p-4">
              <h3 className="font-bold dark:text-white">New Post:</h3>
              <input
                type="text"
                value={newPostContent}
                className="w-full rounded-xl h-20"
                onChange={(e) => setNewPostContent(e.target.value)}
              />
              <br />
              <button
                className="bg-purple-500 dark:bg-purple-400 text-sm p-2 m-2 rounded-xl text-white dark:text-black"
                onClick={handlePostSubmit}
              >
                Submit Post
              </button>
            </div>
            {/* Rate movie */}
          </div>
          <div>
            <h3 className="dark:text-white">Discussion</h3>
            <div
              ref={postsEndRef}
              // style={{ height: 600 }}
              className="overflow-y-auto"
            >
              <ul className="list-none p-0">
                {room.posts
                  .slice(0)
                  .reverse()
                  .map((post) => (
                    <li
                      key={post.id}
                      className="mb-2 bg-gray-200 dark:bg-gray-400 rounded-lg p-4 flex justify-between items-start relative"
                      onMouseEnter={() => setHoveredPostId(post.id)}
                      onMouseLeave={() => setHoveredPostId(null)}
                    >
                      <div className="flex flex-col">
                        <div>
                          <span className="font-bold text-sm">
                            {post.author.username}{" "}
                          </span>
                          <span className="text-xs font-bold text-gray-500 mt-1">
                            {formatTimestamp(post.timestamp)}
                          </span>
                        </div>
                        {editingPostId === post.id ? (
                          // Render input field for editing
                          <div>
                            <input
                              type="text"
                              value={editedContent}
                              className="text-sm"
                              onChange={(e) => setEditedContent(e.target.value)}
                            />
                            <button
                              className="p-1 m-1 rounded border text-sm"
                              onClick={() => {
                                handleEditChange(post.id, editedContent);
                                setEditingPostId(null);
                              }}
                            >
                              Submit Change
                            </button>
                            <button
                              className="p-1 m-1 rounded border text-sm"
                              onClick={() => setEditingPostId(null)}
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          // Render post content
                          <div className="mt-2 text-sm">{post.content}</div>
                        )}
                      </div>
                      {post.author_id === user.id &&
                        hoveredPostId === post.id && (
                          <div className="absolute right-0 top-0">
                            <button
                              className="p-1 m-1 rounded border text-xs"
                              onClick={() => {
                                setEditingPostId(post.id);
                                setEditedContent(post.content);
                              }}
                            >
                              Edit
                            </button>
                            <button
                              className="p-1 m-1 rounded border text-xs"
                              onClick={() => handleDelete(post.id)}
                            >
                              Delete
                            </button>
                          </div>
                        )}
                    </li>
                  ))}
              </ul>
            </div>
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
