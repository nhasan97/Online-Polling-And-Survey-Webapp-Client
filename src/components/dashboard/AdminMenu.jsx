import { GoHomeFill } from "react-icons/go";
import SIdebarMenuItem from "./SIdebarMenuItem";

const AdminMenu = () => {
  return (
    <div className="flex flex-col justify-center items-start mx-auto">
      <SIdebarMenuItem
        icon={<GoHomeFill></GoHomeFill>}
        menuText="Back to Site"
        route="/"
      ></SIdebarMenuItem>
    </div>
  );
};

export default AdminMenu;
