import logo from "../../assets/polling.png";

const MainLogo = () => {
  return (
    <a href="/" className="flex items-center text-2xl">
      <img src={logo} alt="" className="w-[10%] mr-2" />
      <span> | PanaPoll</span>
    </a>
  );
};

export default MainLogo;
