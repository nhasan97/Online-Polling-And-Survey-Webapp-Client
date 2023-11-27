import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getUserBasedSurveyData, updateSurveyData } from "../../api/surveyAPIs";
import { Helmet } from "react-helmet-async";
import timeStampToDateConverter from "../../utilities/timeStampToDateConverter";
import useAuth from "../../hooks/useAuth";
import DashboardContainer from "../../components/dashboard/shared/DashboardContainer";
import Loading from "../../components/shared/Loading";
import useCurrentDate from "../../hooks/useCurrentDate";
import dateComparer from "../../utilities/dateComparer";
import {
  showAlertOnError,
  showAlertOnSuccess,
} from "../../utilities/displaySweetAlert";

const DisplaySurveys = () => {
  const { user, loading } = useAuth();
  const today = useCurrentDate();
  const categories = [
    "Demographics",
    "Climate change",
    "Health",
    "Satisfaction",
    "Sports",
    "Experience",
    "Technology",
    "Travel and Adventure ",
    "Current Affairs",
    "Community Service",
    "Entertainment",
    "Corporate",
  ];

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ["updateSurvey"],
    mutationFn: updateSurveyData,
    onSuccess: () => {
      showAlertOnSuccess("Updated successfully!");
      queryClient.invalidateQueries("updateSurvey");
    },
    onError: (error) => {
      showAlertOnError(error);
    },
  });

  const handleUpdateSurvey = (e) => {
    e.preventDefault();

    const form = e.target;
    const _id = form._id.value || "Not Found";
    const title = form.title.value || "Not Found";
    const description = form.description.value || "Not Found";
    const category = form.category.value || "Not Found";
    const deadline = form.deadline.value || "Not Found";
    const status = form.status.value || "Not Found";

    const dateValidity = dateComparer(today, deadline);

    if (dateValidity === "invalid") {
      showAlertOnError("Please enter a valid date!");
    } else {
      const updatedSurvey = {
        title,
        description,
        category,
        deadline,
        status,
        email: user?.email,
      };

      mutation.mutate({ _id, updatedSurvey });
      form.reset();
    }
  };

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
                        document.getElementById(survey._id).showModal()
                      }
                    >
                      Details
                    </button>
                    <dialog id={survey._id} className="modal">
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
                    <button
                      className="btn"
                      onClick={() =>
                        document.getElementById("u" + survey._id).showModal()
                      }
                    >
                      Update
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
                            onSubmit={handleUpdateSurvey}
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
                              name="status"
                              required
                              hidden
                              defaultValue={survey.status}
                            />

                            <div className="relative">
                              <div className="h-[48px] w-[48px] flex justify-center items-center absolute top-0 left-0 bg-[#7DDDD9] rounded-lg">
                                <i className="fa-solid fa-envelope text-xl text-white"></i>
                              </div>
                              <input
                                type="text"
                                name="title"
                                placeholder="Title"
                                required
                                defaultValue={survey.title}
                                className="input bg-[#a1dada41] w-full pl-16 rounded-lg border focus:border-[#7DDDD9] focus:outline-none"
                              />
                            </div>

                            <div className="relative">
                              <div className="h-20 w-[48px] flex justify-center items-center absolute top-0 left-0 bg-[#7DDDD9] rounded-lg">
                                <i className="fa-solid fa-envelope text-xl text-white"></i>
                              </div>
                              <textarea
                                type="email"
                                name="description"
                                placeholder="Description"
                                required
                                defaultValue={survey.description}
                                className="input bg-[#a1dada41] w-full h-20 pl-16 py-3 rounded-lg border focus:border-[#7DDDD9] focus:outline-none"
                              />
                            </div>

                            <div className="relative">
                              <div className="h-[48px] w-[48px] flex justify-center items-center absolute top-0 left-0 bg-[#7DDDD9] rounded-lg">
                                <i className="fa-solid fa-envelope text-xl text-white"></i>
                              </div>
                              <select
                                type="text"
                                name="category"
                                placeholder="Category"
                                required
                                className="input bg-[#a1dada41] w-full pl-16 rounded-lg border focus:border-[#7DDDD9] focus:outline-none"
                              >
                                {categories.map((category) => (
                                  <option key={category}>{category}</option>
                                ))}
                              </select>
                            </div>

                            <div className="relative">
                              <div className="h-[48px] w-[48px] flex justify-center items-center absolute top-0 left-0 bg-[#7DDDD9] rounded-lg">
                                <i className="fa-regular fa-calendar-days text-xl text-white"></i>
                              </div>
                              <input
                                type="date"
                                id="in4"
                                name="deadline"
                                placeholder="Deadline"
                                required
                                defaultValue={survey.deadline}
                                className="input bg-[#a1dada41] w-full pl-16 rounded-lg border focus:border-[#7DDDD9] focus:outline-none"
                              />
                            </div>

                            <input
                              type="submit"
                              value="Update"
                              className="btn w-1/2 mx-auto bg-[#323484] text-lg font-medium text-white hover:text-[#323484] normal-case rounded-lg"
                            />
                          </form>
                        </div>
                      </div>
                    </dialog>
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
