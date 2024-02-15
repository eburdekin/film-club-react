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
    <div className="fixed bottom-0 left-0 w-full flex justify-center">
      <div className="bg-white rounded-lg shadow-md p-4 mb-4">
        <p className="text-sm">
          This website uses cookies to improve user experience.
        </p>
        <button
          onClick={handleAccept}
          className=" bg-purple-500 dark:bg-purple-400 text-white dark:text-black dark:hover:text-white p-2 rounded-xl block hover-effect"
        >
          Accept Cookies
        </button>
      </div>
    </div>
  );
};

export default CookiesPopup;
