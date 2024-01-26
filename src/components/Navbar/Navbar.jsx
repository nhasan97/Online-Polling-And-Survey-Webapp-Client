import "./Navbar.css";
import { Link, NavLink } from "react-router-dom";
import { AiOutlineLogin, AiOutlineLogout } from "react-icons/ai";
import { showAlertOnError } from "../../utilities/displaySweetAlert";
import useAuth from "../../hooks/useAuth";
import MainLogo from "../shared/mainLogo";
import Container from "../shared/Container";
import useUserRole from "../../hooks/useUserRole";

const Navbar = () => {
  const { logoutUser } = useAuth();

  const [user, loading, role, roleLoading, , refetchRole] = useUserRole();

  refetchRole();

  const links = (
    <div className="text-[#757575] text-base font-medium lg:space-x-8 flex flex-col lg:flex-row gap-2">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/surveys">Surveys</NavLink>

      {loading || roleLoading ? (
        <span className="loading loading-dots loading-xs"></span>
      ) : user && role === "admin" ? (
        <NavLink to="/dashboard/manage-surveys">Dashboard</NavLink>
      ) : user && role === "surveyor" ? (
        <NavLink to="/dashboard/display-surveys">Dashboard</NavLink>
      ) : user && role === "user" ? (
        <NavLink to="/pro">Pro</NavLink>
      ) : (
        ""
      )}

      <NavLink to="/about">About Us</NavLink>
      <NavLink to="/contact">Contact</NavLink>
    </div>
  );

  const handleLogout = () => {
    logoutUser()
      .then()
      .catch((err) => {
        showAlertOnError(err.message);
      });
  };

  return (
    <div className="w-full h-fit py-2 bg-[rgba(255,255,255,.5)] absolute z-10">
      <Container>
        <div className="navbar  text-[#101322]">
          <div className="navbar-start">
            <div className="dropdown">
              <label tabIndex={0} className="btn btn-ghost lg:hidden">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </label>
              <ul
                tabIndex={0}
                className="w-24 menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box"
              >
                {links}
              </ul>
            </div>

            <MainLogo caller={"n"}></MainLogo>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">{links}</ul>
          </div>
          <div className="navbar-end">
            {user?.email ? (
              <div className="flex justify-center items-center gap-2">
                <label
                  tabIndex={0}
                  className="btn btn-ghost btn-circle avatar hidden md:flex"
                >
                  <div className="w-10 rounded-full">
                    <img src={user.photoURL} />
                  </div>
                </label>
                <p className="border-r-2 md:border-l-2 md:border-r-0 p-2 text-lg">
                  {user.displayName}
                </p>
                <button
                  className="btn btn-circle border-none bg-[#95D0D4] text-white hover:text-[#323484]"
                  onClick={handleLogout}
                >
                  <AiOutlineLogout className="text-2xl"></AiOutlineLogout>
                </button>
              </div>
            ) : (
              <div className="flex justify-center items-center gap-2">
                <Link
                  className="btn border-none bg-[#FE7E51] text-white hover:text-[#323484]"
                  to="/login"
                >
                  <AiOutlineLogin className="text-2xl"></AiOutlineLogin>
                </Link>
                <Link
                  className="btn border-none bg-[#FE7E51] text-white hover:text-[#323484]"
                  to="/register"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
