import useAuth from "./useAuth";
import { getRole } from "../api/usersAPIs";
import { useQuery } from "@tanstack/react-query";

const useUserRole = () => {
  const { user } = useAuth();

  const {
    isLoading: roleLoading,
    isFetched,
    data: role,
    refetch: refetchRole,
  } = useQuery({
    queryKey: ["getUserRole"],
    queryFn: async () => await getRole(user?.email),
  });

  return [role, roleLoading, isFetched, refetchRole];
};

export default useUserRole;
