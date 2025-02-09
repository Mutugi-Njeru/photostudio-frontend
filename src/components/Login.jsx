import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getCLientId,
  getClientName,
  getRole,
  getUserId,
  loginUser,
  saveLoggedinUser,
  saveUserRole,
  storeClientId,
  storeClientName,
  storeToken,
  storeUserId,
} from "../service/apiService";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous errors

    if (!username || !password) {
      setError("Both fields are required.");
      return;
    }

    const auth = { username, password };
    setLoading(true);

    try {
      // Authenticate user
      const response = await loginUser(auth);
      const token = "Bearer " + response.data.accessToken;
      storeToken(token);
      saveLoggedinUser(username);

      // Fetch user role
      const userRoles = await getRole(username);
      const userRole = userRoles.data.message.role
        .replace("ROLE_", "")
        .toLowerCase();
      saveUserRole(userRole);

      // Navigate based on role
      if (userRole === "client") {
        const clientResponse = await getClientName(username);
        const name = clientResponse.data.message.name;
        const clientIdResponse = await getCLientId(username);
        const clientId = clientIdResponse.data.message.clientId;
        storeClientName(name);
        storeClientId(clientId);
        navigate("/client");
      } else if (userRole === "admin") {
        const userIdResponse = await getUserId(username);
        const userId = userIdResponse.data.message.userId;
        storeUserId(userId);
        navigate("/admin");
      }
    } catch (error) {
      setError("Login failed. Please check your credentials.");
      console.error("Login failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-10">
      <div className="flex w-96 flex-col space-y-5 rounded-lg border py-10 px-5 shadow-xl mx-auto">
        {/* Header */}
        <div className="mx-auto mb-2 space-y-3 text-center">
          <h1 className="text-3xl font-bold text-gray-700">Stewart</h1>
          <p className="text-gray-500">Login to access your account</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="text-sm text-red-600 text-center">{error}</div>
        )}

        {/* Username Input */}
        <div className="relative mt-2 w-full">
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
            placeholder=" "
            aria-label="Enter your email or username"
          />
          <label
            htmlFor="username"
            className="absolute top-2 left-1 z-10 origin-[0] -translate-y-4 scale-75 transform cursor-text select-none bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600"
          >
            Enter Your Email or Username
          </label>
        </div>

        {/* Password Input */}
        <div className="relative mt-2 w-full">
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
            placeholder=" "
            aria-label="Enter your password"
          />
          <label
            htmlFor="password"
            className="absolute top-2 left-1 z-10 origin-[0] -translate-y-4 scale-75 transform cursor-text select-none bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600"
          >
            Enter Your Password
          </label>
        </div>

        {/* Login Button */}
        <button
          className="rounded-lg bg-blue-600 py-3 font-bold text-white disabled:bg-blue-300"
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Sign-up and Forgot Password Links */}
        <div className="text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <a href="/signup" className="text-blue-600 hover:underline">
            Sign up here
          </a>
        </div>
        <div className="text-center text-sm text-gray-600">
          Forgot password?{" "}
          <a href="/password" className="text-blue-600 hover:underline">
            Click here
          </a>
        </div>
        <div className="text-center text-sm text-gray-600">
          <a href="/" className="text-blue-600 hover:underline">
            Take me home
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
