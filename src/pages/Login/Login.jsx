import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { BiLogoFacebook, BiLogoGoogle, BiLogoGithub } from "react-icons/bi";
import { useState } from "react";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const [showPass, setShowPass] = useState(false);

  const onSubmit = (data) => {};
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

            {/* <button className="btn" onClick={handleValidateCaptcha}>
              validate
            </button> */}

            {/* {signUpError ? <p>{signUpError}</p> : ""} */}

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
              <BiLogoFacebook className=" border-2 border-black rounded-full w-8 h-8"></BiLogoFacebook>
              <BiLogoGoogle className=" border-2 border-black rounded-full w-8 h-8"></BiLogoGoogle>
              <BiLogoGithub className=" border-2 border-black rounded-full w-8 h-8"></BiLogoGithub>
            </div>
          </div>
        </div>

        {/* <ToastContainer /> */}
      </div>
    </div>
  );
};

export default Login;
