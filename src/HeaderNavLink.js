const HeaderNavLink = ({ href, children }) => {
  const pathname = window.location.pathname;
  const active = href === pathname;

  return (
    <a
      href={href}
      //   className="hover:bg-gray-100 p-2 rounded block"
      className={`hover:bg-gray-100 dark:hover:text-black p-2 rounded block ${
        active ||
        (href.startsWith("/profile") && pathname.startsWith("/profile"))
          ? "text-black font-semibold dark:text-white"
          : "text-gray-500"
      }`}
    >
      {children}
    </a>
  );
};

export default HeaderNavLink;
