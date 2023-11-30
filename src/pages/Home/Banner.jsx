import { Link } from "react-router-dom";

// import pic2 from "../../assets/Charts.gif";

const Banner = () => {
  return (
    <div>
      <div className="h-screen bg-[url(../public/bar-chart.png)] bg-no-repeat bg-center bg-auto flex flex-col justify-center items-center">
        <div
          className="flex flex-col items-center gap-6"
          data-aos="zoom-in"
          data-aos-delay="50"
          data-aos-duration="1000"
          data-aos-easing="ease-in-out"
          data-aos-mirror="true"
        >
          <h1 className="text-center text-[#101322] text-[40px] font-bold leading-[60px]">
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

        {/* <img src={pic2} alt="" /> */}
      </div>
    </div>
  );
};

export default Banner;
