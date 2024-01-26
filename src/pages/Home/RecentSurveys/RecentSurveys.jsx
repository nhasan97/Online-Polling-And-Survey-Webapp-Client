import { useEffect, useState } from "react";
import useAllSurveys from "../../../hooks/useAllSurveys";
import Loading from "../../../components/shared/Loading";

import Title from "../../../components/shared/Title";
import RecentSurveyCard from "./RecentSurveyCard";
import Container from "../../../components/shared/Container";

const RecentSurveys = () => {
  const title = {
    mainTitle: "Recent Surveys",
    subTitle: "Surveys that have taken place recently",
  };

  let survey = [];
  const [recentSurveys, setRecentSurveys] = useState([]);

  const [surveys, isLoading, , filteredSurveys] = useAllSurveys();

  if (!isLoading) {
    var sortedData = filteredSurveys.sort(function (a, b) {
      return new Date(b.timeStamp) - new Date(a.timeStamp);
    });
    survey = sortedData.slice(0, 8);
  }

  useEffect(() => {
    setRecentSurveys(survey);
  }, [surveys]);

  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <Container>
      <div className="w-full flex flex-col justify-center items-center mt-28">
        <Title title={title}></Title>

        <div className="h-[70%] overflow-y-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 my-8">
          {recentSurveys.map((survey) => (
            <RecentSurveyCard
              key={survey._id}
              survey={survey}
              //   votes={votes}
            ></RecentSurveyCard>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default RecentSurveys;
