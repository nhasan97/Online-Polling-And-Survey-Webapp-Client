import PropTypes from "prop-types";
import underline from "../../assets/Picture1.png";

const Title = ({ title }) => {
  const { mainTitle, subTitle } = title;
  return (
    <div className="flex flex-col justify-center items-center gap-2 my-3 z-10">
      <h1 className="text-center text-[#101322] text-2xl md:text-3xl lg:text-4xl font-bold ">
        {mainTitle}
      </h1>
      <img src={underline} alt="" className="w-1/2 sm:w-1/4" />
      <p className="text-center text-[#727272] text-base md:text-xl ">
        {subTitle}
      </p>
    </div>
  );
};

Title.propTypes = {
  title: PropTypes.object.isRequired,
};
export default Title;
