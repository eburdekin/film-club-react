import { useEffect, useState, useRef } from "react";

export default function Home() {
  const [films, setFilms] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [moviesPerPage] = useState(20); // Set the number of movies per page

  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const fetchFilms = async () => {
      try {
        const response = await fetch("/movies");
        if (!response.ok) {
          throw new Error("Failed to fetch films");
        }
        const data = await response.json();
        setFilms(data.slice(0, 10));
      } catch (error) {
        console.error("Error fetching films:", error);
      }
    };

    fetchFilms();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollLeft += 1;
      }
    }, 30); // Adjust scrolling speed as needed

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <h1
        className=" text-gray-900 dark:text-white leading-[1.4] mb-5"
        style={{ fontFamily: "Gabarito", fontWeight: 800, fontSize: 80 }}
      >
        FilmClub
      </h1>
      <h2 className="text-2xl mb-16 text-gray-700 dark:text-gray-300">
        Always screening near you.
      </h2>
      <h4 className="text-lg font-bold mb-1 text-gray-700 dark:text-gray-300">
        Most Popular Films
      </h4>
      <div
        ref={scrollContainerRef}
        className="overflow-x-auto whitespace-nowrap mb-4"
      >
        {films.map((film) => (
          <div key={film.id} className="inline-block px-4 m-2">
            <a href={`/films/${film.id}`}>
              <div className="p-4 bg-gray-100 dark:bg-gray-300 rounded-md hover-effect">
                <h4 className="text-sm font-semibold text-gray-800">
                  {film.title}
                </h4>
                <img
                  className="mt-2 w-auto h-70"
                  src={`https://image.tmdb.org/t/p/w185${film.poster_image}`}
                  alt={film.title}
                />
              </div>
            </a>
          </div>
        ))}
      </div>
    </>
  );
}
