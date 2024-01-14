import { useQuery } from "@tanstack/react-query";
import { getSingleSurveyComments } from "../api/commentAPIs";

const useComments = (_id) => {
  const {
    isLoading: loadingComments,
    data: fetchedComments,
    refetch: refetchComments,
  } = useQuery({
    queryKey: ["getSingleSurveyComments"],
    queryFn: () => getSingleSurveyComments(_id),
  });

  return [loadingComments, fetchedComments, refetchComments];
};

export default useComments;
