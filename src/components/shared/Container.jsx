import PropTypes from "prop-types";

const Container = ({ children }) => {
  return <div className="max-w-screen-2xl mx-auto px-10">{children}</div>;
};

Container.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Container;
