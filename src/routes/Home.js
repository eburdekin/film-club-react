import { useEffect, useState, useRef } from "react";

export default function Home() {
  const [films, setFilms] = useState([]);

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
        className=" text-black dark:text-white leading-[1.4] mt-8 mb-1 text-7xl md:text-8xl"
        style={{ fontWeight: 900 }}
      >
        FilmClub
      </h1>
      <h2 className="text-xl md:text-2xl mb-20 font-bold text-purple-500 dark:text-purple-400">
        Always screening near you.
      </h2>
      <h4 className="text-lg font-bold mb-1 text-gray-700 dark:text-gray-300">
        Most Popular Films
      </h4>
      <div
        ref={scrollContainerRef}
        className="scroll-container overflow-x-auto whitespace-nowrap mb-4"
      >
        {films.map((film) => (
          <div key={film.id} className="inline-block px-1 md:px-2 m-2 md:m-4">
            <a href={`/films/${film.id}`}>
              <div className="hover-effect">
                {/* <h4 className="text-sm font-semibold text-gray-900">
                  {film.title}
                </h4> */}
                <img
                  className="mt-2 mb-4 w-auto h-80 rounded-lg"
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
