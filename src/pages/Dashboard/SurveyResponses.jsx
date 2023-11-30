import { Helmet } from "react-helmet-async";
import DashboardContainer from "../../components/dashboard/shared/DashboardContainer";
import NoData from "../../components/shared/NoData";
import Title from "../../components/shared/Title";
import { useParams } from "react-router-dom";
import useResponse from "../../hooks/useResponse";
import ChartBar from "../../components/shared/ChartBar";
import Loading from "../../components/shared/Loading";
import useParticularSurveyVote from "../../hooks/useParticularSurveyVote";

const SurveyResponses = () => {
  const surveyId = useParams();

  const [responses, loadingResponses, isFetched, refetch] =
    useResponse(surveyId);

  const [votes, loadingVote, voteRefetch] = useParticularSurveyVote(surveyId);
  console.log(votes);

  //setting the title
  const title = {
    mainTitle: "Your Surveys",
    subTitle: "",
  };

  const text = "jlrkjgrlk";

  if (loadingResponses || loadingVote) {
    return <Loading></Loading>;
  }

  if (responses.length > 0) {
    return (
      <DashboardContainer>
        <Helmet>
          <title>PanaPoll | Dashboard | Responses</title>
        </Helmet>

        {/* <Title title={title}></Title> */}
        <div className="flex justify-center items-center gap-6">
          <div className="flex-1 overflow-y-auto h-[400px] rounded-lg">
            <table className="w-full table table-zebra rounded-lg text-base text-center">
              {/* head */}
              <thead className=" bg-[#71357B] text-base text-white font-normal text-center">
                <tr>
                  <th>Participants Name</th>
                  <th>Email</th>
                  <th>Time</th>
                  <th>Voted</th>
                </tr>
              </thead>
              <tbody>
                {/* row  */}
                {responses.map((response) => (
                  <tr key={response._id}>
                    <th className="text-[#71357B] text-left">
                      {response.votersName}
                    </th>
                    <td>{response.votersEmail}</td>
                    <td>{response.timeStamp}</td>
                    <td
                      className={`font-bold ${
                        response.vote === "Yes"
                          ? "text-emerald-600"
                          : "text-red-600"
                      }`}
                    >
                      {response.vote}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div>
            <div>
              <ChartBar id={surveyId}></ChartBar>
            </div>
            <div>pie</div>
          </div>
        </div>
      </DashboardContainer>
    );
  } else {
    <NoData text={text}></NoData>;
  }
};

export default SurveyResponses;
