import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="w-60 h-screen overflow-y-auto flex-shrink-0 border-r">
      <div className="flex items-center p-4 h-16 border-b">
        <h1 className="text-2xl font-semibold ">Ledger Drive</h1>
      </div>
      <nav className="p-4">
        <ul className="space-y-2">
          <li>
            <Link
              to={"/dashboard/"}
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-secondary dark:hover:bg-secondary group"
            >
              <span className="ms-3">Home</span>
            </Link>
          </li>
          <li>
            <Link
              to={"/dashboard/my-drive"}
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-secondary dark:hover:bg-secondary group"
            >
              <span className="ms-3">My Drive</span>
            </Link>
          </li>
          <li>
            <Link
              to={"/dashboard/shared-with-me"}
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-secondary dark:hover:bg-secondary group"
            >
              <span className="ms-3">Shared with me</span>
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
