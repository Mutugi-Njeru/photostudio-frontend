import React, { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import {
  deactivateClientAccount,
  getClientDetails,
  getStoredClientId,
  logout,
  updateClientDetails,
  updateClientPassword,
} from "../../service/apiService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function AccountSettingsModal({ isOpen, onClose }) {
  if (!isOpen) return null;
  const navigate = useNavigate();
  const clientId = getStoredClientId();
  const [showConfirm, setShowConfirm] = useState(false);
  const [client, setClient] = useState({
    firstname: "",
    lastname: "",
    phone: "",
    email: "",
    username: "",
  });
  const [password, setPassword] = useState("");
  const [passwordErrors, setPasswordErrors] = useState({});
  const [originalClient, setOriginalClient] = useState(null);
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

    if (!/^[a-zA-Z]{2,50}$/.test(client.firstname)) {
      validationErrors.firstname =
        "Firstname must be between 2 and 50 characters and contain only letters";
    }

    if (!/^[a-zA-Z]{2,50}$/.test(client.lastname)) {
      validationErrors.lastname =
        "Lastname must be between 2 and 50 characters and contain only letters";
    }

    if (!/^254\d{9}$/.test(client.phone)) {
      validationErrors.phone =
        "Phone number must be 12 characters, start with 254, and contain only digits";
    }
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  useEffect(() => {
    const fetchClientDetails = async () => {
      try {
        const response = await getClientDetails(clientId);
        const responseDetails = response.data.message;
        setClient(responseDetails);
        setOriginalClient(responseDetails); // Store the original state
      } catch (error) {
        console.error("Error fetching client details:", error);
      }
    };

    if (clientId) {
      fetchClientDetails();
    }
  }, [clientId]);
  const isModified =
    originalClient && JSON.stringify(client) !== JSON.stringify(originalClient);

  const updateClient = async (e) => {
    e.preventDefault();
    if (!validate()) {
      toast.error("Please fix the highlighted errors before submitting.");
      return;
    }
    try {
      await updateClientDetails(clientId, client);
      toast.success("Details updated successfully!");
    } catch (error) {
      toast.error("Error updating client. Please try again.");
      console.error(error);
    }
  };
  const updatePassword = async (e) => {
    e.preventDefault();
    if (!validatePassword()) {
      toast.error("Please fix the highlighted errors before submitting.");
      return;
    }
    try {
      await updateClientPassword(clientId, { password });
      toast.success("Password updated successfully!");
      setPassword("");
    } catch (error) {
      toast.error("Error updating password. Please try again.");
      console.error(error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setClient((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const deactivateAccount = async () => {
    try {
      await deactivateClientAccount(clientId);
      logout();
      navigate("/login");
    } catch (error) {
      toast.error("Error deactivating account");
      console.error(error);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      role="dialog"
      aria-labelledby="account-settings-title"
    >
      <div className="bg-white rounded-lg shadow-lg p-4 w-full max-w-md">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold">Account Settings</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-black">
            <FaTimes />
          </button>
        </div>

        {/* Section 1 */}
        <form onSubmit={updateClient} className="space-y-3 mb-4">
          <h3 className="text-base font-semibold mb-2">Personal Information</h3>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              {errors.firstname && (
                <span className="text-sm text-red-600">{errors.firstname}</span>
              )}
              <input
                type="text"
                name="firstname"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm py-1 px-2 text-sm"
                value={client.firstname}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              {errors.lastname && (
                <span className="text-sm text-red-600">{errors.lastname}</span>
              )}
              <input
                type="text"
                name="lastname"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm py-1 px-2 text-sm"
                value={client.lastname}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone
            </label>
            {errors.phone && (
              <span className="text-sm text-red-600">{errors.phone}</span>
            )}
            <input
              type="tel"
              name="phone"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm py-1 px-2 text-sm"
              value={client.phone}
              onChange={handleInputChange}
              required
            />
          </div>
          <button
            type="submit"
            className={`px-4 py-1.5 rounded-md mt-3 text-sm ${
              isModified
                ? "bg-black text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
            disabled={!isModified}
          >
            Save Changes
          </button>
        </form>

        {/* Section 2 */}
        <form onSubmit={updatePassword} className="space-y-3 mb-4">
          <div className="space-y-3">
            <h3 className="text-base font-semibold mb-2">Account Details</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm py-1 px-2 text-sm"
                value={client.email}
                disabled
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm py-1 px-2 text-sm"
                value={client.username}
                disabled
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              {passwordErrors.password && (
                <span className="text-sm text-red-600">
                  {passwordErrors.password}
                </span>
              )}
              <input
                type="password"
                name="password"
                autoComplete="new-password"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm py-1 px-2 text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="bg-black text-white px-4 py-1.5 rounded-md mt-3 text-sm"
            >
              Update Password
            </button>
          </div>
        </form>

        <div className="mt-4 text-right">
          <button
            type="button"
            className="text-red-600 hover:text-red-800 text-sm "
            onClick={() => setShowConfirm(true)}
          >
            Deactivate Account
          </button>
        </div>
      </div>

      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="bg-white p-5 rounded-lg shadow-lg">
            <p className="text-lg font-medium mb-4">
              Are you sure you want to deactivate your account?
            </p>
            <div className="flex justify-end space-x-3">
              <button
                className="bg-gray-300 px-4 py-2 rounded-md"
                onClick={() => setShowConfirm(false)}
              >
                No
              </button>
              <button
                className="bg-red-600 text-white px-4 py-2 rounded-md"
                onClick={deactivateAccount}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AccountSettingsModal;
