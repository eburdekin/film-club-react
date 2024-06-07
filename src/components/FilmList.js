import React, { useState } from "react";

import FilmCard from "./FilmCard";

import FilmDetailsModal from "../pages/FilmPage";

export default function FilmList({ films }) {
  const [currentPage, setCurrentPage] = useState(1);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedFilm, setSelectedFilm] = useState(null);

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

  const handleCardClick = (film) => {
    setIsModalOpen(true);
    setSelectedFilm(film);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="mt-8">
      {/* Pagination */}
      <div className="flex justify-center mb-4">
        <button
          className="dark:text-white mx-1 px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md"
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {currentPage > 1 && (
          <button
            className={`dark:text-white mx-1 px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md ${
              currentPage === 1 ? "bg-gray-300" : ""
            }`}
            onClick={() => paginate(currentPage - 1)}
          >
            {currentPage - 1}
          </button>
        )}
        <button
          className={`text-white dark:text-black mx-1 px-3 py-1 border border-gray-300 dark:border-gray-600 before:rounded-md bg-purple-500 dark:bg-purple-400`}
          onClick={() => paginate(currentPage)}
        >
          {currentPage}
        </button>
        {currentPage < totalPages && (
          <button
            className={`dark:text-white mx-1 px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md ${
              currentPage === totalPages ? "bg-gray-300" : ""
            }`}
            onClick={() => paginate(currentPage + 1)}
          >
            {currentPage + 1}
          </button>
        )}
        <button
          className="dark:text-white mx-1 px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md"
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        {/* Display movies for the current page */}
        {films.slice(startIndex, endIndex).map((film) => (
          <FilmCard key={film.id} film={film} onClick={handleCardClick} />
        ))}
      </div>
      {/* Pagination */}
      <div className="flex justify-center mt-4">
        <button
          className="dark:text-white mx-1 px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md"
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
          className={`text-white dark:text-black mx-1 px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md bg-purple-500 dark:bg-purple-400`}
          onClick={() => paginate(currentPage)}
        >
          {currentPage}
        </button>
        {currentPage < totalPages && (
          <button
            className={`dark:text-white mx-1 px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md ${
              currentPage === totalPages ? "bg-gray-300" : ""
            }`}
            onClick={() => paginate(currentPage + 1)}
          >
            {currentPage + 1}
          </button>
        )}
        <button
          className="dark:text-white mx-1 px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md"
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
      {isModalOpen ? (
        <FilmDetailsModal film={selectedFilm} onClose={handleClose} />
      ) : null}
    </div>
  );
}
