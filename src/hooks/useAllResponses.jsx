import { useQuery } from "@tanstack/react-query";
import { getAllResponses } from "../api/surveyAPIs";

const useAllResponses = () => {
  const {
    isLoading,
    data: responses,
    refetch,
  } = useQuery({
    queryKey: ["getAllResponses"],
    queryFn: getAllResponses,
  });
  return [responses, isLoading, refetch];
};

export default useAllResponses;
