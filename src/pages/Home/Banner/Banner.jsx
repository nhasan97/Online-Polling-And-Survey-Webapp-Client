import { Link } from "react-router-dom";
import Container from "../../../components/shared/Container";
import pic1 from "../../../assets/undraw_Report_re_f5n5.png";
import pic2 from "../../../assets/undraw_Agree_re_hor9 (1).png";
import pic3 from "../../../assets/undraw_Feedback_re_urmj.png";
import pic4 from "../../../assets/bar-chart.png";
import "./Banner.css";

// bg-[url(../public/bar-chart.png)] bg-no-repeat bg-center bg-auto

const Banner = () => {
  return (
    <Container>
      <div className="w-full flex justify-center items-center">
        <div
          className="flex-1 h-full flex flex-col justify-center items-start gap-6"
          data-aos="zoom-in"
          data-aos-delay="50"
          data-aos-duration="1000"
          data-aos-easing="ease-in-out"
          data-aos-mirror="true"
        >
          <h1 className="text-left text-[#101322] text-[50px] font-bold leading-[70px]">
            Insights that Empower, Surveys that Deliver. <br />
            Survey with Us Today!
          </h1>

          <Link
            to="/surveys"
            className="btn bg-[#FE7E51] hover:bg-white text-lg text-white hover:text-[#FE7E51] border-none"
          >
            Explore <i className="fa-solid fa-arrow-right"></i>
          </Link>
        </div>

        <div className="flex-1 h-full flex justify-center items-center pt-20">
          {" "}
          <div className="bg-[#FE7E51] grid grid-cols-3 gap-6 p-10  rounded-xl">
            <img
              src={pic1}
              alt=""
              className="w-[full] h-[full] col-span-1 object-cover shadow-xl rounded-xl up-down-animation animate-img1"
            />
            <img
              src={pic2}
              alt=""
              className="w-[full] h-[full] col-span-2 object-cover shadow-xl rounded-xl up-down-animation animate-img2"
            />
            <img
              src={pic3}
              alt=""
              className="w-[full] h-[full] col-span-2 object-cover shadow-xl rounded-xl up-down-animation animate-img3"
            />
            <img
              src={pic4}
              alt=""
              className="w-[full] h-[full] bg-white col-span-1 object-cover shadow-xl rounded-xl up-down-animation animate-img4"
            />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Banner;
