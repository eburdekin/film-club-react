import React from "react";

export default function LoadingScreen() {
  return (
    <div
      //   className="dark:bg-gray-900 fixed top-0 left-0 w-full flex items-center justify-center h-full"
      style={{ zIndex: 9999 }}
    >
      <div
        className="relative flex items-center justify-center h-screen"
        style={{ marginTop: "-10vh" }}
      >
        <img
          src="/reel.png"
          alt="loading film screen"
          className="animate-spin h-20 w-20 dark:invert"
        />
      </div>
    </div>
  );
}
