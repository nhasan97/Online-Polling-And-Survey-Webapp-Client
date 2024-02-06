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

  //setting the title
  const title = {
    mainTitle: "Survey Responses",
    subTitle: "",
  };

  if (loadingResponses) {
    return <Loading></Loading>;
  }

  if (responses.length > 0) {
    return (
      <div className="h-screen">
        <DashboardContainer>
          <Helmet>
            <title>PanaPoll | Dashboard | Responses</title>
          </Helmet>

          <div className="w-full h-full flex flex-col justify-center items-center gap-3">
            <Title title={title}></Title>

            <div className="w-full h-[50%] flex flex-col sm:flex-row justify-center items-center gap-3">
              <div className="w-full sm:w-[50%] h-[50%] sm:h-full p-2 border rounded-xl">
                <ChartBar yes={yes.length} no={no.length}></ChartBar>
              </div>
              <div className="w-full sm:w-[50%] h-[50%] sm:h-full sm:p-2 border rounded-xl">
                <ChartPie yes={yes.length} no={no.length}></ChartPie>
              </div>
            </div>

            <div className="w-full h-[50%] overflow-y-auto rounded-lg border">
              <table className="w-full table table-zebra rounded-lg text-base text-center">
                {/* head */}
                <thead className=" bg-[#71357B] text-base text-white font-normal text-center">
                  <tr>
                    <th>Name</th>
                    {/* <th>Email</th> */}
                    <th>Time</th>
                    <th>Voted</th>
                  </tr>
                </thead>
                <tbody>
                  {/* row  */}
                  {responses.map((response) => (
                    <tr key={response._id}>
                      <th className="text-[#71357B]">{response.votersName}</th>
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
        </DashboardContainer>
      </div>
    );
  } else {
    return (
      <div className="h-screen">
        <DashboardContainer>
          <NoData text="No responses available"></NoData>
        </DashboardContainer>
      </div>
    );
  }
};

export default SurveyResponses;
