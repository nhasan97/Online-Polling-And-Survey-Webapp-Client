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
        <div className="w-1/2 px-10">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4 text-left"
          >
            <h1 className="text-[#444] text-[40px] font-semibold text-center">
              Login
            </h1>

            <label htmlFor="in2" className="">
              Email
              <input
                type="email"
                id="in2"
                {...register("email")}
                placeholder="Type Here"
                required
                className="input input-bordered w-full"
              />
            </label>

            <label htmlFor="in3" className="">
              Password
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  id="in3"
                  {...register("pass")}
                  placeholder="Type Here"
                  required
                  className="input input-bordered w-full"
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
            </label>

            <input
              type="submit"
              value="Sign In"
              className="input w-full bg-[#D1A054] text-white"
            />
          </form>

          <div className="flex flex-col justify-center items-center gap-4 mt-4">
            <p className="text-xl text-[#D1A054] text-center">
              New here?
              <Link className="font-bold" to="/register">
                Create a New Account
              </Link>
            </p>
            <p className="text-xl font-medium">Or sign in with</p>
            <div className="flex justify-center items-center gap-6 text-xl">
              <BiLogoGoogle
                className=" border-2 border-black rounded-full w-8 h-8"
                onClick={handleLoginWithGoogle}
              ></BiLogoGoogle>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
