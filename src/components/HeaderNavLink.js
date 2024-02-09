import { NavLink } from "react-router-dom";

const HeaderNavLink = ({ href, children }) => {
  return (
    <NavLink
      to={href}
      className="hover:bg-gray-100 dark:hover:text-black p-2 rounded-xl block"
      activeClassName="text-black font-bold dark:text-white"
    >
      {children}
    </NavLink>
  );
};

export default HeaderNavLink;
