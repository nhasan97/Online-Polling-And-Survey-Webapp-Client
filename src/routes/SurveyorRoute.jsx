import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import useUserRole from "../hooks/useUserRole";
import Loading from "../components/shared/Loading";

const SurveyorRoute = ({ children }) => {
  const [user, loading, role, roleLoading] = useUserRole();

  if (roleLoading || loading) {
    return <Loading />;
  }

  if (user && role === "surveyor") {
    return children;
  }

  return <Navigate to="/" state={{ from: location }} replace="true"></Navigate>;
};

SurveyorRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
export default SurveyorRoute;
