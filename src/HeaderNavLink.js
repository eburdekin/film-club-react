const HeaderNavLink = ({ href, children }) => {
  //   const pathname = usePathname();
  //   const active = href === pathname;

  return (
    <a
      href={href}
      className="hover:bg-gray-100 p-2 rounded block"
      //   className={`hover:bg-gray-100 p-2 rounded block ${
      //     active ||
      //     (href.startsWith("/profile") && pathname.startsWith("/profile"))
      //       ? "text-black font-semibold"
      //       : "text-gray-500"
      //   }`}
    >
      {children}
    </a>
  );
};

export default HeaderNavLink;
