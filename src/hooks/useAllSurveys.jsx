import { useQuery } from "@tanstack/react-query";
import { getSurveyData } from "../api/surveyAPIs";

const useAllSurveys = () => {
  const {
    isLoading,
    data: surveys,
    refetch,
  } = useQuery({
    queryKey: ["getSurveyData"],
    queryFn: getSurveyData,
  });

  let filteredSurveys = [];

  if (!isLoading) {
    filteredSurveys = surveys.filter((survey) => survey.status === "published");
  }

  return [surveys, isLoading, refetch, filteredSurveys];
};

export default useAllSurveys;
