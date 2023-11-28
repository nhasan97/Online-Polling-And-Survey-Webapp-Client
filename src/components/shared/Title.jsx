import PropTypes from "prop-types";
// import underline from "../assets/Picture1.png";

const Title = ({ title }) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold my-6">{title}</h1>
      {/* <img src={underline} alt="" className="w-1/4" /> */}
    </div>
  );
};

Title.propTypes = {
  title: PropTypes.string.isRequired,
};
export default Title;
