import { useParams } from "react-router-dom";
import useComments from "../../hooks/useComments";
import Loading from "../../components/shared/Loading";

const SurveyComments = () => {
  //setting the title
  const title = {
    mainTitle: "Survey Comments",
    subTitle: "",
  };

  const _id = useParams();

  const [loadingComments, fetchedComments] = useComments(_id);

  if (loadingComments) {
    return <Loading></Loading>;
  }
  console.log(fetchedComments);
  return <div></div>;
};

export default SurveyComments;
