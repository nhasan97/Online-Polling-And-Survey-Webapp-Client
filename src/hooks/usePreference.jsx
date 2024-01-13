import { useQuery } from "@tanstack/react-query";
import { getSingleSurveyPreferences } from "../api/prefernceAPIs";

const usePreference = (_id) => {
  const {
    isLoading: loadingPreferences,
    data: preferences,
    refetch: preferencesRefetch,
  } = useQuery({
    queryKey: ["getSingleSurveyPreferences"],
    queryFn: () => getSingleSurveyPreferences(_id),
  });

  let filteredLikes = [];
  let filteredDislikes = [];

  if (!loadingPreferences) {
    filteredLikes = preferences.filter(
      (preference) => preference.action === "like"
    );
    filteredDislikes = preferences.filter(
      (preference) => preference.action === "dislike"
    );
  }
  return [
    preferences,
    loadingPreferences,
    preferencesRefetch,
    filteredLikes,
    filteredDislikes,
  ];
};

export default usePreference;
