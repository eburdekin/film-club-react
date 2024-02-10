import React, { useState } from "react";

export default function FilmList({ films }) {
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 20; // Set the number of movies per page

  // Calculate total number of pages
  const totalPages = Math.ceil(films.length / moviesPerPage);

  // Change page
  const paginate = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  // Calculate start and end index of films to display on the current page
  const startIndex = (currentPage - 1) * moviesPerPage;
  const endIndex = Math.min(startIndex + moviesPerPage, films.length);

  return (
    <div className="mt-8">
      <h3 className="text-2xl mb-6 dark:text-gray-300">All Films</h3>
      {/* Pagination */}
      <div className="flex justify-center mb-4">
        <button
          className="dark:text-white mx-1 px-3 py-1 border border-gray-300 rounded-md"
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {currentPage > 1 && (
          <button
            className={`dark:text-white mx-1 px-3 py-1 border border-gray-300 rounded-md ${
              currentPage === 1 ? "bg-gray-300" : ""
            }`}
            onClick={() => paginate(currentPage - 1)}
          >
            {currentPage - 1}
          </button>
        )}
        <button
          className={`text-white dark:text-black mx-1 px-3 py-1 border border-gray-300 rounded-md bg-cyan-600 dark:bg-cyan-400`}
          onClick={() => paginate(currentPage)}
        >
          {currentPage}
        </button>
        {currentPage < totalPages && (
          <button
            className={`dark:text-white mx-1 px-3 py-1 border border-gray-300 rounded-md ${
              currentPage === totalPages ? "bg-gray-300" : ""
            }`}
            onClick={() => paginate(currentPage + 1)}
          >
            {currentPage + 1}
          </button>
        )}
        <button
          className="dark:text-white mx-1 px-3 py-1 border border-gray-300 rounded-md"
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Display movies for the current page */}
        {films.slice(startIndex, endIndex).map((film) => (
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
          className="dark:text-white mx-1 px-3 py-1 border border-gray-300 rounded-md"
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {currentPage > 1 && (
          <button
            className={`dark:text-white mx-1 px-3 py-1 border border-gray-300 rounded-md ${
              currentPage === 1 ? "bg-gray-300" : ""
            }`}
            onClick={() => paginate(currentPage - 1)}
          >
            {currentPage - 1}
          </button>
        )}
        <button
          className={`text-white dark:text-black mx-1 px-3 py-1 border border-gray-300 rounded-md bg-cyan-600 dark:bg-cyan-400`}
          onClick={() => paginate(currentPage)}
        >
          {currentPage}
        </button>
        {currentPage < totalPages && (
          <button
            className={`dark:text-white mx-1 px-3 py-1 border border-gray-300 rounded-md ${
              currentPage === totalPages ? "bg-gray-300" : ""
            }`}
            onClick={() => paginate(currentPage + 1)}
          >
            {currentPage + 1}
          </button>
        )}
        <button
          className="dark:text-white mx-1 px-3 py-1 border border-gray-300 rounded-md"
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}
