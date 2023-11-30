import Container from "../../components/shared/Container";
import Title from "../../components/shared/Title";
import { MdKeyboardOptionKey } from "react-icons/md";
import { MdAdsClick } from "react-icons/md";

const HowDoesItWork = () => {
  const title = {
    mainTitle: "How does it work",
    subTitle: "",
  };
  return (
    <Container>
      <div className="h-screen flex flex-col justify-center items-center">
        <Title title={title}></Title>

        <div className="py-10 grid grid-cols-3 gap-6">
          <div className="flex flex-col justify-start items-center gap-6">
            <div className="w-20 h-20 flex justify-center items-center text-white bg-[#71357B] rounded-full">
              <i className="fa-brands fa-readme text-4xl"></i>
            </div>
            <div className="text-center space-y-6">
              <h1 className="text-2xl font font-medium">Read the details</h1>
              <p>
                Each of the surveys contain details that will allow the reader
                to understand what's it all about and which vote to cast.
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-start items-center gap-6">
            <div className="w-20 h-20 flex justify-center items-center text-white bg-[#95D0D4] rounded-full">
              <MdKeyboardOptionKey className="text-5xl" />
            </div>
            <div className="text-center space-y-6">
              <h1 className="text-2xl font font-medium">Select the option</h1>
              <p>
                Each of the surveys has two options - Yes or no. Choose
                According to your opinion.
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-start items-center gap-6">
            <div className="w-20 h-20 flex justify-center items-center text-white bg-[#FE7E51] rounded-full">
              <MdAdsClick className="text-5xl" />
            </div>
            <div className="text-center space-y-6">
              <h1 className="text-2xl font font-medium">Hit Submit</h1>
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
