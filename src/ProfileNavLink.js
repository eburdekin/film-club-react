const ProfileNavLink = ({ href, children }) => {
  //   const pathname = usePathname();
  //   const active = href === pathname;

  return (
    <a
      href={href}
      className="hover:bg-gray-100 p-2 rounded block text-sm"
      //   className={`hover:bg-gray-100 p-2 rounded block text-sm ${
      //     active ? "text-black font-semibold" : "text-gray-500"
      //   }`}
    >
      {children}
    </a>
  );
};

export default ProfileNavLink;
