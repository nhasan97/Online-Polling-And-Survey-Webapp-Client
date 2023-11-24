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
    <div className="w-full h-screen flex justify-center items-center bg-[url('src/assets/others/authentication.png')]">
      <div className="max-w-screen-xl mx-auto flex justify-center items-center shadow-xl">
        <div className="w-1/2 px-10">
          <form
            className="flex flex-col gap-4 text-left"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h1 className="text-[#444] text-[40px] font-semibold text-center">
              Sign UP
            </h1>

            <label htmlFor="in1" className="">
              Name
              <input
                id="in1"
                type="text"
                {...register("name", { required: true })}
                placeholder="Type Here"
                className="input input-bordered w-full"
              />
              {errors.name?.type === "required" && (
                <p className="text-red-500">Name is required</p>
              )}
            </label>

            <label htmlFor="in2" className="">
              Email
              <input
                id="in2"
                type="email"
                {...register("email", { required: true })}
                placeholder="Type Here"
                className="input input-bordered w-full"
              />
              {errors.email?.type === "required" && (
                <p className="text-red-500">Email is required</p>
              )}
            </label>

            <label htmlFor="in3" className="">
              Password
              <div className="relative">
                <input
                  id="in3"
                  type={showPass ? "text" : "password"}
                  {...register("pass", {
                    required: true,
                    minLength: 6,
                    maxLength: 20,
                    pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                  })}
                  placeholder="Type Here"
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
            </label>

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
              className="input w-full bg-[#D1A054] text-white"
            />
          </form>

          <div className="flex flex-col justify-center items-center gap-4 mt-4">
            <p className="text-xl text-[#D1A054] text-center">
              Already registered?
              <Link className="font-bold" to="/login">
                Go to log in
              </Link>
            </p>
            <p className="text-xl font-medium">Or sign in with</p>
            <div className="flex justify-center items-center gap-6 text-xl">
              <BiLogoGoogle
                className=" border-2 border-black rounded-full w-8 h-8"
                onClick={handleRegistrationWithGoogle}
              ></BiLogoGoogle>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
