import React, { useState } from "react";

const CookiesPopup = ({ onAccept }) => {
  const [accepted, setAccepted] = useState(false);

  const handleAccept = () => {
    setAccepted(true);
    onAccept();
  };

  if (accepted) {
    return null; // Don't render the popup if cookies are accepted
  }

  return (
    <div className="fixed bottom-4 left-0 w-full flex justify-center">
      <div className="bg-gray-100 dark:bg-gray-800 rounded-lg border border-purple-300 dark:border-purple-500 p-3 mb-4">
        <p className="text-sm dark:text-white">
          FilmClub uses cookies to improve your experience.
        </p>
        <div className="flex justify-center gap-4 mt-2">
          <button
            onClick={handleAccept}
            className="block text-sm bg-purple-500 dark:bg-purple-400 text-white dark:text-black dark:hover:text-white p-2 rounded-xl w-1/2"
          >
            Accept Cookies
          </button>
          <span className="block text-sm border border-purple-300 dark:border-purple-500 dark:text-white dark:hover:text-white p-2 rounded-xl w-1/2 text-center">
            <a href="https://secureprivacy.ai/blog/understanding-cookie-compliance">
              Read More
            </a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default CookiesPopup;
