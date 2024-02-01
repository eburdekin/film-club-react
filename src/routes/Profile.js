import ProfileNavLink from "../components/ProfileNavLink";

const ProfileLayout = ({ children }) => {
  return (
    <div className="flex flex-col md:flex-row gap-8">
      {/* Navigation as tabs on small screens */}
      <nav className="bg-gray-100 p-2 rounded-md md:hidden">
        <ul className="flex justify-evenly">
          <li>
            <ProfileNavLink href="/profile/my_clubs">My Clubs</ProfileNavLink>
          </li>
          {/* Uncomment the following when needed */}
          {/* <li>
            <ProfileNavLink href="/profile/account">Account</ProfileNavLink>
          </li> */}
          <li>
            <ProfileNavLink href="/profile/settings">Settings</ProfileNavLink>
          </li>
        </ul>
      </nav>
      {/* Sidebar navigation on larger screens */}
      <aside className="hidden md:flex md:flex-[2]">
        <nav>
          <ul className="grid gap-3">
            <li>
              <ProfileNavLink href="/profile/my_clubs">My Clubs</ProfileNavLink>
            </li>
            {/* Uncomment the following when needed */}
            {/* <li>
              <ProfileNavLink href="/profile/account">Account</ProfileNavLink>
            </li> */}
            <li>
              <ProfileNavLink href="/profile/settings">Settings</ProfileNavLink>
            </li>
          </ul>
        </nav>
      </aside>
      {/* Main content */}
      <div className="bg-gray-100 flex-[8] p-4 rounded min-h-[300px]">
        {children}
      </div>
    </div>
  );
};

export default ProfileLayout;
