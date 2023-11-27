import { GoHomeFill } from "react-icons/go";
import SIdebarMenuItem from "./SIdebarMenuItem";

const SurveyorMenu = () => {
  return (
    <>
      <SIdebarMenuItem
        icon={<GoHomeFill></GoHomeFill>}
        menuText="Surveys"
        route="/dashboard/display-surveys"
      ></SIdebarMenuItem>

      <SIdebarMenuItem
        icon={<GoHomeFill></GoHomeFill>}
        menuText="Create Survey"
        route="/dashboard/create-survey"
      ></SIdebarMenuItem>

      <SIdebarMenuItem
        icon={<GoHomeFill></GoHomeFill>}
        menuText="Back to Site"
        route="/"
      ></SIdebarMenuItem>
    </>
  );
};

export default SurveyorMenu;
