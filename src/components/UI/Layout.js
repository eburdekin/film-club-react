// Layout.js
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUp } from "@fortawesome/free-solid-svg-icons";
import Header from "./Header";
import Footer from "./Footer";
import LoadingScreen from "../LoadingScreen";

import { useUser } from "../UserContext";

const Layout = ({ children }) => {
  const { loading } = useUser();
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-900">
      <Header />
      <div className="flex flex-col min-h-screen mx-auto max-w-4xl px-4 pt-8 pb-16">
        <div className="flex-grow">
          {loading ? (
            <LoadingScreen />
          ) : (
            <main className="my-0 py-16">{children}</main>
          )}
        </div>
      </div>
      <Footer />
      {showBackToTop && (
        <button
          className="fixed bottom-4 p-1 right-4 rounded-2xl shadow-lg hover:bg-gray-100"
          onClick={scrollToTop}
        >
          <FontAwesomeIcon
            icon={faCircleUp}
            size="2xl"
            className="dark:invert"
          />
        </button>
      )}
    </div>
  );
};

export default Layout;
