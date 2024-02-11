import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { BiLogoGoogle } from "react-icons/bi";
import useAuth from "../../hooks/useAuth";
import { uploadImage } from "../../utilities/imageUploader";
import {
  showAlertOnSuccess,
  showAlertOnError,
} from "../../utilities/displaySweetAlert";
import { saveUserData } from "../../api/authAPIs";
import { GoogleAuthProvider } from "firebase/auth";

const Register = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  const [showPass, setShowPass] = useState(false);
  const { registerWithEmailAndPassword, updateUsersProfile, signInWithGoogle } =
    useAuth();
  const navigate = useNavigate();

  //==================== Register Using Email and Password ====================
  const onSubmit = async (data) => {
    try {
      const imageData = await uploadImage(data.photo[0]);

      registerWithEmailAndPassword(data.email, data.pass)
        .then(async (result) => {
          updateUsersProfile(data.name, imageData?.data?.display_url)
            .then(async () => {
              const dbResponse = await saveUserData(result?.user);
              console.log(dbResponse);
              reset();
              showAlertOnSuccess("Account created successfully");
              navigate("/");
            })
            .catch((err) => {
              showAlertOnError(err.code + "---------" + err.message);
            });
        })
        .catch((err) => {
          showAlertOnError(err.code + "---------" + err.message);
        });
    } catch (err) {
      showAlertOnError(err.message);
    }
  };

  //================== Register using Google ==================
  const handleRegistrationWithGoogle = () => {
    const provider = new GoogleAuthProvider();

    signInWithGoogle(provider)
      .then(async (result) => {
        if (result?.user?.email) {
          const dbResponse = await saveUserData(result?.user);
          console.log(dbResponse);
          navigate(location?.state ? location.state : "/");
        }
      })
      .catch((err) => {
        showAlertOnError(err.code + "---" + err.message);
      });
  };

  return (
    <div className="h-screen">
      <div className="hidden lg:flex w-full h-full flex-row justify-center items-center bg-[url('public/reg-bg3.png')] bg-center bg-no-repeat bg-cover">
        <div className="w-[50%] h-full bg-[rgba(255,255,255,0.92)] flex flex-col justify-center items-center gap-4 rounded-r-[80px] shadow-xl shadow-[rgba(41,38,38,0.71)]">
          <form
            className="w-1/2 h-fit flex flex-col gap-3 px-0 text-left"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h1 className="text-[#444] text-4xl font-semibold text-center">
              Sign UP
            </h1>

            <div className="relative">
              <div className="h-[48px] w-[48px] flex justify-center items-center absolute top-0 left-0 bg-[#95D0D4] rounded-lg">
                <i className="fa-solid fa-signature text-xl text-white"></i>
              </div>
              <input
                id="in1"
                type="text"
                {...register("name", { required: true })}
                placeholder="Name"
                className="input bg-[#a1dada41] w-full pl-16 rounded-lg border focus:border-[#7DDDD9] focus:outline-none"
              />
              {errors.name?.type === "required" && (
                <p className="text-red-500">Name is required</p>
              )}
            </div>

            <div className="relative">
              <div className="h-[48px] w-[48px] flex justify-center items-center absolute top-0 left-0 bg-[#95D0D4] rounded-lg">
                <i className="fa-solid fa-envelope text-xl text-white"></i>
              </div>
              <input
                id="in2"
                type="email"
                {...register("email", { required: true })}
                placeholder="Email"
                className="input bg-[#a1dada41] w-full pl-16 rounded-lg border focus:border-[#7DDDD9] focus:outline-none"
              />
              {errors.email?.type === "required" && (
                <p className="text-red-500">Email is required</p>
              )}
            </div>

            <div className="relative">
              <div className="h-[48px] w-[48px] flex justify-center items-center absolute top-0 left-0 bg-[#95D0D4] rounded-lg">
                <i className="fa-solid fa-key text-xl text-white"></i>
              </div>
              <input
                id="in3"
                type={showPass ? "text" : "password"}
                {...register("pass", {
                  required: true,
                  minLength: 6,
                  maxLength: 20,
                  pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                })}
                placeholder="Password"
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
              {errors.pass?.type === "required" && (
                <p className="text-red-500">Password is required</p>
              )}
              {errors.pass?.type === "minLength" && (
                <p className="text-red-500">
                  Password has to be at least 6 characters long
                </p>
              )}
              {errors.pass?.type === "pattern" && (
                <p className="text-red-500">
                  <ul className="list-disc">
                    Password must have at least
                    <li>1 uppercase letter</li>
                    <li>1 lowercase letter</li>
                    <li>1 digit</li>
                    <li>1 special character</li>
                  </ul>
                </p>
              )}
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text text-base">
                  Pick your profile picture
                </span>
              </label>
              <input
                type="file"
                {...register("photo")}
                className="file-input file-input-bordered w-full"
              />
            </div>

            <input
              type="submit"
              value="Sign Up"
              className="btn w-1/2 mx-auto bg-[#FE7E51] text-lg font-medium text-white hover:text-[#FE7E51] normal-case rounded-lg"
            />
          </form>
          <div className="w-1/2 h-fit flex flex-col items-center gap-4 px-0">
            <p className="text-lg text-[#444] text-center">
              Already registered?
              <Link className="font-bold" to="/login">
                Go to log in
              </Link>
            </p>
            <p className="text-lg font-medium">Or sign in with</p>

            <BiLogoGoogle
              className="btn w-1/2 mx-auto bg-[#FE7E51] text-lg font-medium text-white hover:text-[#FE7E51] normal-case rounded-lg"
              onClick={handleRegistrationWithGoogle}
            ></BiLogoGoogle>
          </div>
        </div>

        <div className="w-[50%] h-full flex justify-center items-center text-center -mt-60">
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

      {/* for mobile devices */}
      <div className="sm:hidden w-full h-full bg-[url('public/reg-bg.png')] bg-center bg-no-repeat bg-cover">
        <div className="bg-[rgba(255,255,255,0.84)] h-fit rounded-b-[80px] px-10 py-6 space-y-4">
          <form
            className="w-full h-fit flex flex-col gap-4 text-left"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h1 className="text-[#444] text-4xl font-semibold text-center mt-4">
              Sign UP
            </h1>

            <div className="relative">
              <div className="h-10 w-10 flex justify-center items-center absolute top-0 left-0 bg-[#95D0D4] rounded-lg">
                <i className="fa-solid fa-signature text-xl text-white"></i>
              </div>
              <input
                id="in1"
                type="text"
                {...register("name", { required: true })}
                placeholder="Name"
                className="input h-10 text-sm bg-[#a1dada41] w-full pl-12 rounded-lg border focus:border-[#7DDDD9] focus:outline-none"
              />
              {errors.name?.type === "required" && (
                <p className="text-red-500">Name is required</p>
              )}
            </div>

            <div className="relative">
              <div className="h-10 w-10 flex justify-center items-center absolute top-0 left-0 bg-[#95D0D4] rounded-lg">
                <i className="fa-solid fa-envelope text-xl text-white"></i>
              </div>
              <input
                id="in2"
                type="email"
                {...register("email", { required: true })}
                placeholder="Email"
                className="input h-10 text-sm bg-[#a1dada41] w-full pl-12 rounded-lg border focus:border-[#7DDDD9] focus:outline-none"
              />
              {errors.email?.type === "required" && (
                <p className="text-red-500">Email is required</p>
              )}
            </div>

            <div className="relative">
              <div className="h-10 w-10 flex justify-center items-center absolute top-0 left-0 bg-[#95D0D4] rounded-lg">
                <i className="fa-solid fa-key text-xl text-white"></i>
              </div>
              <input
                id="in3"
                type={showPass ? "text" : "password"}
                {...register("pass", {
                  required: true,
                  minLength: 6,
                  maxLength: 20,
                  pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                })}
                placeholder="Password"
                className="input h-10 text-sm bg-[#a1dada41] w-full pl-12 rounded-lg border focus:border-[#7DDDD9] focus:outline-none"
              />
              <span
                className=" text-sm absolute right-4 translate-y-[50%]"
                onClick={() => setShowPass(!showPass)}
              >
                {showPass ? (
                  <i className="fa-solid fa-eye-slash"></i>
                ) : (
                  <i className="fa-solid fa-eye"></i>
                )}
              </span>
              {errors.pass?.type === "required" && (
                <p className="text-sm text-red-500 ml-5 mt-4">
                  Password is required
                </p>
              )}
              {errors.pass?.type === "minLength" && (
                <p className="text-sm text-red-500 ml-5 mt-4">
                  Password has to be at least 6 characters long
                </p>
              )}
              {errors.pass?.type === "pattern" && (
                <p className="text-sm text-red-500 ml-5 mt-4">
                  <ul className="list-disc">
                    Password must have at least
                    <li>1 uppercase letter</li>
                    <li>1 lowercase letter</li>
                    <li>1 digit</li>
                    <li>1 special character</li>
                  </ul>
                </p>
              )}
            </div>

            <div className="form-control text-sm w-full">
              <label className="label">
                <span className="label-text">Pick your profile picture</span>
              </label>
              <input
                type="file"
                {...register("photo")}
                className="file-input h-10 text-sm file-input-bordered w-full"
              />
            </div>

            <input
              type="submit"
              value="Sign Up"
              className="btn w-1/2 mx-auto bg-[#FE7E51] text-lg font-medium text-white hover:text-[#FE7E51] normal-case rounded-lg"
            />
          </form>
          <div className="w-full h-fit flex flex-col items-center gap-4 text-sm">
            <p className="text-[#444] text-center">
              Already registered?
              <Link className="font-bold" to="/login">
                Go to log in
              </Link>
            </p>
            <p className="font-medium">Or sign in with</p>

            <BiLogoGoogle
              className="btn w-1/2 mx-auto bg-[#FE7E51] text-white hover:text-[#FE7E51] rounded-lg"
              onClick={handleRegistrationWithGoogle}
            ></BiLogoGoogle>
          </div>
        </div>
      </div>

      {/* for tablets */}
      <div className="hidden sm:flex lg:hidden w-full h-full bg-[url('public/reg-bg2.png')] bg-center bg-no-repeat bg-cover justify-center items-center">
        <div className="w-[60%] h-fit bg-[rgba(255,255,255,0.73)] flex flex-col justify-center items-center gap-4 p-10 rounded-[60px] shadow-xl shadow-[rgba(41,38,38,0.71)]">
          <form
            className="w-full h-fit flex flex-col gap-3 px-0 text-left"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h1 className="text-[#444] text-4xl font-semibold text-center">
              Sign UP
            </h1>

            <div className="relative">
              <div className="h-[48px] w-[48px] flex justify-center items-center absolute top-0 left-0 bg-[#95D0D4] rounded-lg">
                <i className="fa-solid fa-signature text-xl text-white"></i>
              </div>
              <input
                id="in1"
                type="text"
                {...register("name", { required: true })}
                placeholder="Name"
                className="input bg-[#a1dada41] w-full pl-16 rounded-lg border focus:border-[#7DDDD9] focus:outline-none"
              />
              {errors.name?.type === "required" && (
                <p className="text-red-500">Name is required</p>
              )}
            </div>

            <div className="relative">
              <div className="h-[48px] w-[48px] flex justify-center items-center absolute top-0 left-0 bg-[#95D0D4] rounded-lg">
                <i className="fa-solid fa-envelope text-xl text-white"></i>
              </div>
              <input
                id="in2"
                type="email"
                {...register("email", { required: true })}
                placeholder="Email"
                className="input bg-[#a1dada41] w-full pl-16 rounded-lg border focus:border-[#7DDDD9] focus:outline-none"
              />
              {errors.email?.type === "required" && (
                <p className="text-red-500">Email is required</p>
              )}
            </div>

            <div className="relative">
              <div className="h-[48px] w-[48px] flex justify-center items-center absolute top-0 left-0 bg-[#95D0D4] rounded-lg">
                <i className="fa-solid fa-key text-xl text-white"></i>
              </div>
              <input
                id="in3"
                type={showPass ? "text" : "password"}
                {...register("pass", {
                  required: true,
                  minLength: 6,
                  maxLength: 20,
                  pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                })}
                placeholder="Password"
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
              {errors.pass?.type === "required" && (
                <p className="text-red-500">Password is required</p>
              )}
              {errors.pass?.type === "minLength" && (
                <p className="text-red-500">
                  Password has to be at least 6 characters long
                </p>
              )}
              {errors.pass?.type === "pattern" && (
                <p className="text-red-500">
                  <ul className="list-disc">
                    Password must have at least
                    <li>1 uppercase letter</li>
                    <li>1 lowercase letter</li>
                    <li>1 digit</li>
                    <li>1 special character</li>
                  </ul>
                </p>
              )}
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text text-base">
                  Pick your profile picture
                </span>
              </label>
              <input
                type="file"
                {...register("photo")}
                className="file-input file-input-bordered w-full"
              />
            </div>

            <input
              type="submit"
              value="Sign Up"
              className="btn w-1/2 mx-auto bg-[#FE7E51] text-lg font-medium text-white hover:text-[#FE7E51] normal-case rounded-lg"
            />
          </form>
          <div className="w-full h-fit flex flex-col items-center gap-4 px-0">
            <p className="text-lg text-[#444] text-center">
              Already registered?
              <Link className="font-bold" to="/login">
                Go to log in
              </Link>
            </p>
            <p className="text-lg font-medium">Or sign in with</p>

            <BiLogoGoogle
              className="btn w-1/2 mx-auto bg-[#FE7E51] text-lg font-medium text-white hover:text-[#FE7E51] normal-case rounded-lg"
              onClick={handleRegistrationWithGoogle}
            ></BiLogoGoogle>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
