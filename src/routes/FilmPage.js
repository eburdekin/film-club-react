import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useUser } from "../components/UserContext";
import StarRating from "../components/StarRating";

export default function FilmPage() {
  const { user } = useUser();
  const { filmId } = useParams();
  const [film, setFilm] = useState([]);
  const [averageRating, setAverageRating] = useState(null);

  const fetchFilmDetails = () => {
    fetch(`http://127.0.0.1:5555/movies/${filmId}`)
      .then((response) => response.json())
      .then((film) => {
        // Process club details
        setFilm(film);

        fetch(`http://127.0.0.1:5555/movies/${filmId}/average-rating`)
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

  // Fetch club details using clubId
  useEffect(() => {
    fetchFilmDetails();
  }, []);

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 leading-[1.4] mb-5">
        {film.title}
      </h2>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="bg-gray-100 dark:bg-gray-300 flex-[8] p-4 rounded min-h-[300px]">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-1">
              <h3 className="text-bold text-lg">{film.summary}</h3>
              <img
                className="w-30 h-auto"
                src={`https://image.tmdb.org/t/p/w185${film.poster_image}`}
                alt={film.title}
              />
            </div>
            <div className="col-span-1 text-left">
              <div>
                <div>Release date: {film.release_date}</div>
                <div>
                  <h4 className="text-sm">
                    Average Rating from FilmClub:
                    <br />
                    <StarRating averageRating={averageRating} />
                    {averageRating} stars
                  </h4>
                </div>
                <div>
                  Genres:{" "}
                  {film.genres &&
                    film.genres.map((genre) => (
                      <div key={genre.id} className="bg-white">
                        {genre.name}
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>

          {user ? (
            <div>
              <h3 className="text-bold text-lg mt-2">Screening Rooms</h3>
              <ul>
                {film.screening_rooms &&
                  film.screening_rooms.map((room) => (
                    <Link key={room.id} to={`/rooms/${room.id}`}>
                      <li className="bg-gray-300 dark:bg-gray-400 p-2 rounded-md hover-effect text-md">
                        <b>Room #{room.id}</b>
                        <br />
                        <span className="text-xs">
                          hosted by <b>{room.club.name}</b>
                        </span>
                      </li>
                    </Link>
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
