import useAuth from "./useAuth";
import { getRole } from "../api/usersAPIs";
import { useQuery } from "@tanstack/react-query";

const useUserRole = () => {
  const { user } = useAuth();

  const {
    isLoading,
    data: role,
    refetch,
  } = useQuery({
    queryKey: ["getUserRole"],
    queryFn: () => getRole(user?.email),
  });

  return [role, isLoading, refetch];
};

export default useUserRole;
