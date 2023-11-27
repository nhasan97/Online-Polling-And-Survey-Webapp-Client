import pic1 from "../../assets/Picture2.png";
// import pic2 from "../../assets/Charts.gif";

const Banner = () => {
  return (
    <div className="h-screen bg-[url(../public/Picture1.png)] bg-no-repeat bg-center bg-cover flex justify-center items-center">
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

        <button className="btn bg-[#FE7E51] hover:bg-white text-lg text-white hover:text-[#FE7E51] border-none">
          Explore <i className="fa-solid fa-arrow-right"></i>
        </button>
      </div>

      {/* <img src={pic2} alt="" /> */}

      <img
        src={pic1}
        alt=""
        className="w-1/2 absolute bottom-0 left-0 translate-x-[50%] translate-y-[70%]"
        data-aos="fade-up"
        data-aos-delay="50"
        data-aos-duration="1000"
        data-aos-easing="ease-in-out"
        data-aos-mirror="true"
      />
    </div>
  );
};

export default Banner;
