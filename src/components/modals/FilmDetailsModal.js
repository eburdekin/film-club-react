import { Link } from "react-router-dom";

import { useUser } from "../UserContext";

export default function FilmDetails({ film, onClose }) {
  const { user } = useUser();

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="bg-gray-100 dark:bg-gray-300 w-96 p-8 rounded-lg shadow-lg z-10 text-center">
        <button className="hover:font-bold" onClick={onClose}>
          X
        </button>
        <h2 className="text-3xl font-bold text-gray-900 leading-[1.4] mb-5">
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
                <ul>
                  <li>Release date: {film.release_date}</li>
                  <li>
                    Genres:{" "}
                    {film.genres.map((genre) => (
                      <div className="bg-white">{genre.name}</div>
                    ))}
                  </li>
                </ul>
              </div>
            </div>

            {user ? (
              <div>
                <h3 className="text-bold text-lg mt-2">Screening Rooms</h3>
                <ul>
                  {film.screening_rooms &&
                    film.screening_rooms.map((room) => (
                      <a key={room.id} href={`/rooms/${room.id}`}>
                        <li className="bg-gray-300 dark:bg-gray-400 p-2 rounded-md hover-effect text-md">
                          <b>Room #{room.id}</b>
                          <br />
                          <span className="text-xs">
                            hosted by <b>{room.club.name}</b>
                          </span>
                        </li>
                      </a>
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
      </div>
    </div>
  );
}
