import DashboardContainer from "../../components/dashboard/shared/DashboardContainer";
import { useForm } from "react-hook-form";
import useCurrentDate from "../../hooks/useCurrentDate";
import dateComparer from "../../utilities/dateComparer";
import { showAlertOnError } from "../../utilities/displaySweetAlert";

const CreateSurvey = () => {
  const { register, handleSubmit, reset } = useForm();

  const today = useCurrentDate();

  const onSubmit = (data) => {
    // console.log(data);

    const dateValidity = dateComparer(today, data.deadline);

    if (dateValidity === "invalid") {
      showAlertOnError("Please enter a valid date!");
    } else {
    }
  };

  return (
    <DashboardContainer>
      <h1 className="w-[80%] text-[#757575] text-[36px] text-left mb-5 pl-2 border-l-2 border-[#757575da]">
        Create Survey
      </h1>
      <div className="w-[80%] flex flex-col justify-center items-center px-10 py-5 border rounded-lg">
        <form
          className="w-full flex flex-col gap-4 text-left"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="relative">
            <div className="h-[48px] w-[48px] flex justify-center items-center absolute top-0 left-0 bg-[#7DDDD9] rounded-lg">
              <i className="fa-solid fa-envelope text-xl text-white"></i>
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
            <div className="h-40 w-[48px] flex justify-center items-center absolute top-0 left-0 bg-[#7DDDD9] rounded-lg">
              <i className="fa-solid fa-envelope text-xl text-white"></i>
            </div>
            <textarea
              type="email"
              {...register("description")}
              placeholder="Description"
              required
              className="input bg-[#a1dada41] w-full h-40 pl-16 py-3 rounded-lg border focus:border-[#7DDDD9] focus:outline-none"
            />
          </div>

          <div className="relative">
            <div className="h-[48px] w-[48px] flex justify-center items-center absolute top-0 left-0 bg-[#7DDDD9] rounded-lg">
              <i className="fa-solid fa-envelope text-xl text-white"></i>
            </div>
            <input
              type="text"
              {...register("category")}
              placeholder="Category"
              required
              className="input bg-[#a1dada41] w-full pl-16 rounded-lg border focus:border-[#7DDDD9] focus:outline-none"
            />
          </div>

          <div className="relative">
            <div className="h-[48px] w-[48px] flex justify-center items-center absolute top-0 left-0 bg-[#7DDDD9] rounded-lg">
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
            value="Sign Up"
            className="btn w-1/2 mx-auto bg-[#323484] text-lg font-medium text-white hover:text-[#323484] normal-case rounded-lg"
          />
        </form>
      </div>
    </DashboardContainer>
  );
};

export default CreateSurvey;
