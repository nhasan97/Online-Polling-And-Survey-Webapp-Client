import { Outlet } from "react-router-dom";
import Sidebar from "../components/dashboard/Sidebar";

const DashboardLayout = () => {
  return (
    <div className="relative flex flex-col lg:flex-row">
      <Sidebar></Sidebar>
      <div className="flex-1 lg:ml-64">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default DashboardLayout;
