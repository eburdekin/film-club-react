import { useState, useEffect } from "react";

export default function FilmList() {
  const [films, setFilms] = useState([]);

  useEffect(() => {
    const fetchFilms = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5555/movies");
        if (!response.ok) {
          throw new Error("Failed to fetch films");
        }
        const data = await response.json();
        setFilms(data);
      } catch (error) {
        console.error("Error fetching films:", error);
      }
    };

    fetchFilms();
  }, []);

  return (
    <div className="mt-8">
      <h3 className="text-xl font-bold mb-6 dark:text-gray-300">
        Popular Films
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {films.map((film) => (
          <div key={film.id} className="p-4 bg-gray-100 rounded-md">
            <h4 className="text-sm font-semibold text-gray-800">
              {film.title}
            </h4>
            <img
              className="mt-2 w-full h-auto"
              src={`https://image.tmdb.org/t/p/w185${film.poster_image}`}
              alt={film.title}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
