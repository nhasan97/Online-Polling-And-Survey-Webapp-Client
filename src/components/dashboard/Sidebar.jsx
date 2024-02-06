import useAuth from "../../hooks/useAuth";
import { showAlertOnError } from "../../utilities/displaySweetAlert";
import MainLogo from "../shared/mainLogo";
import { useState } from "react";
import SurveyorMenu from "./SurveyorMenu";
import useUserRole from "../../hooks/useUserRole";
import AdminMenu from "./AdminMenu";
import { HiMenuAlt3 } from "react-icons/hi";

const Sidebar = () => {
  const { user, logoutUser } = useAuth();
  const [, , role, ,] = useUserRole();
  const [openSidebar, setOpenSidebar] = useState(false);

  const handleLogout = () => {
    logoutUser()
      .then()
      .catch((err) => {
        showAlertOnError(err.message);
      });
  };

  return (
    <div>
      <div
        className="flex justify-end items-center p-5 md:hidden"
        onClick={() => setOpenSidebar(!openSidebar)}
      >
        <HiMenuAlt3 className="text-2xl text-[#101322]" />
      </div>
      {/* bg-[#F2F2F2] */}
      <div
        className={`w-64 min-h-screen bg-[url(../public/sidebarBg.png)] bg-no-repeat bg-center bg-cover rounded-r-[36px] absolute md:fixed z-10 md:translate-x-0 ${
          openSidebar
            ? `translate-x-0 transition duration-300 ease-in-out`
            : `-translate-x-full transition duration-300 ease-in-out`
        }`}
      >
        <div className="w-full py-6">
          <MainLogo caller={"d"}></MainLogo>
        </div>

        <div className="w-full flex flex-col justify-center items-center gap-3 ">
          <div className="avatar">
            <div className="w-16 sm:w-20 mask mask-hexagon">
              <img src={user?.photoURL} />
            </div>
          </div>
          <h1 className="normal-case text-xl sm:text-2xl text-[#71357B] font-medium">
            {user?.displayName}
          </h1>
          <p className="normal-case text-base sm:text-lg text-[#a5a5a5]">
            {user?.email}
          </p>
        </div>

        <div className="flex flex-col justify items-start text-[#a5a5a5] p-6">
          {role === "admin" && <AdminMenu></AdminMenu>}
          {role === "surveyor" && <SurveyorMenu></SurveyorMenu>}
          <button
            className="btn w-full text-[#71357B] text-base sm:text-lg mt-5"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
