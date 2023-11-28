import { useQuery } from "@tanstack/react-query";
import { getSingleSurveyPreferences } from "../api/prefernceAPIs";

const usePreference = (_id) => {
  const {
    isLoading: loadingPreferences,
    isFetched: isPreferencesFetched,
    data: preferences,
    refetch: preferencesRefetch,
  } = useQuery({
    queryKey: ["getSingleSurveyPreferences"],
    queryFn: () => getSingleSurveyPreferences(_id),
  });
  return [
    preferences,
    loadingPreferences,
    isPreferencesFetched,
    preferencesRefetch,
  ];
};

export default usePreference;
