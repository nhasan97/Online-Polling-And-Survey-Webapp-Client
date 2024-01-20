import { Helmet } from "react-helmet-async";
import DashboardContainer from "../../components/dashboard/shared/DashboardContainer";
import NoData from "../../components/shared/NoData";
import { useParams } from "react-router-dom";
import useResponse from "../../hooks/useResponse";
import ChartBar from "../../components/shared/ChartBar";
import Loading from "../../components/shared/Loading";
import Title from "../../components/shared/Title";
import timeStampToDateConverter from "../../utilities/timeStampToDateConverter";
import { useEffect, useState } from "react";
import ChartPie from "../../components/shared/ChartPie";

const SurveyResponses = () => {
  const [yes, setYes] = useState([]);
  const [no, setNo] = useState([]);

  const surveyId = useParams();

  const [responses, loadingResponses, , , filteredYes, filteredNo] =
    useResponse(surveyId);

  useEffect(() => {
    setYes(filteredYes);
    setNo(filteredNo);
  }, [responses]);

  console.log(yes, no);
  //setting the title
  const title = {
    mainTitle: "Survey Responses",
    subTitle: "",
  };

  const text = "No responses available";

  if (loadingResponses) {
    return <Loading></Loading>;
  }

  if (responses.length > 0) {
    return (
      <DashboardContainer>
        <Helmet>
          <title>PanaPoll | Dashboard | Responses</title>
        </Helmet>

        <Title title={title}></Title>
        <div className="w-full flex h-screen justify-center items-center gap-6">
          <div className="w-[50%] h-full border-2 rounded-xl">
            <div className="overflow-y-auto rounded-lg">
              <table className="w-full table table-zebra rounded-lg text-base text-center">
                {/* head */}
                <thead className=" bg-[#71357B] text-base text-white font-normal text-center">
                  <tr>
                    <th>Participants Name</th>
                    {/* <th>Email</th> */}
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
                      {/* <td>{response.votersEmail}</td> */}
                      <td>{timeStampToDateConverter(response.timeStamp)}</td>
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
          </div>

          <div className="w-[50%] h-full flex flex-col justify-center items-center gap-6">
            <div className="w-full h-[50%] p-2 border-2 rounded-xl">
              <ChartBar yes={yes.length} no={no.length}></ChartBar>
            </div>
            <div className="w-full h-[50%] p-2 border-2 rounded-xl">
              <ChartPie yes={yes.length} no={no.length}></ChartPie>
            </div>
          </div>
        </div>
      </DashboardContainer>
    );
  } else {
    <NoData text={text}></NoData>;
  }
};

export default SurveyResponses;
