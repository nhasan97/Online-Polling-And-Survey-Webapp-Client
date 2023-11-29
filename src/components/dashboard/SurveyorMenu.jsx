import SIdebarMenuItem from "./SIdebarMenuItem";

const SurveyorMenu = () => {
  return (
    <div className="flex flex-col justify-center items-start mx-auto">
      <SIdebarMenuItem
        icon={<i className="fa-solid fa-square-poll-vertical"></i>}
        menuText="Surveys"
        route="/dashboard"
      ></SIdebarMenuItem>

      <SIdebarMenuItem
        icon={<i className="fa-solid fa-circle-plus"></i>}
        menuText="Create Survey"
        route="/dashboard/create-survey"
      ></SIdebarMenuItem>

      <SIdebarMenuItem
        icon={<i className="fa-solid fa-arrow-left"></i>}
        menuText="Back to Site"
        route="/"
      ></SIdebarMenuItem>
    </div>
  );
};

export default SurveyorMenu;
