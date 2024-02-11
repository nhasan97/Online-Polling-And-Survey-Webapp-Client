import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { BiLogoGoogle } from "react-icons/bi";
import {
  showAlertOnError,
  showAlertOnSuccess,
} from "../../utilities/displaySweetAlert";
import useAuth from "../../hooks/useAuth";
import { GoogleAuthProvider } from "firebase/auth";
import { saveUserData } from "../../api/authAPIs";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const [showPass, setShowPass] = useState(false);
  const { loginWithEmailAndPassword, signInWithGoogle } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  //==================== Login Using Email and Password ====================
  const onSubmit = (data) => {
    loginWithEmailAndPassword(data.email, data.pass)
      .then((result) => {
        showAlertOnSuccess("Login successful");
        console.log(result.user);
        navigate(from, { replace: true });
      })
      .catch((err) => {
        showAlertOnError(err.code + "---------" + err.message);
      });
  };

  //================== Login using Google ==================
  const handleLoginWithGoogle = () => {
    const provider = new GoogleAuthProvider();

    signInWithGoogle(provider)
      .then(async (result) => {
        if (result?.user?.email) {
          const dbResponse = await saveUserData(result?.user);
          console.log(dbResponse);
          navigate(from, { replace: true });
        }
      })
      .catch((err) => {
        showAlertOnError(err.code + "---" + err.message);
      });
  };

  return (
    <div className="h-screen">
      <div className="w-full h-full sm:flex lg:flex-row sm:justify-center sm:items-center bg-[url('../public/reg-bg.png')] sm:bg-[url('../public/reg-bg2.png')] lg:bg-[url('../public/reg-bg3.png')] bg-center bg-no-repeat bg-cover">
        <div
          className="w-full sm:w-[60%] lg:w-[50%] h-fit lg:h-full bg-[rgba(255,255,255,0.92)] flex flex-col justify-center items-center gap-4 px-10 py-20 sm:p-10 lg:px-0 lg:py-0 space-y-4 lg:space-y-0 rounded-b-[80px] sm:rounded-[60px] lg:rounded-r-[80px] lg:rounded-l-none shadow-xl shadow-[rgba(41,38,38,0.71)]"
          data-aos="fade-down"
          data-aos-delay="10"
          data-aos-duration="1000"
          data-aos-easing="ease-in-out"
          data-aos-mirror="false"
        >
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full lg:w-3/4 h-fit flex flex-col gap-4 sm:gap-3 lg:gap-4 px-0 text-left"
          >
            <h1 className="text-[#444] text-4xl font-semibold text-center mt-4 sm:mt-0">
              Login
            </h1>
            <div className="relative">
              <div className="h-[48px] w-[48px] flex justify-center items-center absolute top-0 left-0 bg-[#95D0D4] rounded-lg">
                <i className="fa-solid fa-envelope text-xl text-white"></i>
              </div>
              <input
                type="email"
                id="in2"
                {...register("email")}
                placeholder="Email"
                required
                className="input bg-[#a1dada41] w-full pl-16 rounded-lg border focus:border-[#7DDDD9] focus:outline-none"
              />
            </div>
            <div className="relative">
              <div className="h-[48px] w-[48px] flex justify-center items-center absolute top-0 left-0 bg-[#95D0D4] rounded-lg">
                <i className="fa-solid fa-key text-xl text-white"></i>
              </div>

              <input
                type={showPass ? "text" : "password"}
                id="in3"
                {...register("pass")}
                placeholder="Password"
                required
                className="input bg-[#a1dada41] w-full pl-16 rounded-lg border focus:border-[#7DDDD9] focus:outline-none"
              />
              <span
                className=" text-base absolute right-4 translate-y-[50%]"
                onClick={() => setShowPass(!showPass)}
              >
                {showPass ? (
                  <i className="fa-solid fa-eye-slash"></i>
                ) : (
                  <i className="fa-solid fa-eye"></i>
                )}
              </span>
            </div>
            <input
              type="submit"
              value="Sign In"
              className="btn w-1/2 mx-auto bg-[#FE7E51] text-lg font-medium text-white hover:text-[#FE7E51] normal-case rounded-lg"
            />
          </form>

          <div className="w-full lg:w-3/4 h-fit flex flex-col items-center gap-4 px-0">
            <p className="text-sm sm:text-lg text-[#444] text-center">
              New here?
              <Link className="font-bold" to="/register">
                Create a New Account
              </Link>
            </p>
            <p className="text-sm sm:text-lg font-medium">Or sign in with</p>
            <BiLogoGoogle
              className="btn w-1/2 mx-auto bg-[#FE7E51] text-sm sm:text-lg font-medium text-white hover:text-[#FE7E51] normal-case rounded-lg"
              onClick={handleLoginWithGoogle}
            ></BiLogoGoogle>
          </div>
        </div>

        <div className="hidden lg:flex justify-center items-center w-[50%] h-full text-center -mt-60">
          <p className="text-white">
            <span className="text-[80px] font-bold">
              PanaPoll<br></br>
            </span>
            <span className="text-xl font-medium tracking-wider">
              Insights that Empower, Surveys that Deliver.
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
