import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import useUserRole from "../hooks/useUserRole";
import Loading from "../components/shared/Loading";

const AdminSurveyorRoute = ({ children }) => {
  const [user, loading, role, roleLoading] = useUserRole();

  if (roleLoading || loading) {
    return <Loading />;
  }

  if (user && (role === "admin" || role === "surveyor")) {
    return children;
  }

  return <Navigate to="/" state={{ from: location }} replace></Navigate>;
};

AdminSurveyorRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AdminSurveyorRoute;
