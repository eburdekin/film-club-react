import { Link } from "react-router-dom";

export default function FilmCard({ film }) {
  return (
    <Link to={`/films/${film.id}`}>
      <div className="p-4 bg-white dark:bg-gray-300 rounded-md hover-effect">
        <h4 className="text-sm font-semibold text-gray-800">{film.title}</h4>
        <img
          className="mt-2 w-full h-auto"
          src={`https://image.tmdb.org/t/p/w185${film.poster_image}`}
          alt={film.title}
        />
      </div>
    </Link>
  );
}
