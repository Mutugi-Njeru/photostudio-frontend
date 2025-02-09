import React, { useEffect, useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { MdSecurity } from "react-icons/md";
import {
  getStoredUserId,
  getUser,
  updateUser,
  updateUserPassword,
} from "../../../service/apiService";
import { toast } from "react-toastify";

const Settings = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [originalUser, setOriginalUser] = useState(null);
  const [passwordErrors, setPasswordErrors] = useState({});
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(
    "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&h=400"
  );
  const userId = getStoredUserId();

  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    phone: "",
    email: "",
    username: "",
  });
  const [errors, setErrors] = useState({
    firstname: "",
    lastname: "",
    phone: "",
  });
  const validatePassword = () => {
    const validationErrors = {};
    if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/.test(
        password
      )
    ) {
      validationErrors.password =
        "Password must be at least 8 characters, contain at least one uppercase letter, one lowercase letter, one digit, and one special character";
    }

    setPasswordErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const validate = () => {
    const validationErrors = {};
    if (!/^[a-zA-Z]{2,50}$/.test(user.firstname)) {
      validationErrors.firstname =
        "Firstname must be between 2 and 50 characters and contain only letters";
    }
    if (!/^[a-zA-Z]{2,50}$/.test(user.lastname)) {
      validationErrors.lastname =
        "Lastname must be between 2 and 50 characters and contain only letters";
    }
    if (!/^254\d{9}$/.test(user.phone)) {
      validationErrors.phone =
        "Phone number must be 12 characters, start with 254, and contain only digits";
    }
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const response = await getUser(userId);
        const responseDetails = response.data.message;
        setUser(responseDetails);
        setOriginalUser(responseDetails);
      } catch (error) {
        console.error("Error fetching client details:", error);
      }
    };
    if (userId) {
      getUserDetails();
    }
  }, [userId]);

  const isModified =
    originalUser && JSON.stringify(user) !== JSON.stringify(originalUser);

  const updateUserData = async (e) => {
    e.preventDefault();
    if (!validate()) {
      toast.error("Please fix the highlighted errors before submitting.");
      return;
    }
    setLoading(true);
    try {
      await updateUser(userId, user);
      toast.success("Details updated successfully!");
      setOriginalUser(user);
    } catch (error) {
      toast.error("Error updating client. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value.trim(),
    }));
  };

  const updatePassword = async (e) => {
    e.preventDefault();
    if (!validatePassword()) {
      toast.error("Please fix the highlighted errors before submitting.");
      return;
    }
    try {
      await updateUserPassword(userId, { password });
      toast.success("Password updated successfully!");
      setPassword("");
    } catch (error) {
      toast.error("Error updating password. Please try again.");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Account Information Card */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Account Information
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            Edit your profile quickly
          </p>

          <div className="flex flex-col items-center">
            <div className="relative group">
              <img
                src={avatar}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover shadow-md transition-transform transform group-hover:scale-105"
              />
            </div>
          </div>

          <form onSubmit={updateUserData} className="space-y-4 mt-6">
            {["firstname", "lastname", "phone"].map((field) => (
              <div key={field}>
                <label className="block text-sm font-medium text-gray-700 capitalize">
                  {field}
                </label>
                {errors[field] && (
                  <span className="text-xs text-red-600">{errors[field]}</span>
                )}
                <input
                  type="text"
                  name={field}
                  value={user[field]}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 mt-1 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                />
              </div>
            ))}

            <button
              type="submit"
              className={`w-full py-2 rounded-md text-white font-medium transition ${
                isModified
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-gray-300 cursor-not-allowed"
              }`}
              disabled={!isModified || loading}
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </form>
        </div>

        {/* Account Credentials Card */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
            <MdSecurity className="text-blue-500" />
            Account Settings
          </h2>

          <form onSubmit={updatePassword} className="space-y-4 mt-6">
            {["username", "email"].map((field) => (
              <div key={field}>
                <label className="block text-sm font-medium text-gray-700 capitalize">
                  {field}
                </label>
                <input
                  type={field === "email" ? "email" : "text"}
                  name={field}
                  value={user[field]}
                  disabled
                  className="w-full px-4 py-2 mt-1 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                />
              </div>
            ))}

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              {passwordErrors.password && (
                <span className="text-sm text-red-600">
                  {passwordErrors.password}
                </span>
              )}
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-2 mt-1 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md font-medium transition"
            >
              Update Credentials
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Settings;
