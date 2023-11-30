import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import useUserRole from "../hooks/useUserRole";
import Loading from "../components/shared/Loading";

const SurveyorRoute = ({ children }) => {
  const [role, roleLoading] = useUserRole();

  if (roleLoading) {
    return <Loading />;
  }

  if (role === "surveyor") {
    return children;
  }

  return <Navigate to="/" state={{ from: location }} replace></Navigate>;
};

SurveyorRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
export default SurveyorRoute;
