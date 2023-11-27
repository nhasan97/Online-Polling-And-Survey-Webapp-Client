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
  return [surveys, isLoading, refetch];
};

export default useAllSurveys;
