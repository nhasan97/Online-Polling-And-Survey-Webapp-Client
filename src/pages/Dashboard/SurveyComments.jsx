import { useParams } from "react-router-dom";
import useComments from "../../hooks/useComments";
import Loading from "../../components/shared/Loading";
import { Helmet } from "react-helmet-async";
import Title from "../../components/shared/Title";
import CommentCard from "../SurveyDetails/commentCard";
import NoData from "../../components/shared/NoData";
import DashboardContainer from "../../components/dashboard/shared/DashboardContainer";

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

  if (fetchedComments.length > 0) {
    return (
      <DashboardContainer>
        <Helmet>
          <title>PanaPoll | Survey Comments</title>
        </Helmet>

        <div className="h-screen pt-16 pb-5">
          <Title title={title}></Title>
          <div className="w-full h-[80%] flex flex-col justify-start items-center gap-6 p-6 overflow-y-auto border rounded-xl">
            {fetchedComments.map((coment) => (
              <CommentCard key={coment._id} coment={coment}></CommentCard>
            ))}
          </div>
        </div>
      </DashboardContainer>
    );
  } else {
    return (
      <DashboardContainer>
        <NoData text="No Comments"></NoData>
      </DashboardContainer>
    );
  }
};

export default SurveyComments;
