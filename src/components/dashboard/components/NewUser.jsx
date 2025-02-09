import React, { useState } from "react";
import { toast } from "react-toastify";
import { createUser } from "../../../service/apiService";

const NewUser = ({ isOpen, closeModal }) => {
  if (!isOpen) return null;

  const [userDetails, setUserDetails] = useState({
    firstname: "",
    lastname: "",
    phoneNumber: "",
    email: "",
    username: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const validationErrors = {};

    if (!/^[a-zA-Z]{2,50}$/.test(userDetails.firstname)) {
      validationErrors.firstname =
        "Firstname must be between 2 and 50 characters and contain only letters";
    }

    if (!/^[a-zA-Z]{2,50}$/.test(userDetails.lastname)) {
      validationErrors.lastname =
        "Lastname must be between 2 and 50 characters and contain only letters";
    }

    if (!/^254\d{9}$/.test(userDetails.phoneNumber)) {
      validationErrors.phoneNumber =
        "Phone number must be 12 characters, start with 254, and contain only digits";
    }

    if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
        userDetails.email
      )
    ) {
      validationErrors.email = "Please enter a valid email address";
    }

    if (!/^[a-zA-Z0-9]{2,50}$/.test(userDetails.username)) {
      validationErrors.username =
        "Username must be between 2 and 50 characters and contain only letters and digits";
    }

    if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/.test(
        userDetails.password
      )
    ) {
      validationErrors.password =
        "Password must be at least 8 characters, contain at least one uppercase letter, one lowercase letter, one digit, and one special character";
    }

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const signUpUser = async (e) => {
    e.preventDefault();
    if (!validate()) {
      toast.error("Please fix the highlighted errors before submitting.");
      return;
    }

    setIsLoading(true);
    try {
      await createUser(userDetails);
      console.log(userDetails);
      toast.success("User created successfully!");
      closeModal();
    } catch (error) {
      toast.error(error.response?.data?.message || "Error creating user.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <h2 className="text-xl font-semibold mb-4">Add User</h2>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-2">
          {[
            { label: "Firstname", name: "firstname" },
            { label: "Lastname", name: "lastname" },
            { label: "Phone Number", name: "phoneNumber" },
            { label: "Email", name: "email", type: "email" },
            { label: "Username", name: "username" },
          ].map(({ label, name, type = "text" }) => (
            <div key={name} className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-900">
                {label} <span className="text-pink-500">*</span>
              </label>
              {errors[name] && (
                <span className="text-sm text-red-600">{errors[name]}</span>
              )}
              <input
                type={type}
                className="w-full p-2 border rounded-lg"
                placeholder={`Enter ${label.toLowerCase()}`}
                value={userDetails[name]}
                onChange={(e) =>
                  setUserDetails((prev) => ({
                    ...prev,
                    [name]: e.target.value,
                  }))
                }
                required
              />
            </div>
          ))}

          {/* Password Input */}
          <div className="mb-4 relative">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Password <span className="text-pink-500">*</span>
            </label>
            {errors.password && (
              <span className="text-sm text-red-600">{errors.password}</span>
            )}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full p-2 border rounded-lg pr-10"
                placeholder="Enter password"
                value={userDetails.password}
                onChange={(e) =>
                  setUserDetails((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }))
                }
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-sm text-gray-500"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>
        </div>

        {/* Action Buttons (Fixed at Bottom) */}
        <div className="flex justify-end border-t pt-4 mt-4">
          <button
            type="button"
            className="bg-gray-500 text-white px-4 py-2 rounded-md mr-2"
            onClick={closeModal}
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
            onClick={signUpUser}
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : "Save Client"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewUser;
