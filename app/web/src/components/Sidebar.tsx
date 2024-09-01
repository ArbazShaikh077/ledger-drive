const Sidebar = () => {
    return (
        <aside
            id="logo-sidebar"
            className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full  border-r-2 border-secondary sm:translate-x-0 "
            aria-label="Sidebar">
            <div className="h-full px-3 pb-4 overflow-y-auto ">
                <ul className="space-y-2 font-medium">
                    <li>
                        <a
                            // href="#"
                            className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-secondary dark:hover:bg-secondary group"
                        >
                            <span className="ms-3">Home</span>
                        </a>
                    </li>
                    <li>
                        <a
                            // href="#"
                            className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-secondary dark:hover:bg-secondary group">
                            <span className="ms-3">My Drive</span>
                        </a>
                    </li>
                    <li>
                        <a
                            // href="#"
                            className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-secondary dark:hover:bg-secondary group"
                        >
                            <span className="ms-3">Shared with me</span>
                        </a>
                    </li>
                </ul>
            </div>
        </aside>
    );
};

export default Sidebar;