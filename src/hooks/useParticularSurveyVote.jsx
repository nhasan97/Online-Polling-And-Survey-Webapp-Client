import { useQuery } from "@tanstack/react-query";
import { getParticularSurveyVotes } from "../api/responseAPIs";

const useParticularSurveyVote = (_id) => {
  const {
    isLoading: loadingVote,
    data: votes,
    refetch: voteRefetch,
  } = useQuery({
    queryKey: ["getParticularVotes"],
    queryFn: () => getParticularSurveyVotes(_id),
  });

  return [votes, loadingVote, voteRefetch];
};

export default useParticularSurveyVote;
