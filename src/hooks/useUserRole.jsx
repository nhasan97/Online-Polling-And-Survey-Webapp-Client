import useAuth from "./useAuth";
import { getRole } from "../api/usersAPIs";
import { useQuery } from "@tanstack/react-query";

const useUserRole = () => {
  const { user, loading } = useAuth();

  const {
    isLoading: roleLoading,
    isFetched: roleFetched,
    data: role,
    refetch: refetchRole,
  } = useQuery({
    queryKey: ["getUserRole"],
    queryFn: async () => await getRole(user?.email),
  });

  return [user, loading, role, roleLoading, roleFetched, refetchRole];
};

export default useUserRole;
