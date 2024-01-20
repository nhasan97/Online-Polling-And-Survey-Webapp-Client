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

  let filteredYes = [];
  let filteredNo = [];

  if (!loadingResponses) {
    filteredYes = responses.filter((response) => response.vote === "Yes");
    filteredNo = responses.filter((response) => response.vote === "No");
  }

  return [
    responses,
    loadingResponses,
    isFetched,
    refetch,
    filteredYes,
    filteredNo,
  ];
};

export default useResponse;
