import React, { useState } from "react";
import { signUpClient } from "../service/apiService";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const navigate = useNavigate();
  const [clientDetails, setClientDetails] = useState({
    firstname: "",
    lastname: "",
    phoneNumber: "",
    email: "",
    username: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({
    firstname: "",
    lastname: "",
    phoneNumber: "",
    email: "",
    username: "",
    password: "",
  });

  const validate = () => {
    const validationErrors = {};

    if (!/^[a-zA-Z]{2,50}$/.test(clientDetails.firstname)) {
      validationErrors.firstname =
        "Firstname must be between 2 and 50 characters and contain only letters";
    }

    if (!/^[a-zA-Z]{2,50}$/.test(clientDetails.lastname)) {
      validationErrors.lastname =
        "Lastname must be between 2 and 50 characters and contain only letters";
    }

    if (!/^254\d{9}$/.test(clientDetails.phoneNumber)) {
      validationErrors.phoneNumber =
        "Phone number must be 12 characters, start with 254, and contain only digits";
    }

    if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
        clientDetails.email
      )
    ) {
      validationErrors.email = "Please enter a valid email address";
    }

    if (!/^[a-zA-Z0-9]{2,50}$/.test(clientDetails.username)) {
      validationErrors.username =
        "Username must be between 2 and 50 characters and contain only letters and digits";
    }

    if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/.test(
        clientDetails.password
      )
    ) {
      validationErrors.password =
        "Password must be at least 8 characters, contain at least one uppercase letter, one lowercase letter, one digit, and one special character";
    }

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const createClient = async (e) => {
    e.preventDefault();
    if (!validate()) {
      toast.error("Please fix the highlighted errors before submitting.");
      return;
    }

    setIsLoading(true);
    try {
      await signUpClient(clientDetails);
      toast.success("Client created successfully!");
      navigate("/login");
    } catch (error) {
      toast.error("Error creating client. Please try again.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="p-10">
        <div className="flex w-96 flex-col space-y-5 rounded-lg border py-10 px-5 shadow-xl mx-auto bg-white dark:bg-gray-800">
          <div className="mx-auto mb-2 space-y-3">
            <h1 className="text-3xl font-bold text-gray-700 dark:text-gray-100">
              Sign up to Stewart
            </h1>
          </div>

          <form onSubmit={createClient}>
            <div className="relative mt-2 w-full">
              <input
                type="text"
                id="firstname"
                className="border-1 peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:text-gray-100"
                value={clientDetails.firstname}
                onChange={(e) => {
                  setClientDetails((currentState) => ({
                    ...currentState,
                    firstname: e.target.value,
                  }));
                }}
                required
                placeholder=" "
              />
              <label
                htmlFor="firstname"
                className="before:content-['*'] before:ml-0.5 before:text-pink-500 absolute top-2 left-1 z-10 origin-[0] -translate-y-4 scale-75 transform cursor-text select-none bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600"
              >
                Firstname
              </label>
              {errors.firstname && (
                <span className="text-sm text-red-600">{errors.firstname}</span>
              )}
            </div>
            <div className="relative mt-2 w-full">
              <input
                type="text"
                id="lastname"
                className="border-1 peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:text-gray-100"
                value={clientDetails.lastname}
                onChange={(e) => {
                  setClientDetails((currentState) => ({
                    ...currentState,
                    lastname: e.target.value,
                  }));
                }}
                required
                placeholder=""
              />
              <label
                htmlFor="lastname"
                className="before:content-['*'] before:ml-0.5 before:text-pink-500 absolute top-2 left-1 z-10 origin-[0] -translate-y-4 scale-75 transform cursor-text select-none bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600"
              >
                Lastname
              </label>
              {errors.lastname && (
                <span className="text-sm text-red-600">{errors.lastname}</span>
              )}
            </div>
            <div className="relative mt-2 w-full">
              <input
                type="text"
                id="phoneNumber"
                className="border-1 peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:text-gray-100"
                value={clientDetails.phoneNumber}
                onChange={(e) => {
                  setClientDetails((currentState) => ({
                    ...currentState,
                    phoneNumber: e.target.value,
                  }));
                }}
                required
                placeholder=""
              />
              <label
                htmlFor="phoneNumber"
                className="before:content-['*'] before:ml-0.5 before:text-pink-500 absolute top-2 left-1 z-10 origin-[0] -translate-y-4 scale-75 transform cursor-text select-none bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600"
              >
                Phone Number
              </label>
              {errors.phoneNumber && (
                <span className="text-sm text-red-600">
                  {errors.phoneNumber}
                </span>
              )}
            </div>
            <div className="relative mt-2 w-full">
              <input
                type="email"
                id="email"
                className="border-1 peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:text-gray-100"
                value={clientDetails.email}
                onChange={(e) => {
                  setClientDetails((currentState) => ({
                    ...currentState,
                    email: e.target.value,
                  }));
                }}
                required
                placeholder=""
              />
              <label
                htmlFor="email"
                className="before:content-['*'] before:ml-0.5 before:text-pink-500 absolute top-2 left-1 z-10 origin-[0] -translate-y-4 scale-75 transform cursor-text select-none bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600"
              >
                Email
              </label>
              {errors.email && (
                <span className="text-sm text-red-600">{errors.email}</span>
              )}
            </div>
            <div className="relative mt-2 w-full">
              <input
                type="text"
                id="username"
                className="border-1 peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:text-gray-100"
                value={clientDetails.username}
                onChange={(e) => {
                  setClientDetails((currentState) => ({
                    ...currentState,
                    username: e.target.value,
                  }));
                }}
                required
                placeholder=""
              />
              <label
                htmlFor="username"
                className="before:content-['*'] before:ml-0.5 before:text-pink-500 absolute top-2 left-1 z-10 origin-[0] -translate-y-4 scale-75 transform cursor-text select-none bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600"
              >
                Username
              </label>
              {errors.username && (
                <span className="text-sm text-red-600">{errors.username}</span>
              )}
            </div>

            <div className="relative mt-2 w-full">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className="border-1 peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:text-gray-100"
                value={clientDetails.password}
                onChange={(e) => {
                  setClientDetails((currentState) => ({
                    ...currentState,
                    password: e.target.value,
                  }));
                }}
                required
                placeholder=""
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-4 text-sm text-gray-500"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
              <label
                htmlFor="password"
                className="before:content-['*'] before:ml-0.5 before:text-pink-500 absolute top-2 left-1 z-10 origin-[0] -translate-y-4 scale-75 transform cursor-text select-none bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600"
              >
                Password
              </label>
              {errors.password && (
                <span className="text-sm text-red-600">{errors.password}</span>
              )}
            </div>

            <button
              type="submit"
              className="rounded-lg bg-blue-600 py-3 font-bold text-white w-full mt-4"
              disabled={isLoading}
            >
              {isLoading ? "Signing Up..." : "Signup"}
            </button>
          </form>

          <div className="text-center text-sm text-gray-600">
            Already a Member?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Log in here
            </Link>
          </div>
          <div className="text-center text-sm text-gray-600">
            <a href="/" className="text-blue-600 hover:underline">
              Take me home
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
