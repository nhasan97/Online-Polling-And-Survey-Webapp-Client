import { useQuery } from "@tanstack/react-query";
import {
  deleteSurveyData,
  getUserBasedSurveyData,
  updateSurveyData,
} from "../../api/surveyAPIs";
import { Helmet } from "react-helmet-async";
import timeStampToDateConverter from "../../utilities/timeStampToDateConverter";
import useAuth from "../../hooks/useAuth";
import DashboardContainer from "../../components/dashboard/shared/DashboardContainer";
import Loading from "../../components/shared/Loading";
import useCurrentDate from "../../hooks/useCurrentDate";
import dateComparer from "../../utilities/dateComparer";
import { showAlertOnError } from "../../utilities/displaySweetAlert";
import usePerformMutation from "../../hooks/usePerformMutation";
import Title from "../../components/shared/Title";
import { Link } from "react-router-dom";
import NoData from "../../components/shared/NoData";
import { BiCategory } from "react-icons/bi";
import { MdOutlineDescription, MdTopic } from "react-icons/md";

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

  //setting the title
  const title = {
    mainTitle: "Your Surveys",
    subTitle: "",
  };

  //fetching surveyor based survey data
  const {
    isLoading,
    data: surveys,
    refetch,
  } = useQuery({
    queryKey: ["getUserSurveyData"],
    queryFn: () => getUserBasedSurveyData(user?.email),
  });

  //performing mutation for updating survey data
  const mutation1 = usePerformMutation(
    "updateSurvey",
    updateSurveyData,
    "Updated successfully!"
  );

  //update button handler
  const handleUpdateSurvey = (e) => {
    e.preventDefault();

    const form = e.target;
    const _id = form._id.value || "Not Found";
    const defaultDeadline = form.hiddenDeadline.value || "Not Found";
    const title = form.title.value || "Not Found";
    const description = form.description.value || "Not Found";
    const category = form.category.value || "Not Found";
    const deadline = form.deadline.value || "Not Found";

    const dateValidity = dateComparer(today, deadline);

    if (defaultDeadline !== deadline && dateValidity === "invalid") {
      showAlertOnError("Please enter a valid date!");
    } else {
      const updatedSurvey = {
        title,
        description,
        category,
        deadline,
      };

      mutation1.mutate({ _id, updatedSurvey });
      refetch();
      form.reset();
    }
  };

  //performing mutation for deleting survey data
  const mutation2 = usePerformMutation(
    "deleteSurvey",
    deleteSurveyData,
    "Deleted successfully!"
  );

  //delete button handler
  const handleDelete = (_id) => {
    mutation2.mutate({ _id });
    refetch();
  };

  if (isLoading || loading) {
    return <Loading />;
  }

  if (surveys.length > 0) {
    return (
      <div className="h-screen">
        <DashboardContainer>
          <Helmet>
            <title>PanaPoll | Dashboard | Surveys</title>
          </Helmet>

          <Title title={title}></Title>

          <div className="hidden sm:block w-full h-[80%] overflow-y-auto rounded-lg border">
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
                            {timeStampToDateConverter(
                              parseInt(survey.timeStamp)
                            )}
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
                        className="btn hover:bg-emerald-500 group"
                        onClick={() =>
                          document.getElementById("u" + survey._id).showModal()
                        }
                      >
                        <i className="fa-solid fa-pen-to-square group-hover:text-white"></i>
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
                                name="hiddenDeadline"
                                required
                                hidden
                                defaultValue={survey.deadline}
                              />

                              <input
                                type="text"
                                name="status"
                                required
                                hidden
                                defaultValue={survey.status}
                              />

                              <div className="relative">
                                <div className="h-[48px] w-[48px] flex justify-center items-center absolute top-0 left-0 bg-[#95D0D4] rounded-lg">
                                  <MdTopic className="text-2xl text-white" />
                                </div>
                                <input
                                  type="text"
                                  name="title"
                                  placeholder="Title"
                                  required
                                  defaultValue={survey.title}
                                  className="input bg-[#a1dada41] w-full pl-16 rounded-lg border focus:border-[#95D0D4] focus:outline-none"
                                />
                              </div>

                              <div className="relative">
                                <div className="h-20 w-[48px] flex justify-center items-center absolute top-0 left-0 bg-[#95D0D4] rounded-lg">
                                  <MdOutlineDescription className="text-2xl text-white"></MdOutlineDescription>
                                </div>
                                <textarea
                                  type="email"
                                  name="description"
                                  placeholder="Description"
                                  required
                                  defaultValue={survey.description}
                                  className="input bg-[#a1dada41] w-full h-20 pl-16 py-3 rounded-lg border focus:border-[#95D0D4] focus:outline-none"
                                />
                              </div>

                              <div className="relative">
                                <div className="h-[48px] w-[48px] flex justify-center items-center absolute top-0 left-0 bg-[#95D0D4] rounded-lg">
                                  <BiCategory className="text-2xl text-white" />
                                </div>
                                <select
                                  type="text"
                                  name="category"
                                  placeholder="Category"
                                  required
                                  className="input bg-[#a1dada41] w-full pl-16 rounded-lg border focus:border-[#95D0D4] focus:outline-none"
                                >
                                  {categories.map((category) => (
                                    <option key={category}>{category}</option>
                                  ))}
                                </select>
                              </div>

                              <div className="relative">
                                <div className="h-[48px] w-[48px] flex justify-center items-center absolute top-0 left-0 bg-[#95D0D4] rounded-lg">
                                  <i className="fa-regular fa-calendar-days text-xl text-white"></i>
                                </div>
                                <input
                                  type="date"
                                  id="in4"
                                  name="deadline"
                                  placeholder="Deadline"
                                  required
                                  defaultValue={survey.deadline}
                                  className="input bg-[#a1dada41] w-full pl-16 rounded-lg border focus:border-[#95D0D4] focus:outline-none"
                                />
                              </div>

                              <input
                                type="submit"
                                value="Update"
                                className="btn w-1/2 mx-auto bg-[#FE7E51] text-lg font-medium text-white hover:text-[#101322] normal-case rounded-lg"
                              />
                            </form>
                          </div>
                        </div>
                      </dialog>

                      <button
                        className="btn hover:bg-red-500 group"
                        onClick={() => handleDelete(survey._id)}
                      >
                        <i className="fa-solid fa-trash group-hover:text-white "></i>
                      </button>

                      <Link
                        to={`/dashboard/survey-comments/${survey._id}`}
                        className="btn hover:bg-[#FE7E51] group"
                      >
                        <i className="fa-solid fa-comment group-hover:text-white"></i>
                      </Link>

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

          <div className="grid grid-cols-1 gap-3 sm:hidden w-full h-[80%] overflow-y-auto rounded-lg">
            {surveys.map((survey) => (
              <div key={survey._id} className="card bg-base-100 shadow-xl">
                <div className="card-body p-5">
                  <div className="flex justify-between items-center">
                    <h2 className="card-title text-[#71357B] text-lg md:text-xl lg:text-2xl">
                      {survey.title}
                    </h2>

                    <button
                      className="btn btn-circle hover:bg-[#71357B] group"
                      onClick={() =>
                        document.getElementById("m" + survey._id).showModal()
                      }
                    >
                      <i className="fa-solid fa-circle-info group-hover:text-white"></i>
                    </button>
                    <dialog id={"m" + survey._id} className="modal">
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
                  </div>

                  {survey.status.toLowerCase() === "published" ? (
                    <p className="text-emerald-500">Status | {survey.status}</p>
                  ) : (
                    <p className="text-red-500">Status | {survey.status}</p>
                  )}

                  <div className="card-actions justify-start">
                    <button
                      className="btn hover:bg-emerald-500 group"
                      onClick={() =>
                        document.getElementById("mu" + survey._id).showModal()
                      }
                    >
                      <i className="fa-solid fa-pen-to-square group-hover:text-white"></i>
                    </button>

                    <dialog id={"mu" + survey._id} className="modal">
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
                              name="hiddenDeadline"
                              required
                              hidden
                              defaultValue={survey.deadline}
                            />

                            <input
                              type="text"
                              name="status"
                              required
                              hidden
                              defaultValue={survey.status}
                            />

                            <div className="relative">
                              <div className="h-[48px] w-[48px] flex justify-center items-center absolute top-0 left-0 bg-[#95D0D4] rounded-lg">
                                <MdTopic className="text-2xl text-white" />
                              </div>
                              <input
                                type="text"
                                name="title"
                                placeholder="Title"
                                required
                                defaultValue={survey.title}
                                className="input bg-[#a1dada41] w-full pl-16 rounded-lg border focus:border-[#95D0D4] focus:outline-none"
                              />
                            </div>

                            <div className="relative">
                              <div className="h-20 w-[48px] flex justify-center items-center absolute top-0 left-0 bg-[#95D0D4] rounded-lg">
                                <MdOutlineDescription className="text-2xl text-white"></MdOutlineDescription>
                              </div>
                              <textarea
                                type="email"
                                name="description"
                                placeholder="Description"
                                required
                                defaultValue={survey.description}
                                className="input bg-[#a1dada41] w-full h-20 pl-16 py-3 rounded-lg border focus:border-[#95D0D4] focus:outline-none"
                              />
                            </div>

                            <div className="relative">
                              <div className="h-[48px] w-[48px] flex justify-center items-center absolute top-0 left-0 bg-[#95D0D4] rounded-lg">
                                <BiCategory className="text-2xl text-white" />
                              </div>
                              <select
                                type="text"
                                name="category"
                                placeholder="Category"
                                required
                                className="input bg-[#a1dada41] w-full pl-16 rounded-lg border focus:border-[#95D0D4] focus:outline-none"
                              >
                                {categories.map((category) => (
                                  <option key={category}>{category}</option>
                                ))}
                              </select>
                            </div>

                            <div className="relative">
                              <div className="h-[48px] w-[48px] flex justify-center items-center absolute top-0 left-0 bg-[#95D0D4] rounded-lg">
                                <i className="fa-regular fa-calendar-days text-xl text-white"></i>
                              </div>
                              <input
                                type="date"
                                id="in4"
                                name="deadline"
                                placeholder="Deadline"
                                required
                                defaultValue={survey.deadline}
                                className="input bg-[#a1dada41] w-full pl-16 rounded-lg border focus:border-[#95D0D4] focus:outline-none"
                              />
                            </div>

                            <input
                              type="submit"
                              value="Update"
                              className="btn w-1/2 mx-auto bg-[#FE7E51] text-lg font-medium text-white hover:text-[#101322] normal-case rounded-lg"
                            />
                          </form>
                        </div>
                      </div>
                    </dialog>

                    <button
                      className="btn hover:bg-red-500 group"
                      onClick={() => handleDelete(survey._id)}
                    >
                      <i className="fa-solid fa-trash group-hover:text-white "></i>
                    </button>

                    <Link
                      to={`/dashboard/survey-comments/${survey._id}`}
                      className="btn hover:bg-[#FE7E51] group"
                    >
                      <i className="fa-solid fa-comment group-hover:text-white"></i>
                    </Link>

                    <Link
                      to={`/dashboard/survey-response/${survey._id}`}
                      className="btn group hover:bg-[#101322] hover:text-white"
                    >
                      Responses
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </DashboardContainer>
      </div>
    );
  } else {
    return (
      <div className="h-screen">
        <DashboardContainer>
          <NoData text="No Survey Found"></NoData>
        </DashboardContainer>
      </div>
    );
  }
};

export default DisplaySurveys;
