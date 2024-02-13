import SideNavLink from "../components/UI/SideNavLink";
import H2 from "../components/UI/H2";

const AdminLayout = ({ children }) => {
  return (
    <>
      <H2>Admin</H2>
      <div className="flex flex-col md:flex-row gap-8">
        {/* Navigation as tabs on small screens */}

        <nav className="bg-gray-700 p-2 rounded-md md:hidden">
          <ul className="flex justify-evenly">
            <li>
              <SideNavLink href="/admin/user_dash">Users/Roles</SideNavLink>
            </li>
            <li>
              <SideNavLink href="/admin/club_dash">Clubs</SideNavLink>
            </li>
            <li>
              <SideNavLink href="/admin/room_dash">Screening Rooms</SideNavLink>
            </li>
          </ul>
        </nav>
        {/* Sidebar navigation on larger screens */}
        <aside className="hidden md:flex md:flex-[2]">
          <nav>
            <ul className="grid gap-3">
              <li>
                <SideNavLink href="/admin/user_dash">Users/Roles</SideNavLink>
              </li>
              <li>
                <SideNavLink href="/admin/club_dash">Clubs</SideNavLink>
              </li>
              <li>
                <SideNavLink href="/admin/room_dash">
                  Screening Rooms
                </SideNavLink>
              </li>
            </ul>
          </nav>
        </aside>
        {/* Main content */}
        <div className="bg-gray-100 dark:bg-gray-800 flex-[8] p-4 rounded min-h-[300px]">
          {children}
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
