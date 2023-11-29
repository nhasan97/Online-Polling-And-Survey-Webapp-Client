import PropTypes from "prop-types";
import underline from "../../assets/Picture1.png";

const Title = ({ title }) => {
  const { mainTitle, subTitle } = title;
  return (
    <div className="flex flex-col justify-center items-center gap-2 my-3">
      <h1 className="text-[#101322] text-4xl font-bold ">{mainTitle}</h1>
      <img src={underline} alt="" className="w-1/4" />
      <p className="text-[#727272] text-xl ">{subTitle}</p>
    </div>
  );
};

Title.propTypes = {
  title: PropTypes.string.isRequired,
};
export default Title;
