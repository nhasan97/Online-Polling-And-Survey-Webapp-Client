import useAuth from "./useAuth";
import { getRole } from "../api/usersAPIs";
import { useQuery } from "@tanstack/react-query";

const useUserRole = () => {
  const { user } = useAuth();

  const {
    isLoading: roleLoading,
    isFetched,
    data: role,
    refetch,
  } = useQuery({
    queryKey: ["getUserRole"],
    queryFn: () => getRole(user?.email),
  });

  return [role, roleLoading, isFetched, refetch];
};

export default useUserRole;
