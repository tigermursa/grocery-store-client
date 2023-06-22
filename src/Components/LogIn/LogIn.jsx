import React, { useContext, useState } from "react";
import { FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { GoogleAuthProvider } from "firebase/auth";
import { AuthContext } from "../Provider/AuthProvider";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import "./LogIn.css"
const LogIn = () => {
  const { signIn, signInGoogle } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSignInForm = (data) => {
    const { email, password } = data;
    setErrorMessage("");

    signIn(email, password)
      .then((result) => {
        const loggedInUser = result.user;
        console.log(loggedInUser);
        Swal.fire({
          icon: "success",
          title: "Login Successful",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(from) || "/";
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage("Invalid email or password");
      });
  };

  const googleProvider = new GoogleAuthProvider();

  const handleGoogleSignIn = () => {
    signInGoogle(googleProvider)
      .then((result) => {
        const theUser = result.user;
        console.log(theUser);
        const saveUser = {
          name: theUser.displayName,
          email: theUser.email,
          image: theUser.photoURL,
        };
        fetch(`https://server-tea-chat.vercel.app/users`, {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(saveUser),
        });
        Swal.fire({
          icon: "success",
          title: "Login Successful",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(from) || "/";
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex justify-center items-center h-screen loginBg">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-2xl font-bold mb-4">Login Form</h1>
        {errorMessage && (
          <p className="text-red-600 font-bold mb-4">{errorMessage}</p>
        )}
        <form onSubmit={handleSubmit(handleSignInForm)}>
          <div className="mb-4">
            <input
              type="text"
              name="email"
              {...register("email", { required: "Email or Phone is required" })}
              placeholder="Email or Phone"
              className="border border-gray-300 rounded-full py-2 px-4 w-full focus:outline-none"
            />
            {errors.email && (
              <p className="text-red-600 mt-1">{errors.email.message}</p>
            )}
          </div>
          <div className="relative mb-4">
            <input
              type={showPassword ? "text" : "password"}
              className="border border-gray-300 rounded-full py-2 px-4 w-full  focus:outline-none"
              name="password"
              {...register("password", { required: "Password is required" })}
              placeholder="Password"
            />
            <span
              className="cursor-pointer absolute right-3 top-1/2 transform -translate-y-1/2"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? (
                <FaEyeSlash className="text-gray-500" />
              ) : (
                <FaEye className="text-gray-500" />
              )}
            </span>
            {errors.password && (
              <p className="text-red-600 mt-1">{errors.password.message}</p>
            )}
          </div>

          <div className="text-center mb-4">
            <p className="text-blue-500">Forgot Password?</p>
          </div>
          <div className="mb-4">
            <input
              className="bg-blue-500 text-white font-bold rounded-full py-2 px-4 w-full cursor-pointer"
              type="submit"
              value="LOGIN"
            />
          </div>
        </form>
        <div className="text-center mb-4">Or login with</div>
        <div className="text-center">
          <button
            onClick={handleGoogleSignIn}
            className="bg-white border border-gray-300 rounded-full py-2 px-4 flex items-center m-auto shadow-md hover:bg-gray-100"
          >
            <FaGoogle className="text-xl text-red-500" />
            <span className="ml-2">Google</span>
          </button>
        </div>
        <div className="text-center mt-4">
          <p>
            Don't have an account?{" "}
            <span className="font-semibold text-blue-600">
              <Link to="/signup"> Sign up now</Link>
            </span>
          </p>
        </div>
        <div className="text-center mt-4">
          <Link to="/">Go to Home</Link>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
