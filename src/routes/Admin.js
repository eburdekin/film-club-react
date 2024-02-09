import SideNavLink from "../components/SideNavLink";

const AdminLayout = ({ children }) => {
  return (
    <div className="flex flex-col md:flex-row gap-8">
      {/* Navigation as tabs on small screens */}
      <nav className="bg-gray-100 p-2 rounded-md md:hidden">
        <ul className="flex justify-evenly">
          <li>
            <SideNavLink href="/admin/user_dash">Users/Roles</SideNavLink>
          </li>
          <li>
            <SideNavLink href="/admin/club_dash">Clubs</SideNavLink>
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
          </ul>
        </nav>
      </aside>
      {/* Main content */}
      <div className="bg-gray-100 dark:bg-gray-300  flex-[8] p-4 rounded min-h-[300px]">
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;
