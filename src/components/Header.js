import { useState } from "react";
import { DarkThemeToggle } from "flowbite-react";
import HeaderNavLink from "./HeaderNavLink";
import SignupLoginModal from "./SignupLoginModal";

import { useUser } from "./UserContext";

const menuItems = [
  { label: `Home`, url: `/home` },
  { label: `Films`, url: `/films` },
  { label: `Clubs`, url: `/clubs` },
  { label: `Profile`, url: `/profile/my_clubs` },
];

const Header = () => {
  const { user, setUser } = useUser();

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

  const handleLogout = async () => {
    try {
      const response = await fetch("/logout", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        console.log("Logout successful");
        setUser(null);
        // Perform any additional actions after successful logout
      } else {
        throw new Error("Logout failed");
      }
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  };

  return (
    <header className="flex flex-col gap-5 mx-auto">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <a href="/" className="flex items-center">
          <img
            src="/favicon.ico"
            className="w-8 md:w-9 m-1 dark:invert"
            alt="logo"
          />
          <span
            className=" text-gray-900 text-2xl md:text-3xl dark:text-white h-2 leading-[1.4] mb-5"
            style={{ fontFamily: "Gabarito", fontWeight: 800 }}
          >
            FilmClub
          </span>
        </a>
        <nav className="ml-8 md:flex md:items-center md:gap-x-8">
          <ul
            className={`hidden md:flex flex-wrap gap-x-8 text-gray-900 dark:text-white ${
              isMenuOpen ? "block" : "hidden"
            } md:flex`}
          >
            {menuItems.map(({ url, label }, index) => (
              <li key={index}>
                <HeaderNavLink href={url}>{label}</HeaderNavLink>
              </li>
            ))}
            {user ? (
              <button
                onClick={handleLogout}
                className="bg-gray-300 dark:text-black dark:hover:text-white p-2 rounded block"
              >
                Log out
              </button>
            ) : (
              <button
                onClick={toggleModal}
                className="bg-gray-300 dark:text-black dark:hover:text-white p-2 rounded block"
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
        <div className="md:hidden fixed inset-0 bg-white dark:bg-gray-900 z-10">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <a href="/" className="flex items-center">
              <img
                src="/favicon.ico"
                className="w-8 md:w-9 m-1 dark:invert"
                alt="logo"
              />
              <span
                className=" text-gray-900 text-2xl md:text-3xl dark:text-white h-2 leading-[1.4] mb-5"
                style={{ fontFamily: "Gabarito", fontWeight: 800 }}
              >
                FilmClub
              </span>
            </a>
            <DarkThemeToggle />
            <button onClick={closeMenu}>
              <svg
                className="w-6 h-6 text-gray-900 dark:text-white"
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
          <ul className="flex flex-col items-center mt-12">
            {menuItems.map(({ url, label }, index) => (
              <li key={index} className="my-4">
                <HeaderNavLink href={url}>{label}</HeaderNavLink>
              </li>
            ))}
            <button
              onClick={toggleModal}
              className="bg-gray-100 text-black dark:hover:text-white p-2 rounded block"
            >
              Log in
            </button>
          </ul>
        </div>
      )}
      {isModalOpen && (
        <SignupLoginModal onClose={() => setIsModalOpen(false)} />
      )}
    </header>
  );
};

export default Header;
