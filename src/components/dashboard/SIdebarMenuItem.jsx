import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

const SIdebarMenuItem = ({ icon, menuText, route }) => {
  return (
    <div className="flex justify-center items-center gap-1 p-2 text-lg hover:text-[#71357B] transition duration-150">
      {icon}
      <NavLink to={route}>{menuText}</NavLink>
    </div>
  );
};

SIdebarMenuItem.propTypes = {
  icon: PropTypes.node.isRequired,
  menuText: PropTypes.string.isRequired,
  route: PropTypes.string.isRequired,
};
export default SIdebarMenuItem;
