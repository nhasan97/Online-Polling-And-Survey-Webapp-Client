import { Outlet } from "react-router-dom";
import Sidebar from "../components/dashboard/Sidebar";

const DashboardLayout = () => {
  return (
    <div className="min-h-screen relative flex flex-col md:flex-row">
      <Sidebar></Sidebar>
      <div className="flex-1 min-h-screen md:ml-64 p-5">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default DashboardLayout;
