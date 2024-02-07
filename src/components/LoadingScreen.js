import React from "react";

export default function LoadingScreen() {
  return (
    <div
      className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50"
      style={{ zIndex: 9999 }}
    >
      {/* <div className="text-5xl"> */}
      <img
        src="/reel.png"
        alt="loading film screen"
        className="animate-spin h-20 w-20 text-gray-400 dark:text-gray-600"
      />
      {/* </div> */}
    </div>
  );
}
