import { useState } from "react";

export default function FilmList({ films }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [moviesPerPage] = useState(20); // Set the number of movies per page

  // const scrollContainerRef = useRef(null);

  // Calculate total number of pages
  const totalPages = Math.ceil(films.length / moviesPerPage);

  // Change page
  const paginate = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     if (scrollContainerRef.current) {
  //       scrollContainerRef.current.scrollLeft += 1;
  //     }
  //   }, 30); // Adjust scrolling speed as needed

  //   return () => clearInterval(interval);
  // }, []);

  return (
    <div className="mt-8">
      <h3 className="text-2xl mb-6 dark:text-gray-300">All Films</h3>
      {/* Pagination */}
      <div className="flex justify-center mb-4">
        <button
          className="mx-1 px-3 py-1 border border-gray-300 rounded-md"
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {Array.from({ length: Math.min(3, totalPages) }, (_, i) => (
          <button
            key={i}
            className={`mx-1 px-3 py-1 border border-gray-300 rounded-md ${
              currentPage === i + 1 ? "bg-gray-300" : ""
            }`}
            onClick={() => paginate(currentPage - 1 + i)}
          >
            {currentPage - 1 + i}
          </button>
        ))}
        <button
          className="mx-1 px-3 py-1 border border-gray-300 rounded-md"
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Display movies for the current page */}
        {films
          .slice((currentPage - 1) * moviesPerPage, currentPage * moviesPerPage)
          .map((film) => (
            <a key={film.id} href={`/films/${film.id}`}>
              <div className="p-4 bg-gray-100 dark:bg-gray-300 rounded-md hover-effect">
                <h4 className="text-sm font-semibold text-gray-800">
                  {film.title}
                </h4>
                <img
                  className="mt-2 w-full h-auto"
                  src={`https://image.tmdb.org/t/p/w185${film.poster_image}`}
                  alt={film.title}
                />
              </div>
            </a>
          ))}
      </div>
      {/* Pagination */}
      <div className="flex justify-center mt-4">
        <button
          className="mx-1 px-3 py-1 border border-gray-300 rounded-md"
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {Array.from({ length: Math.min(3, totalPages) }, (_, i) => (
          <button
            key={i}
            className={`mx-1 px-3 py-1 border border-gray-300 rounded-md ${
              currentPage === i + 1 ? "bg-gray-300" : ""
            }`}
            onClick={() => paginate(currentPage - 1 + i)}
          >
            {currentPage - 1 + i}
          </button>
        ))}
        <button
          className="mx-1 px-3 py-1 border border-gray-300 rounded-md"
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}
