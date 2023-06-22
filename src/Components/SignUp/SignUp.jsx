import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import { GoogleAuthProvider } from "firebase/auth";
import { storage } from "../Firebase/firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Swal from "sweetalert2";
import Spinner from "../Private/Spiner";
import "./SignUp.css"

const SignUp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const { createUser, signInGoogle } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState();
  const [userPhoto, setUserPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [photoUrl, setPhotoUrl] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    const { email, password, confirm, username, gender, phone, address } = data;
    setError("");

    if (password.length < 6) {
      setError("Password must be at least 6 characters long!");
      setLoading(false);
      return;
    }
    if (!/(?=.*[A-Z])/.test(password)) {
      setError("Password must contain at least one capital letter!");
      setLoading(false);
      return;
    }

    if (!/[!@#$%^&*]/.test(password)) {
      setError("Password must contain at least one special character!");
      setLoading(false);
      return;
    }
    if (password !== confirm) {
      setError("Password did not match!");
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const url = await uploadImageToStorage();
      await createUser(email, password, username, url, gender, phone, address);
      setLoading(false);
      navigate(from) || "/login";
      setPhotoUrl(null);
      const saveUser = {
        name: data.username,
        email: data.email,
        image: url,
      };
      fetch(`https://server-tea-chat.vercel.app/users`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(saveUser),
      });
      Swal.fire({
        title: "Great",
        text: " User  account  created successfully!",
        icon: "success",
      });
    } catch (error) {
      setLoading(false);
      setError("Error occurred!");
      console.log(error);
    }
  };

  const handlePhotoChange = (event) => {
    setUserPhoto(event.target.files[0]);
  };

  const uploadImageToStorage = async () => {
    if (!userPhoto) {
      return null;
    }
    const imageRef = ref(storage, `images/${userPhoto.name}`);
    await uploadBytes(imageRef, userPhoto);
    const url = await getDownloadURL(imageRef);
    setPhotoUrl(url);
    return url;
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
        navigate(from) || "/";
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="min-h-screen  singUpBg flex justify-center items-center">
      {loading ? (
        <div className="flex justify-center items-center mt-96 mb-96">
          <Spinner></Spinner>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">
            Sign up Form
          </h1>
          {error && (
            <h1 className="text-red-600 font-bold mb-4 text-center text-lg">
              {error}
            </h1>
          )}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label className="block mb-1 font-medium text-gray-700">
                Username
              </label>
              <input
                type="text"
                name="username"
                required
                placeholder="Username"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500"
                {...register("username", { required: true })}
              />
              {errors.username && (
                <span className="text-red-600">Username is required</span>
              )}
            </div>
            <div className="mb-4">
              <label className="block mb-1 font-medium text-gray-700">
                Email or Phone
              </label>
              <input
                type="text"
                name="email"
                required
                placeholder="Email or Phone"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <span className="text-red-600">Email is required</span>
              )}
            </div>
            <div className="mb-4 p-2">
              <div>
                <input
                  className="text-center"
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block mb-1 font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500"
                  name="password"
                  required
                  placeholder="Password"
                  {...register("password", { required: true })}
                />
                <span
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              {errors.password && (
                <span className="text-red-600">Password is required</span>
              )}
            </div>
            <div className="mb-4">
              <label className="block mb-1 font-medium text-gray-700">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500"
                  name="confirm"
                  required
                  placeholder="Confirm Password"
                  {...register("confirm", { required: true })}
                />
                <span
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              {errors.confirm && (
                <span className="text-red-600">
                  Confirm Password is required
                </span>
              )}
            </div>
            <div className="text-center">
              <button className="w-full py-2 rounded-lg bg-indigo-500 text-white font-medium">
                SIGN UP
              </button>
            </div>
          </form>
          <div className="text-center mt-4">
            <p className="text-white">Forgot Password?</p>
          </div>
          <div className="mt-4 text-center">Or login with</div>
          <div className="flex justify-center mt-2">
            <button
              onClick={handleGoogleSignIn}
              className="flex items-center bg-red-500 text-white rounded-lg px-4 py-2 mt-2 mr-2"
            >
              <FaGoogle className="me-1" />
              <span>Google</span>
            </button>
          </div>
          <div className="text-center mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-indigo-500">
              Sign in
            </Link>
          </div>
          <div className="text-center mt-2">
            <Link to="/" className="text-indigo-500">
              Go to Home
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignUp;
