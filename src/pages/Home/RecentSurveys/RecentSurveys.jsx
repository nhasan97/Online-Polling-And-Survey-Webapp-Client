import { useEffect, useState } from "react";
import useAllSurveys from "../../../hooks/useAllSurveys";
import Loading from "../../../components/shared/Loading";

const RecentSurveys = () => {
  const title = {
    mainTitle: "Recent Surveys",
    subTitle: "",
  };

  let survey = [];
  const [recentSurveys, setRecentSurveys] = useState([]);

  const [surveys, isLoading, , filteredSurveys] = useAllSurveys();

  if (!isLoading) {
    var sortedData = filteredSurveys.sort(function (a, b) {
      return new Date(b.timeStamp) - new Date(a.timeStamp);
    });
    survey = sortedData.slice(0, 6);
  }

  useEffect(() => {
    setRecentSurveys(survey);
  }, [surveys]);

  console.log(recentSurveys);

  if (isLoading) {
    return <Loading></Loading>;
  }
  return <div></div>;
};

export default RecentSurveys;
