import { Link } from "react-router-dom";

export default function ClubCard({ club }) {
  return (
    <Link to={`/clubs/${club.id}`}>
      <div className="md:h-36 flex flex-col justify-center p-4 bg-gray-100 dark:bg-gray-300 rounded-md hover-effect">
        <b>{club.name}</b>
        <br />
        <span className="text-xs">{club.description}</span>
      </div>
    </Link>
  );
}
