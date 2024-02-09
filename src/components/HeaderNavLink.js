import { NavLink } from "react-router-dom";

const HeaderNavLink = ({ href, children }) => {
  const pathname = window.location.pathname;
  const active = pathname.startsWith(href);

  return (
    <NavLink
      to={href}
      //   className="hover:bg-gray-100 p-2 rounded block"
      className={`hover:bg-gray-100 dark:hover:text-black p-2 rounded-xl block ${
        active ||
        (href.startsWith("/profile") && pathname.startsWith("/profile"))
          ? "text-black font-bold dark:text-white"
          : "text-gray-700 dark:text-gray-400"
      }`}
    >
      {children}
    </NavLink>
  );
};

export default HeaderNavLink;
