const SideNavLink = ({ href, children }) => {
  //   const pathname = usePathname();
  const active = href === window.location.pathname;

  return (
    <a
      href={href}
      //   className="hover:bg-gray-100 dark:text-white p-2 rounded block text-sm"
      className={`hover:bg-gray-100 dark:hover:text-black p-2 rounded block text-sm ${
        active
          ? "text-black dark:text-white font-semibold"
          : "text-gray-500 dark:text-gray-300"
      }`}
    >
      {children}
    </a>
  );
};

export default SideNavLink;
