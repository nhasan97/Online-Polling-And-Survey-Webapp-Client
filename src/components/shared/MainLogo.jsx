import logo from "../../assets/polling.png";
import PropTypes from "prop-types";

const MainLogo = ({ caller }) => {
  return (
    <a
      href="/"
      className={`w-fit flex ${
        caller === "d" ? "justify-center" : "justify-start"
      } items-center text-2xl`}
    >
      <img src={logo} alt="" className="w-[10%] mr-2" />
      <span> | PanaPoll</span>
    </a>
  );
};
MainLogo.propTypes = {
  caller: PropTypes.string.isRequired,
};
export default MainLogo;
