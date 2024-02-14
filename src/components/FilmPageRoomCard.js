import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilm } from "@fortawesome/free-solid-svg-icons";

export default function FilmPageRoomCard({ room }) {
  return (
    <Link to={`/rooms/${room.id}`}>
      <div className="bg-gray-300 dark:bg-gray-900 hover-effect text-md justify-center p-4 border border-purple-500 dark:border-purple-300  dark:text-white rounded-md">
        <b>
          {" "}
          <FontAwesomeIcon icon={faFilm} size="lg" /> Room #{room.id}
        </b>
        <br />
        <span className="text-xs">
          hosted by <b>{room.club.name}</b>
        </span>
      </div>
    </Link>
  );
}
