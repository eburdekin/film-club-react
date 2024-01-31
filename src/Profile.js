import ProfileNavLink from "./ProfileNavLink";

const ProfileLayout = ({ children }) => {
  return (
    <div className="flex gap-8">
      <aside className="flex-[2]">
        <nav>
          <ul className="grid gap-3">
            <li>
              <ProfileNavLink href="/profile/my_clubs">My Clubs</ProfileNavLink>
            </li>
            {/* <li>
              <ProfileNavLink href="/profile/account">Account</ProfileNavLink>
            </li> */}
            <li>
              <ProfileNavLink href="/profile/settings">Settings</ProfileNavLink>
            </li>
          </ul>
        </nav>
      </aside>
      <div className="bg-gray-100 flex-[8] p-4 rounded min-h-[300px]">
        {children}
      </div>
    </div>
  );
};

export default ProfileLayout;
