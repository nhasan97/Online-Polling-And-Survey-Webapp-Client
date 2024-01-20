import { Helmet } from "react-helmet-async";
import Container from "../../components/shared/Container";
import Loading from "../../components/shared/Loading";
import Title from "../../components/shared/Title";
import useAllSurveys from "../../hooks/useAllSurveys";
import SurveyCard from "./SurveyCard";
import { useQuery } from "@tanstack/react-query";
import { getTotalVotes } from "../../api/responseAPIs";

const Surveys = () => {
  const title = {
    mainTitle: "Surveys",
    subTitle: "Surveys that have taken place so far",
  };
  const [, isLoading, , filteredSurveys] = useAllSurveys();

  const { isLoading: loadingVote, data: votes } = useQuery({
    queryKey: ["getVotes"],
    queryFn: getTotalVotes,
  });

  if (isLoading || loadingVote) {
    return <Loading></Loading>;
  }

  return (
    <Container>
      <Helmet>
        <title>PanaPoll | Surveys</title>
      </Helmet>
      <div className="h-screen pt-16 pb-5">
        <Title title={title}></Title>

        <div className="h-[70%] overflow-y-auto grid grid-cols-3 gap-6 my-5">
          {filteredSurveys.map((survey) => (
            <SurveyCard
              key={survey._id}
              survey={survey}
              votes={votes}
            ></SurveyCard>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default Surveys;
