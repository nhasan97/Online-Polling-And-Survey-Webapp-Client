import PropTypes from "prop-types";

const DashboardContainer = ({ children }) => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center p-5 md:p-10">
      {children}
    </div>
  );
};

DashboardContainer.propTypes = {
  children: PropTypes.node.isRequired,
};
export default DashboardContainer;
