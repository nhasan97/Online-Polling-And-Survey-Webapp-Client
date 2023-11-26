import { GoHomeFill } from "react-icons/go";
import SIdebarMenuItem from "./SIdebarMenuItem";

const AdminMenu = () => {
  return (
    <>
      <SIdebarMenuItem
        icon={<GoHomeFill></GoHomeFill>}
        menuText="Back to Site"
        route="/"
      ></SIdebarMenuItem>
    </>
  );
};

export default AdminMenu;
