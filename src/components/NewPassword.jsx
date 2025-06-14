import React, { useState } from "react";
import { resetPassword } from "../service/apiService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const NewPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState({
    email: "",
  });

  const validateEmail = () => {
    const validationErrors = {};
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      validationErrors.email = "Please enter a valid email address";
    }
    setError(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!validateEmail()) {
      toast.error("Please provide a valid email before submitting.");
      return;
    }
    setIsSending(true);
    try {
      await resetPassword(email);
      toast.success("Please check your email to reset your password");
      navigate("/login");
    } catch (error) {
      toast.error("Error sending email. Please try again.");
      console.error(error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="">
      <div className="p-10">
        <div className="flex w-96 flex-col space-y-5 rounded-lg border py-10 px-5 shadow-xl mx-auto">
          <div className="mx-auto space-y-3">
            <p className="text-gray-500">
              Enter your email to reset your password
            </p>
          </div>

          <form onSubmit={handleResetPassword}>
            <div className="relative w-full">
              <input
                type="text"
                id="email"
                className="border-1 peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
                placeholder=" "
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label
                htmlFor="email"
                className="absolute top-2 left-1 z-10 origin-[0] -translate-y-4 scale-75 transform cursor-text select-none bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600"
              >
                Enter Your Email
              </label>
              {error.email && (
                <span className="text-sm text-red-600">{error.email}</span>
              )}
            </div>
            <button
              type="submit"
              className="rounded-lg bg-blue-600 py-3 font-bold text-white w-full mt-4"
              disabled={isSending}
            >
              {isSending ? "Sending..." : "Reset"}
            </button>
          </form>

          {/* Add "Sign up here" link */}
          <div className="text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <a href="/signup" className="text-blue-600 hover:underline">
              Sign up here
            </a>
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

export default NewPassword;
