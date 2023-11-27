import { useQuery } from "@tanstack/react-query";
import { getUserBasedSurveyData } from "../../api/surveyAPIs";
import { Helmet } from "react-helmet-async";
import timeStampToDateConverter from "../../utilities/timeStampToDateConverter";
import useAuth from "../../hooks/useAuth";
import DashboardContainer from "../../components/dashboard/shared/DashboardContainer";
import Loading from "../../components/shared/Loading";

const DisplaySurveys = () => {
  const { user, loading } = useAuth();

  const {
    isLoading,
    isFetching,
    isError,
    data: surveys,
    error,
    refetch,
  } = useQuery({
    queryKey: ["getUserSurveyData"],
    queryFn: () => getUserBasedSurveyData(user?.email),
  });

  if (isLoading || loading || isFetching) {
    return <Loading />;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  if (surveys.length > 0) {
    return (
      <DashboardContainer>
        <Helmet>
          <title>PanaPoll | Dashboard | Surveys</title>
        </Helmet>

        <div className="mb-6">{/* <Title title={title}></Title> */}</div>

        <div className="w-[80%] overflow-y-auto h-[400px] rounded-lg">
          <table className="table table-zebra rounded-lg text-base text-center">
            {/* head */}
            <thead className="bg-[#323484] text-base text-white font-normal text-center">
              <tr>
                <th>Title</th>
                <th>Detail</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* row  */}

              {surveys.map((survey) => (
                <tr key={survey._id}>
                  <th className="text-[#ff5c11dc] text-left">{survey.title}</th>
                  <td>
                    <button
                      className="btn"
                      onClick={() =>
                        document.getElementById("my_modal_1").showModal()
                      }
                    >
                      Details
                    </button>
                    <dialog id="my_modal_1" className="modal">
                      <div className="modal-box text-left">
                        <h3 className="font-bold text-lg">{survey.title}</h3>
                        <p className="py-4 badge">{survey.category}</p>
                        <p className="py-4">{survey.description}</p>
                        <p className="py-4">
                          Created On:
                          {timeStampToDateConverter(parseInt(survey.timeStamp))}
                        </p>
                        <p className="py-4">Deadline: {survey.deadline}</p>
                        <div className="modal-action">
                          <form method="dialog">
                            <button className="btn">Close</button>
                          </form>
                        </div>
                      </div>
                    </dialog>
                  </td>
                  <td>{survey.status}</td>
                  <td className="flex justify-center gap-3">
                    <button className="btn">Update</button>
                    <button className="btn">Delete</button>
                    <button className="btn">Feed Back</button>
                    <button className="btn">Responses</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DashboardContainer>
    );
  } else {
    return (
      <div className="max-w-screen-xl mx-auto px-20">
        <div className="w-full h-screen flex flex-col justify-center items-center">
          <h1 className="text-6xl font-semibold">No Surveys Found</h1>
        </div>
      </div>
    );
  }
};

export default DisplaySurveys;
