import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";

const Root = () => {
  return (
    <div>
      <div className="flex justify-center">
        <Navbar></Navbar>
      </div>

      <Outlet></Outlet>

      {/* <Footer></Footer> */}
    </div>
  );
};

export default Root;
