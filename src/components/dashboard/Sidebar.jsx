import useAuth from "../../hooks/useAuth";
import { showAlertOnError } from "../../utilities/displaySweetAlert";
import MainLogo from "../shared/mainLogo";

import { GoHomeFill } from "react-icons/go";
import SIdebarMenuItem from "./SIdebarMenuItem";
import { useState } from "react";

const Sidebar = () => {
  const { user, logoutUser } = useAuth();
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
        className="flex justify-end items-center p-10 md:hidden"
        onClick={() => setOpenSidebar(!openSidebar)}
      >
        open
      </div>

      <div
        className={`min-h-screen w-64 bg-[#f1f1f1] rounded-r-[36px] absolute md:fixed md:translate-x-0 ${
          openSidebar
            ? `translate-x-0 transition duration-300 ease-in-out`
            : `-translate-x-full transition duration-300 ease-in-out`
        }`}
      >
        <div className="w-full flex justify-center items-center py-5">
          <MainLogo></MainLogo>
        </div>

        <div className="w-full flex flex-col justify-center items-center gap-3 py-5">
          <div className="avatar">
            <div className="w-24 mask mask-hexagon">
              <img src={user?.photoURL} />
            </div>
          </div>
          <h1 className="normal-case text-2xl text-[#646cff]">
            {user?.displayName}
          </h1>
          <p className="normal-case text-lg text-[#a5a5a5]">{user?.email}</p>
        </div>

        <div className="text-[#a5a5a5] py-5">
          <SIdebarMenuItem
            icon={<GoHomeFill></GoHomeFill>}
            menuText="Home"
            route="/"
          ></SIdebarMenuItem>

          <SIdebarMenuItem
            icon={<GoHomeFill></GoHomeFill>}
            menuText="Logout"
            route="/"
          ></SIdebarMenuItem>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
