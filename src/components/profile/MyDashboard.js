import Profile from "../../routes/Profile";
import { useState, useEffect } from "react";
import NewClubModal from "../modals/NewClubModal";
import { Link } from "react-router-dom";
import { useUser } from "../UserContext";

export default function MyDashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useUser();
  const [userClubs, setUserClubs] = useState([]);
  const [userPosts, setUserPosts] = useState([]);
  const [clubs, setClubs] = useState([]);

  const [hoveredPostId, setHoveredPostId] = useState(null);
  const [editedContent, setEditedContent] = useState();
  const [editingPostId, setEditingPostId] = useState(null);

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

  const fetchClubs = async () => {
    try {
      const response = await fetch("/clubs");
      if (!response.ok) {
        throw new Error("Failed to fetch clubs");
      }
      const data = await response.json();
      setClubs(data);
    } catch (error) {
      console.error("Error fetching clubs:", error);
    }
  };

  const fetchUserPosts = async () => {
    try {
      const response = await fetch(`/users/${user.id}/posts`);
      if (!response.ok) {
        throw new Error("Failed to fetch user posts");
      }
      const data = await response.json();
      setUserPosts(data);
    } catch (error) {
      console.error("Error fetching user posts:", error);
    }
  };

  useEffect(() => {
    fetchClubs();
  }, []);

  useEffect(() => {
    if (user && user.id && clubs && clubs.length > 0) {
      const userClubs = clubs.filter((club) =>
        club.members.some((member) => member.id === user.id)
      );
      setUserClubs(userClubs);
      fetchUserPosts(); // Fetch user's posts after userClubs state is set
    }
  }, [user, clubs]);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    fetchClubs();
  };

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
          console.log("Post updated successfully");
          // Update the userPosts state with the edited content
          setUserPosts((prevUserPosts) =>
            prevUserPosts.map((post) =>
              post.id === postId ? { ...post, content: updatedContent } : post
            )
          );
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
          console.log("Post deleted successfully");
          // Update the userPosts state to remove the deleted post
          setUserPosts((prevUserPosts) =>
            prevUserPosts.filter((post) => post.id !== postId)
          );
        } else {
          console.error("Error deleting post");
        }
      })
      .catch((error) => {
        console.error("Error deleting post:", error);
      });
  };

  return (
    <Profile>
      <button
        onClick={toggleModal}
        className="bg-gray-200 text-black dark:hover:text-white p-2 rounded block hover-effect"
      >
        + New Club
      </button>
      <div className="mb-8">
        <h3 className="text-2xl mb-6">My clubs</h3>
        {user && userClubs.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {userClubs.map((club) => (
              <Link to={`/clubs/${club.id}`} key={club.id}>
                <div className="md:h-36 flex flex-col justify-center p-4 bg-gray-200 dark:bg-gray-400 rounded-md hover-effect">
                  <b>{club.name}</b>
                  <br />
                  <span className="text-xs">{club.description}</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
      <div className="mb-8">
        <h3 className="text-2xl mb-6">My posts</h3>
        {userPosts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ul>
              {userPosts
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
                            onChange={(e) => setEditedContent(e.target.value)}
                          />
                          <button
                            onClick={() => {
                              handleEditChange(post.id, editedContent);
                              setEditingPostId(null);
                            }}
                          >
                            Submit
                          </button>
                          <button onClick={() => setEditingPostId(null)}>
                            Cancel
                          </button>
                        </div>
                      ) : (
                        // Render post content
                        <div className="text-gray-700 mt-2">{post.content}</div>
                      )}
                    </div>
                    {post.author_id === user.id &&
                      hoveredPostId === post.id && (
                        <div className="absolute right-0 top-0">
                          <button
                            onClick={() => {
                              setEditingPostId(post.id);
                              setEditedContent(post.content);
                            }}
                          >
                            Edit
                          </button>
                          <button onClick={() => handleDelete(post.id)}>
                            Delete
                          </button>
                        </div>
                      )}
                  </li>
                ))}
            </ul>
          </div>
        )}
      </div>
      {isModalOpen && <NewClubModal onClose={handleClose} />}
    </Profile>
  );
}
