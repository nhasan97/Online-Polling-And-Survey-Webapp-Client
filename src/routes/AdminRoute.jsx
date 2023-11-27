import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import useUserRole from "../hooks/useUserRole";
import Loading from "../components/shared/Loading";

const AdminRoute = ({ children }) => {
  const [role, loading] = useUserRole();

  if (loading) {
    return <Loading />;
  }

  if (role === "admin") {
    return children;
  }

  return <Navigate to="/" state={{ from: location }} replace></Navigate>;
};

AdminRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
export default AdminRoute;
