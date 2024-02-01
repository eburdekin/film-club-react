// import HeaderNavLink from "./HeaderNavLink";
// // import SearchField from "./SearchField";
// import { DarkThemeToggle } from "flowbite-react";

// const menuItems = [
//   { label: `Home`, url: `/` },
//   { label: `Films`, url: `/films` },
//   { label: `Clubs`, url: `/clubs` },
//   { label: `Profile`, url: `/profile/my_clubs` },
// ];

// const Header = () => {
//   return (
//     <header className="flex flex-col gap-5">
//       <div className="py-4 flex items-center">
//         <a href="/">
//           <img
//             width={36}
//             height={36}
//             src="/favicon.ico"
//             className="w-8 md:w-9"
//             alt="logo"
//           />
//         </a>
//         <nav className="ml-8">
//           <ul className="flex flex-wrap gap-x-8 text-gray-900">
//             {menuItems.map(({ url, label }, index) => (
//               <li key={index}>
//                 <HeaderNavLink href={url}>{label}</HeaderNavLink>
//               </li>
//             ))}
//           </ul>
//         </nav>
//         <DarkThemeToggle />
//       </div>

//       {/* <SearchField /> */}
//     </header>
//   );
// };

// export default Header;
import { useState } from "react";
import { DarkThemeToggle } from "flowbite-react";
import HeaderNavLink from "./HeaderNavLink";

const menuItems = [
  { label: `Home`, url: `/` },
  { label: `Films`, url: `/films` },
  { label: `Clubs`, url: `/clubs` },
  { label: `Profile`, url: `/profile/my_clubs` },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="flex flex-col gap-5 mx-auto">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <a href="/">
          <img
            width={36}
            height={36}
            src="/favicon.ico"
            className="w-8 md:w-9 dark:invert"
            alt="logo"
          />
        </a>
        <nav className="ml-8 md:flex md:items-center md:gap-x-8">
          <ul
            className={`flex flex-wrap gap-x-8 text-gray-900 dark:text-white ${
              isMenuOpen ? "block" : "hidden"
            } md:flex`}
          >
            {menuItems.map(({ url, label }, index) => (
              <li key={index}>
                <HeaderNavLink href={url}>{label}</HeaderNavLink>
              </li>
            ))}
          </ul>
        </nav>
        <DarkThemeToggle />
        <div className="ml-auto md:hidden">
          <button onClick={toggleMenu}>
            <svg
              className="w-6 h-6"
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
    </header>
  );
};

export default Header;
