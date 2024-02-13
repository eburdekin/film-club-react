import { Link } from "react-router-dom";

export default function FilmCard({ film }) {
  return (
    <Link to={`/films/${film.id}`}>
      <div className="hover-effect">
        {/* <h4 className="text-sm font-semibold text-gray-900">{film.title}</h4> */}
        <img
          className="mt-2 w-full h-auto rounded-md"
          src={`https://image.tmdb.org/t/p/w185${film.poster_image}`}
          alt={film.title}
        />
      </div>
    </Link>
  );
}
