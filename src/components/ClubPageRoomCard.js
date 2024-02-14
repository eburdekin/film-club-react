import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilm } from "@fortawesome/free-solid-svg-icons";

export default function ClubPageRoomCard({ room }) {
  return (
    <Link to={`/rooms/${room.id}`}>
      <div className="bg-gray-300 dark:bg-gray-900 hover-effect text-md justify-center p-4 border border-purple-500 dark:border-purple-300 dark:text-white rounded-md">
        <b>
          <FontAwesomeIcon icon={faFilm} size="lg" /> Room #{room.id}
        </b>
        <br />
        <span className="text-xs">
          showing <b>{room.movie.title}</b>
        </span>
      </div>
    </Link>
  );
}
