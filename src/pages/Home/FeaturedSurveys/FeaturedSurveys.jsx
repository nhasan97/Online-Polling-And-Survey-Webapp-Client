import { useEffect, useState } from "react";
import Container from "../../../components/shared/Container";
import Loading from "../../../components/shared/Loading";
import Title from "../../../components/shared/Title";
import useAllSurveys from "../../../hooks/useAllSurveys";
import FeaturedSurveyCard from "./FeaturedSurveyCard";

const FeaturedSurveys = () => {
  const title = {
    mainTitle: "Featured Surveys",
    subTitle: "",
  };

  let survey = [];
  const [featuredSurveys, setFeaturedSurveys] = useState([]);

  const [surveys, isLoading, , filteredSurveys] = useAllSurveys();

  if (!isLoading) {
    survey = filteredSurveys.slice(0, 6);
  }

  useEffect(() => {
    setFeaturedSurveys(survey);
  }, [surveys]);

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <Container>
      <div className="w-full flex flex-col justify-center items-center mt-20">
        <Title title={title}></Title>

        <div className="h-[70%] overflow-y-auto grid grid-cols-3 gap-6 my-5">
          {featuredSurveys.map((survey) => (
            <FeaturedSurveyCard
              key={survey._id}
              survey={survey}
              //   votes={votes}
            ></FeaturedSurveyCard>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default FeaturedSurveys;
