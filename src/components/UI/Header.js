import React, { useState } from "react";
import { DarkThemeToggle } from "flowbite-react";
import HeaderNavLink from "./HeaderNavLink";
import SignupLoginModal from "../modals/SignupLoginModal";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom"; // Import useHistory hook

import { useUser } from "../UserContext";

const Header = React.memo(() => {
  const history = useHistory();
  const { user, loginUser, logoutUser } = useUser();

  const menuItems = [
    // { label: `Home`, url: `/home` },
    { label: `Films`, url: `/films` },
    user ? { label: `Clubs`, url: `/clubs` } : null,
    user ? { label: `Profile`, url: `/profile/dashboard` } : null,
    user && user.role && user.role.name === "admin"
      ? { label: `Admin`, url: `/admin/user_dash` }
      : null,
  ].filter((item) => item !== null);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleUserLogin = (userData) => {
    loginUser(userData);
    setIsModalOpen(false);
    setIsMenuOpen(false);
  };

  const handleLogout = async () => {
    try {
      const response = await fetch("/logout", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        logoutUser();
        history.push("/");
        // Perform any additional actions after successful logout
      } else {
        throw new Error("Logout failed");
      }
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-black backdrop-blur-md dark:backdrop-blur-md bg-opacity-60 dark:bg-opacity-60">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <img
            src="/favicon.ico"
            className="w-8 md:w-9 m-1 dark:invert"
            alt="logo"
          />
          <h1
            className="text-purple-500 dark:text-purple-400  text-2xl md:text-3xl h-2 leading-[1.4] mb-5"
            style={{ fontWeight: 800 }}
          >
            FilmClub
          </h1>
        </Link>
        <nav className="ml-8 md:flex md:items-center md:gap-x-8">
          <ul
            className={`hidden md:flex flex-wrap gap-x-8 text-gray-900 dark:text-white ${
              isMenuOpen ? "block" : "hidden"
            } md:flex`}
          >
            {menuItems.map(({ url, label }, index) => (
              <li key={index}>
                <HeaderNavLink href={url} onClick={closeMenu}>
                  {label}
                </HeaderNavLink>
              </li>
            ))}
            {user ? (
              <button
                onClick={handleLogout}
                className=" bg-purple-500 dark:bg-purple-400 text-white dark:text-black dark:hover:text-white p-2 rounded-xl block hover-effect"
              >
                Log out
              </button>
            ) : (
              <button
                onClick={toggleModal}
                className=" bg-purple-500 dark:bg-purple-400 text-white dark:text-black dark:hover:text-white p-2 rounded-xl block hover-effect"
              >
                Log in
              </button>
            )}
          </ul>
        </nav>
        <DarkThemeToggle />
        <div className="ml-auto md:hidden">
          <button onClick={toggleMenu}>
            <svg
              className="w-6 h-6 text-gray-900 dark:text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>
      {/* Overlay menu */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-white dark:bg-black  z-10">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <Link to="/" className="flex items-center">
              <img
                src="/favicon.ico"
                className="w-8 md:w-9 m-1 dark:invert"
                alt="logo"
              />
              <h1
                className="text-purple-500 dark:text-purple-400 text-2xl md:text-3xl h-2 leading-[1.4] mb-5"
                style={{ fontWeight: 800 }}
              >
                FilmClub
              </h1>
            </Link>
            <DarkThemeToggle />
            <button onClick={closeMenu}>
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <ul className="flex flex-col items-center pt-12 bg-white dark:bg-black min-h-screen">
            {menuItems.map(({ url, label }, index) => (
              <li key={index} className="my-4 text-2xl">
                <HeaderNavLink href={url} onClick={closeMenu}>
                  {label}
                </HeaderNavLink>
              </li>
            ))}
            {user ? (
              <button
                onClick={handleLogout}
                className="text-xl bg-purple-500 dark:bg-purple-400 text-white dark:text-black dark:hover:text-white mt-4 p-3 rounded-xl block hover-effect"
              >
                Log out
              </button>
            ) : (
              <button
                onClick={toggleModal}
                className="text-xl bg-purple-500 dark:bg-purple-400 text-white dark:text-black dark:hover:text-white mt-4 p-3 rounded-xl block hover-effect"
              >
                Log in
              </button>
            )}
          </ul>
        </div>
      )}
      {isModalOpen && (
        <SignupLoginModal onClose={toggleModal} onLogin={handleUserLogin} />
      )}
    </header>
  );
});

export default Header;
