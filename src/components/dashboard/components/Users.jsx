import React, { useEffect, useState } from "react";
import {
  deactivateUser,
  getAllUsers,
  reactivateUser,
} from "../../../service/apiService";
import { toast } from "react-toastify";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const response = await getAllUsers();
      setUsers(response.data.message);
    } catch (error) {
      console.error(error);
    }
  };
  const deactivate = async (userId) => {
    try {
      await deactivateUser(userId);
      toast.success("user deactivated successfully");
      getUsers();
    } catch (error) {
      toast.error("error deactivating user");
      console.error("Error deactivating account:", error);
    }
  };
  const reactivate = async (userId) => {
    try {
      await reactivateUser(userId);
      toast.success("user reactivated successfully");
      getUsers();
    } catch (error) {
      toast.error("error reactivating user");
      console.error("Error reactivating account:", error);
    }
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <h2 className="text-gray-900 text-xl">All Users</h2>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="p-4">
              <div className="flex items-center">
                <input
                  id="checkbox-all-search"
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label htmlFor="checkbox-all-search" className="sr-only">
                  Select All
                </label>
              </div>
            </th>
            <th className="px-6 py-3">Fullname</th>
            <th className="px-6 py-3 hidden sm:table-cell">Join Date</th>
            <th className="px-6 py-3">Phone</th>
            <th className="px-6 py-3 hidden sm:table-cell">Email</th>
            <th className="px-6 py-3">Status</th>
            <th className="px-6 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr
              key={user.userId}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <td className="w-4 p-4">
                <div className="flex items-center">
                  <input
                    id={`checkbox-table-search-${user.userId}`}
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    htmlFor={`checkbox-table-search-${user.userId}`}
                    className="sr-only"
                  >
                    checkbox
                  </label>
                </div>
              </td>
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {user.fullname}
              </th>
              <td className="px-6 py-4 hidden sm:table-cell">
                {user.joinDate}
              </td>
              <td className="px-6 py-4">{user.phone}</td>
              <td className="px-6 py-4 hidden sm:table-cell">{user.email}</td>
              <td className="px-4 py-4">
                <span
                  className={`px-3 py-1 text-sm font-medium rounded-full ${
                    user.status
                      ? "text-green-600 bg-green-100"
                      : "text-red-600 bg-red-100"
                  }`}
                >
                  {user.status ? "Active" : "Inactive"}
                </span>
              </td>
              <td className="px-4 py-4 flex space-x-3">
                {user.status ? (
                  <a
                    className="text-red-600 hover:underline cursor-pointer"
                    onClick={(e) => {
                      deactivate(user.userId);
                    }}
                  >
                    Deactivate
                  </a>
                ) : (
                  <a
                    className="text-blue-600 hover:underline cursor-pointer"
                    onClick={(e) => {
                      reactivate(user.userId);
                    }}
                  >
                    Activate
                  </a>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
