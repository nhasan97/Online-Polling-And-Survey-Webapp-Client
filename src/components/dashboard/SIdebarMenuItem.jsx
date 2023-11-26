import { NavLink } from "react-router-dom";

const SIdebarMenuItem = ({ icon, menuText, route }) => {
  return (
    <div className="flex justify-center items-center gap-1 p-2 text-lg hover:text-[#646cff] transition duration-150">
      {icon}
      <NavLink to={route}>{menuText}</NavLink>
    </div>
  );
};

export default SIdebarMenuItem;
