import { useNavigate } from "react-router-dom";
import errorBg from "../assets/404.png";

const Error = () => {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-col lg:flex-row justify-center items-center h-screen p-2 md:p-10">
      <div className="w-full lg:w-[55%] flex justify-center items-center ">
        <img src={errorBg} alt="" className="w-full lg:w-[95%]" />
      </div>
      <div className="w-full lg:w-[45%] text-center">
        <h1 className="text-[#0B0B0B] text-2xl md:text-3xl lg:text-5xl font-bold mb-10">
          Sorry!!! page not found
        </h1>
        <button
          className="btn normal-case bg-[#407BFF] text-white"
          onClick={handleGoBack}
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default Error;
