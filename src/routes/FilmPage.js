import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useUser } from "../components/UserContext";
import StarRating from "../components/StarRating";
import H2 from "../components/UI/H2";
import H3 from "../components/UI/H3";
import H4 from "../components/UI/H4";
import NewRoomFromFilmModal from "../components/modals/NewRoomFromFilmModal";
import FilmPageRoomCard from "../components/FilmPageRoomCard";

export default function FilmPage() {
  const { user } = useUser();
  const { filmId } = useParams();
  const [film, setFilm] = useState([]);
  const [averageRating, setAverageRating] = useState(null);
  const [latestPosts, setLatestPosts] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [showModal, setShowModal] = useState(false);

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

  const fetchFilmDetails = () => {
    fetch(`https://film-club-server.onrender.com/movies/${filmId}`)
      .then((response) => response.json())
      .then((film) => {
        // Process club details
        setFilm(film);

        fetch(
          `https://film-club-server.onrender.com/movies/${filmId}/average-rating`
        )
          .then((response) => response.json())
          .then((data) => {
            setAverageRating(data.average_rating);
          })
          .catch((error) => {
            console.error("Error fetching average rating:", error);
          });
      })
      .catch((error) => {
        console.error("Error fetching film details:", error);
      });
  };

  const fetchLatestPosts = () => {
    fetch(`https://film-club-server.onrender.com/movies/${filmId}/posts`)
      .then((response) => response.json())
      .then((data) => {
        setLatestPosts(data.posts.slice(0, 4)); // Slice to get only 5 latest posts
      })
      .catch((error) => {
        console.error("Error fetching latest posts:", error);
      });
  };

  const fetchSimilarMovies = () => {
    fetch(`https://film-club-server.onrender.com/movies/${filmId}/similar`)
      .then((response) => response.json())
      .then((data) => {
        setSimilarMovies(data); // Slice to get only 5 latest posts
      })
      .catch((error) => {
        console.error("Error fetching latest posts:", error);
      });
  };

  // Fetch club details using clubId
  useEffect(() => {
    fetchFilmDetails();
    fetchLatestPosts();
    fetchSimilarMovies();
  }, [filmId]);

  const openModal = () => {
    setShowModal(!showModal);
  };

  const closeModal = () => {
    setShowModal(!showModal);
    fetchFilmDetails();
  };

  function reformatDate(inputDate) {
    // Create a Date object from the input date string
    const dateObj = new Date(inputDate);

    // Array of month names
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "June",
      "July",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec",
    ];

    // Get the month, day, and year components from the date object
    const month = monthNames[dateObj.getMonth()];
    const day = dateObj.getDate();
    const year = dateObj.getFullYear();

    // Reformat the date string
    const reformattedDate = `${month} ${day}, ${year}`;

    return reformattedDate;
  }

  return (
    <>
      <H2>{film.title}</H2>
      <div className="flex flex-col md:flex-row gap-2">
        <div className="md:flex-[3]">
          <div className="flex-shrink-0">
            <img
              className="block w-26 h-auto rounded-md mr-4"
              src={`https://image.tmdb.org/t/p/w185${film.poster_image}`}
              alt={film.title}
            />
          </div>
          <div className="flex text-left dark:text-white">
            <div>
              <div>Released {reformatDate(film.release_date)}</div>
              <div>
                <h4 className="text-sm">
                  Average Rating on FilmClub:
                  <br />
                  <StarRating averageRating={averageRating} />
                  {averageRating && averageRating.toFixed(1)} stars
                </h4>
              </div>
              Genres:{" "}
              <ul className="flex flex-wrap mb-6">
                {film.genres &&
                  film.genres.map((genre) => (
                    <li
                      key={genre.id}
                      className="border text-white bg-purple-500 p-1 m-1 rounded-md text-xs text-center inline-block"
                    >
                      {genre.name}
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>

        {user ? (
          <div className="bg-gray-100 dark:bg-gray-900 flex-[8] p-4 rounded min-h-[300px] mb-4">
            <button
              onClick={openModal}
              className="bg-purple-500 dark:bg-purple-400 text-white dark:text-black dark:hover:text-white my-4 p-2 rounded-xl block hover-effect"
            >
              + New Screening Room
            </button>
            <H4>Screening Rooms</H4>
            <div className="flex flex-wrap gap-2">
              {film.screening_rooms &&
                film.screening_rooms.map((room) => (
                  <div key={room.id} className="w-full md:w-1/2">
                    <FilmPageRoomCard room={room} />
                  </div>
                ))}
            </div>
            <H4>Latest Posts</H4>
            <ul>
              {latestPosts.map((post) => (
                <li
                  key={post.id}
                  className="mb-2 bg-gray-200 dark:bg-gray-400 rounded-lg p-4 flex justify-between items-start relative"
                >
                  <div className="flex flex-col" key={post.id}>
                    <div>
                      <span className="font-bold text-sm">
                        {post.author.username}{" "}
                      </span>
                      <span className="text-xs font-bold text-gray-500 mt-1">
                        {formatTimestamp(post.timestamp)}
                      </span>
                    </div>

                    <div className="mt-2 text-sm">{post.content}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="font-bold text-xl p-4 m-4">
            Log in or create an account to view average user rating, latest
            posts, and more!
          </div>
        )}
      </div>
      <H3>You Might Also Like</H3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
        {similarMovies.map((movie) => (
          <Link to={`/films/${movie.id}`} className="flex-1">
            <div
              key={movie.id}
              className="poster-container flex flex-col items-center hover-effect dark:text-white text-center whitespace-normal break-words"
            >
              <img
                className="w-35 h-auto rounded-md"
                src={`https://image.tmdb.org/t/p/w185${movie.poster_image}`}
                alt={movie.title}
              />
              <div className="text-xs">{movie.title}</div>
            </div>
          </Link>
        ))}
        {similarMovies.length < 6 &&
          [...Array(6 - similarMovies.length)].map((_, index) => (
            <div
              key={index}
              className="poster-container flex flex-col items-center"
            ></div>
          ))}
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
      {showModal && (
        <NewRoomFromFilmModal
          // clubId={clubId}
          filmId={filmId}
          onClose={closeModal}
        />
      )}
    </>
  );
}
