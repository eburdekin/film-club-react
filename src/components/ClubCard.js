import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers } from "@fortawesome/free-solid-svg-icons";

export default function ClubCard({ club }) {
  return (
    <Link to={`/clubs/${club.id}`}>
      <div className="md:h-36 flex flex-col justify-center p-4 border border-purple-500 dark:border-purple-300 bg-gray-100 dark:bg-gray-900 dark:text-white rounded-md hover-effect">
        <b>
          <FontAwesomeIcon icon={faUsers} /> {club.name}
        </b>
        <br />
        <span className="text-xs">{club.description}</span>
      </div>
    </Link>
  );
}
