import { Suspense } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div>
        <Sidebar />
        <div className="flex h-screen flex-col">
          <Navbar />
          <Outlet />
        </div>
      </div>
    </Suspense>
  );
}

export default Layout;
