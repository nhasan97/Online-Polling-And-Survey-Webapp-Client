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
    <div className="w-full h-screen flex justify-center items-center bg-[url('src/assets/others/authentication.png')]">
      <div className="max-w-screen-xl mx-auto flex justify-center items-center shadow-xl py-8">
        <div className="w-full px-10">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4 text-left"
          >
            <h1 className="text-[#444] text-[40px] font-semibold text-center">
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

          <div className="flex flex-col justify-center items-center gap-4 mt-4">
            <p className="text-lg text-[#444] text-center">
              New here?
              <Link className="font-bold" to="/register">
                Create a New Account
              </Link>
            </p>
            <p className="text-lg font-medium">Or sign in with</p>
            <BiLogoGoogle
              className="btn w-1/2 mx-auto bg-[#FE7E51] text-lg font-medium text-white hover:text-[#FE7E51] normal-case rounded-lg"
              onClick={handleLoginWithGoogle}
            ></BiLogoGoogle>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
