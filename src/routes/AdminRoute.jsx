import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import useUserRole from "../hooks/useUserRole";
import Loading from "../components/shared/Loading";

const AdminRoute = ({ children }) => {
  const [user, loading, role, roleLoading] = useUserRole();

  if (roleLoading || loading) {
    return <Loading />;
  }

  if (user && role === "admin") {
    return children;
  }

  return <Navigate to="/" state={{ from: location }} replace></Navigate>;
};

AdminRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
export default AdminRoute;
