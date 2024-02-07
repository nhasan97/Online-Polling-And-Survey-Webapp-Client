import DashboardContainer from "../../components/dashboard/shared/DashboardContainer";
import { useForm } from "react-hook-form";
import useCurrentDate from "../../hooks/useCurrentDate";
import dateComparer from "../../utilities/dateComparer";
import {
  showAlertOnError,
  showAlertOnSuccess,
} from "../../utilities/displaySweetAlert";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { saveSurveyData } from "../../api/surveyAPIs";
import useAuth from "../../hooks/useAuth";
import { Helmet } from "react-helmet-async";
import Loading from "../../components/shared/Loading";
import Title from "../../components/shared/Title";
import { MdDescription } from "react-icons/md";
import { BiCategory } from "react-icons/bi";
import pic1 from "../../assets/undraw_Forms_re_pkrt.png";
import pic2 from "../../assets/undraw_Forms_re_pkrt2.png";

const CreateSurvey = () => {
  const { user, loading } = useAuth();

  const { register, handleSubmit, reset } = useForm();

  const today = useCurrentDate();

  const navigate = useNavigate();

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
    mainTitle: "Create Survey",
    subTitle: "",
  };

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ["createSurvey"],
    mutationFn: saveSurveyData,
    onSuccess: () => {
      showAlertOnSuccess("Inserted successfully!");
      reset();
      queryClient.invalidateQueries("createSurvey");
      navigate(location?.state ? location.state : "/dashboard");
    },
    onError: (error) => {
      showAlertOnError(error);
    },
  });

  const onSubmit = async (data) => {
    const dateValidity = dateComparer(today, data.deadline);

    if (dateValidity === "invalid") {
      showAlertOnError("Please enter a valid date!");
    } else {
      if (user.email) {
        const survey = {
          title: data.title,
          description: data.description,
          category: data.category,
          deadline: data.deadline,
          status: "unpublished",
          email: user?.email,
        };

        mutation.mutate(survey);
      } else return;
    }
  };

  if (mutation.isLoading || loading) {
    return <Loading />;
  }

  return (
    <div className="h-screen">
      <DashboardContainer>
        <Helmet>
          <title>PanaPoll | Dashboard | Create Survey</title>
        </Helmet>

        <div className="w-full sm:w-[90%] h-[80%] flex flex-col justify-center items-center px-2 py-2 md:px-10 md:py-5 relative">
          <Title title={title}></Title>

          <img
            src={pic2}
            alt=""
            className="w-1/3 lg:hidden absolute top-0 sm:-top-20 left-0 z-[-1] opacity-[.5]"
          />
          <form
            className="bg-[#e7e7e72a] w-full flex flex-col gap-4 p-2 text-left backdrop-blur-[2px]"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="relative">
              <div className="h-[48px] w-[48px] flex justify-center items-center absolute top-0 left-0 bg-[#95D0D4] rounded-lg">
                <i className="fa-solid fa-t text-xl text-white"></i>
              </div>
              <input
                type="text"
                {...register("title")}
                placeholder="Title"
                required
                className="input bg-[#a1dada41] w-full pl-16 rounded-lg border focus:border-[#7DDDD9] focus:outline-none"
              />
            </div>

            <div className="relative">
              <div className="h-20 w-[48px] flex justify-center items-center absolute top-0 left-0 bg-[#95D0D4] rounded-lg">
                <MdDescription className="text-2xl text-white" />
              </div>
              <textarea
                type="email"
                {...register("description")}
                placeholder="Description"
                required
                className="input bg-[#a1dada41] w-full h-20 pl-16 py-3 rounded-lg border focus:border-[#7DDDD9] focus:outline-none"
              />
            </div>

            <div className="relative">
              <div className="h-[48px] w-[48px] flex justify-center items-center absolute top-0 left-0 bg-[#95D0D4] rounded-lg">
                <BiCategory className="text-2xl text-white" />
              </div>
              <select
                type="text"
                {...register("category")}
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
              <div className="h-[48px] w-[48px] flex justify-center items-center absolute top-0 left-0 bg-[#95D0D4] rounded-lg">
                <i className="fa-regular fa-calendar-days text-xl text-white"></i>
              </div>
              <input
                type="date"
                id="in4"
                {...register("deadline")}
                placeholder="Deadline"
                required
                className="input bg-[#a1dada41] w-full pl-16 rounded-lg border focus:border-[#7DDDD9] focus:outline-none"
              />
            </div>

            <input
              type="submit"
              value="Create"
              className="btn w-1/2 mx-auto bg-[#FE7E51] text-lg font-medium text-white hover:text-[#FE7E51] normal-case rounded-lg"
            />
          </form>
          <img
            src={pic1}
            alt=""
            className="w-1/3 lg:hidden absolute bottom-0 sm:-bottom-20 right-0 z-[-1] opacity-[.5]"
          />
        </div>
      </DashboardContainer>
    </div>
  );
};

export default CreateSurvey;
