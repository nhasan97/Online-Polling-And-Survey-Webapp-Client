import { useQuery } from "@tanstack/react-query";
import { getSingleSurveyResponses } from "../api/responseAPIs";

const useResponse = (_id) => {
  const {
    isLoading: loadingResponses,
    isFetched,
    data: responses,
    refetch,
  } = useQuery({
    queryKey: ["getSingleSurveyResponses"],
    queryFn: () => getSingleSurveyResponses(_id),
  });
  return [responses, loadingResponses, isFetched, refetch];
};

export default useResponse;
