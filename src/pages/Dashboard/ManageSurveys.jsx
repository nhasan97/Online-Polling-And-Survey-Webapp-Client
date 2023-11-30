import { Link } from "react-router-dom";
import useAllSurveys from "../../hooks/useAllSurveys";
import usePerformMutation from "../../hooks/usePerformMutation";
import timeStampToDateConverter from "../../utilities/timeStampToDateConverter";
import NoData from "../../components/shared/NoData";
import Loading from "../../components/shared/Loading";
import DashboardContainer from "../../components/dashboard/shared/DashboardContainer";
import { Helmet } from "react-helmet-async";
import Title from "../../components/shared/Title";
import { updateSurveyStatus } from "../../api/surveyAPIs";
import useAuth from "../../hooks/useAuth";
import useUserRole from "../../hooks/useUserRole";

const ManageSurveys = () => {
  const { user, loading } = useAuth();

  const [role, roleLoading, isFetched] = useUserRole();

  const status = ["Published", "Unpublished"];

  //setting the title
  const title = {
    mainTitle: "Surveys",
    subTitle: "",
  };

  //fetching all survey data
  const [surveys, isLoading, refetch] = useAllSurveys();

  //performing mutation for updating survey status
  const mutation = usePerformMutation(
    "updateSurvey",
    updateSurveyStatus,
    "Updated successfully!"
  );

  //update button handler
  const handleUpdateSurveyStatus = (e) => {
    e.preventDefault();

    const form = e.target;
    const _id = form._id.value || "Not Found";
    const status = form.status.value || "Not Found";

    const updatedSurvey = {
      status,
    };

    mutation.mutate({ _id, updatedSurvey });
    refetch();
    form.reset();
  };

  const handleFEdd = (e) => {
    console.log(e.target.value);
    return <></>;
  };

  if (isLoading || loading) {
    return <Loading />;
  }

  if (surveys.length > 0) {
    return (
      <DashboardContainer>
        <Helmet>
          <title>PanaPoll | Dashboard | Manage Surveys</title>
        </Helmet>

        <Title title={title}></Title>

        <div className="w-[90%] overflow-y-auto h-[400px] rounded-lg">
          <table className="w-full table table-zebra rounded-lg text-base text-center">
            {/* head */}
            <thead className=" bg-[#71357B] text-base text-white font-normal text-center">
              <tr>
                <th>Title</th>
                <th>Details</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* row  */}
              {surveys.map((survey) => (
                <tr key={survey._id}>
                  <th className="text-[#71357B] text-left">{survey.title}</th>

                  <td>
                    <button
                      className="btn btn-circle hover:bg-[#71357B] group"
                      onClick={() =>
                        document.getElementById(survey._id).showModal()
                      }
                    >
                      <i className="fa-solid fa-circle-info group-hover:text-white"></i>
                    </button>

                    <dialog id={survey._id} className="modal">
                      <div className="modal-box text-left">
                        <h3 className="font-bold text-lg">{survey.title}</h3>
                        <p className="py-4 badge">{survey.category}</p>
                        <p className="py-4">{survey.description}</p>
                        <p className="py-4">
                          Created On:
                          {timeStampToDateConverter(survey.timeStamp)}
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

                  <td>
                    <button
                      className="btn hover:bg-emerald-500 hover:text-white"
                      onClick={() =>
                        document.getElementById("u" + survey._id).showModal()
                      }
                    >
                      {survey.status}
                    </button>

                    <dialog id={"u" + survey._id} className="modal">
                      <div className="modal-box">
                        <form method="dialog">
                          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                            ✕
                          </button>
                        </form>
                        <div className="p-5">
                          <form
                            className="w-full flex flex-col gap-4 text-left"
                            onSubmit={handleUpdateSurveyStatus}
                          >
                            <input
                              type="text"
                              name="_id"
                              required
                              hidden
                              defaultValue={survey._id}
                            />

                            <input
                              type="text"
                              name="userName"
                              required
                              hidden
                              defaultValue={user.displayName}
                            />

                            <input
                              type="text"
                              name="role"
                              required
                              hidden
                              defaultValue={role}
                            />

                            <input
                              type="text"
                              name="userPhoto"
                              required
                              hidden
                              defaultValue={user.photoURL}
                            />

                            <div className="relative">
                              <div className="h-[48px] w-[48px] flex justify-center items-center absolute top-0 left-0 bg-[#95D0D4] rounded-lg">
                                <i className="fa-solid fa-envelope text-xl text-white"></i>
                              </div>
                              <select
                                type="text"
                                name="status"
                                placeholder="Status"
                                required
                                className="input bg-[#a1dada41] w-full pl-16 rounded-lg border focus:border-[#7DDDD9] focus:outline-none"
                                onChange={handleFEdd}
                              >
                                {status.map((stat) => (
                                  <option key={stat}>{stat}</option>
                                ))}
                              </select>
                            </div>

                            <div className="relative">
                              <div className="h-[48px] w-[48px] flex justify-center items-center absolute top-0 left-0 bg-[#7DDDD9] rounded-lg">
                                <i className="fa-solid fa-envelope text-xl text-white"></i>
                              </div>
                              <input
                                type="text"
                                name="feedback"
                                placeholder="Reason of unpublish"
                                required
                                defaultValue={survey.title}
                                className="input bg-[#a1dada41] w-full pl-16 rounded-lg border focus:border-[#7DDDD9] focus:outline-none"
                              />
                            </div>

                            <input
                              type="submit"
                              value="Update"
                              className="btn w-1/2 mx-auto bg-[#FE7E51] text-lg font-medium text-white hover:text-[#FE7E51] normal-case rounded-lg"
                            />
                          </form>
                        </div>
                      </div>
                    </dialog>
                  </td>

                  <td className="flex justify-center gap-3">
                    <button className="btn hover:bg-[#FE7E51] group">
                      <i className="fa-solid fa-comment group-hover:text-white"></i>
                    </button>

                    <Link
                      to={`/dashboard/survey-response/${survey._id}`}
                      className="btn group hover:bg-[#101322] hover:text-white"
                    >
                      Responses
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DashboardContainer>
    );
  } else {
    <NoData text={"No Survey Found"}></NoData>;
  }
};

export default ManageSurveys;
