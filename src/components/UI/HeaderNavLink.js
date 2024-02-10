import { NavLink } from "react-router-dom";

const HeaderNavLink = ({ href, children, onClick }) => {
  const handleClick = () => {
    if (onClick) {
      onClick(); // Close the menu
    }
  };

  return (
    <NavLink
      to={href}
      onClick={handleClick}
      className=" dark:text-gray-300 hover:bg-gray-100 dark:hover:text-black p-2 rounded-xl block"
      activeClassName="text-black font-bold dark:text-white"
    >
      {children}
    </NavLink>
  );
};

export default HeaderNavLink;
