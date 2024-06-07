import SideNavLink from "../components/UI/SideNavLink";
import H2 from "../components/UI/H2";

const ProfileLayout = ({ children }) => {
  return (
    <>
      <H2>My profile</H2>
      <div className="flex flex-col md:flex-row gap-8">
        <nav className="bg-gray-100 dark:bg-gray-900 p-2 rounded-md md:hidden">
          <ul className="flex justify-evenly">
            <li>
              <SideNavLink href="/profile/dashboard">Dashboard</SideNavLink>
            </li>

            <li>
              <SideNavLink href="/profile/settings">Settings</SideNavLink>
            </li>
          </ul>
        </nav>
        <aside className="hidden md:flex md:flex-[2]">
          <nav>
            <ul className="grid gap-3">
              <li>
                <SideNavLink href="/profile/dashboard">Dashboard</SideNavLink>
              </li>
              <li>
                <SideNavLink href="/profile/settings">Settings</SideNavLink>
              </li>
            </ul>
          </nav>
        </aside>
        <div className="bg-gray-100 dark:bg-gray-900 flex-[8] p-4 rounded min-h-[300px]">
          {children}
        </div>
      </div>
    </>
  );
};

export default ProfileLayout;
