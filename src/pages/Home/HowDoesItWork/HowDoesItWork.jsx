import Container from "../../../components/shared/Container";
import Title from "../../../components/shared/Title";
import { MdKeyboardOptionKey } from "react-icons/md";
import { MdAdsClick } from "react-icons/md";
import pic1 from "../../../assets/Picture2.png";
import "./HowDoesItWork.css";

const HowDoesItWork = () => {
  const title = {
    mainTitle: "How does it work",
    subTitle: "",
  };
  return (
    <Container>
      <div className="w-full flex flex-col justify-center items-center mt-28">
        <Title title={title}></Title>

        <img src={pic1} alt="" className="sm:w-[60%] md:w-[40%] mx-auto mt-8" />

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-14 md:gap-6 mb-8">
          <div className="flex flex-col justify-start items-center gap-6">
            <div className="w-20 h-20 flex justify-center items-center text-white bg-[#71357B] rounded-full circle circle1">
              <i className="fa-brands fa-readme text-4xl"></i>
            </div>
            <div className="text-center space-y-6">
              <h1 className="text-lg md:text-xl lg:text-2xl font font-medium">
                Read the details
              </h1>
              <p>
                Each of the surveys contain details that will allow the reader
                to understand what's it all about and which vote to cast.
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-start items-center gap-6">
            <div className="w-20 h-20 flex justify-center items-center text-white bg-[#95D0D4] rounded-full circle circle2">
              <MdKeyboardOptionKey className="text-5xl" />
            </div>
            <div className="text-center space-y-6">
              <h1 className="text-lg md:text-xl lg:text-2xl font font-medium">
                Select the option
              </h1>
              <p>
                Each of the surveys has two options - Yes or no. Choose
                According to your opinion.
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-start items-center gap-6">
            <div className="w-20 h-20 flex justify-center items-center text-white bg-[#FE7E51] rounded-full circle circle3">
              <MdAdsClick className="text-5xl" />
            </div>
            <div className="text-center space-y-6">
              <h1 className="text-lg md:text-xl lg:text-2xl font font-medium">
                Hit Submit
              </h1>
              <p>
                After selecting the option According to your opinion just click
                submit and your vote will be casted.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default HowDoesItWork;
