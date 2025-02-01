// Modal.js
import React, { useState } from "react";

const AddClientModal = ({ isOpen, closeModal }) => {
  if (!isOpen) return null; // If the modal is not open, return null

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Add Client</h2>
        <form>
          <div className="mb-4">
            <label className="before:content-['*'] before:ml-0.5 before:text-pink-500  block mb-2 text-sm font-medium text-gray-900">
              Firstname
            </label>
            <input
              type="text"
              className="w-full p-2 border rounded-lg"
              placeholder="Enter full name"
            />
          </div>
          <div className="mb-4">
            <label className="before:content-['*'] before:ml-0.5 before:text-pink-500  block mb-2 text-sm font-medium text-gray-900">
              Lastname
            </label>
            <input
              type="text"
              className="w-full p-2 border rounded-lg"
              placeholder="Enter full name"
            />
          </div>
          <div className="mb-4">
            <label className="before:content-['*'] before:ml-0.5 before:text-pink-500  block mb-2 text-sm font-medium text-gray-900">
              Phone Number
            </label>
            <input
              type="text"
              className="w-full p-2 border rounded-lg"
              placeholder="Enter full name"
            />
          </div>
          <div className="mb-4">
            <label className="before:content-['*'] before:ml-0.5 before:text-pink-500  block mb-2 text-sm font-medium text-gray-900">
              Email
            </label>
            <input
              type="text"
              className="w-full p-2 border rounded-lg"
              placeholder="Enter full name"
            />
          </div>
          <div className="mb-4">
            <label className="before:content-['*'] before:ml-0.5 before:text-pink-500  block mb-2 text-sm font-medium text-gray-900">
              Username
            </label>
            <input
              type="text"
              className="w-full p-2 border rounded-lg"
              placeholder="Enter phone number"
            />
          </div>
          <div className="mb-4">
            <label className="before:content-['*'] before:ml-0.5 before:text-pink-500  block mb-2 text-sm font-medium text-gray-900">
              Password
            </label>
            <input
              type="email"
              className="w-full p-2 border rounded-lg"
              placeholder="Enter email"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="bg-gray-500 text-white px-4 py-2 rounded-md mr-2"
              onClick={closeModal}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Save Client
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddClientModal;
