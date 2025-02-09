import React, { useEffect, useState } from "react";
import { FaCheck, FaTimes, FaEye } from "react-icons/fa";
import SessionPieChart from "./SessionPieChart";
import {
  approveEvent,
  completeEvent,
  getAllEvents,
  rejectEvent,
} from "../../../service/apiService";
import { toast } from "react-toastify";

const Sessions = () => {
  const [selectedEvent, setselectedEvent] = useState(null);
  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7; // Show 7 items per page
  const [isCompleting, setIsCompleting] = useState(false);

  const approvedCount = events.filter(
    (event) => event.status === "approved"
  ).length;
  const deniedCount = events.filter(
    (event) => event.status === "rejected"
  ).length;
  const waitingCount = events.filter(
    (event) => event.status === "waiting approval"
  ).length;
  const availableCount = events.length; // Adjust based on real criteria

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleViewClick = (product) => {
    setselectedEvent(product);
  };

  const closePopup = () => {
    setselectedEvent(null);
  };

  const fetchEvents = async () => {
    try {
      const response = await getAllEvents();
      setEvents(response.data.message);
    } catch (error) {
      console.error(error);
    }
  };
  // Calculate total pages
  const totalPages = Math.ceil(events.length / itemsPerPage);
  // Get events for the current page
  const paginatedEvents = events.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const approveAnEvent = async (eventId) => {
    try {
      await approveEvent(eventId);
      toast.success("Event approved successfully");

      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event.eventId === eventId
            ? { ...event, status: "approved", isActive: true }
            : event
        )
      );

      if (selectedEvent?.eventId === eventId) {
        setselectedEvent((prev) => ({
          ...prev,
          status: "approved",
          isActive: true,
        }));
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to approve the event");
    }
  };

  const rejectAnEvent = async (eventId) => {
    try {
      await rejectEvent(eventId);
      toast.success("Event rejected successfully");

      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event.eventId === eventId
            ? { ...event, status: "rejected", isActive: false }
            : event
        )
      );

      if (selectedEvent?.eventId === eventId) {
        setselectedEvent((prev) => ({
          ...prev,
          status: "rejected",
          isActive: false,
        }));
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to reject the event");
    }
  };
  const completeAnEvent = async (eventId) => {
    try {
      setIsCompleting(true); // Disable all buttons
      await completeEvent(eventId);
      toast.success("Event completed successfully");
      fetchEvents();
    } catch (error) {
      console.error(error);
      toast.error("Failed to complete event");
      setIsCompleting(false); // Re-enable buttons on error
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-blue-100 p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold">Approved Sessions</h3>
          <div className="flex items-center">
            <FaCheck className="text-green-500 mr-2" />
            <span className="text-2xl font-bold">{approvedCount}</span>
          </div>
        </div>
        <div className="bg-red-100 p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold">Denied Sessions</h3>
          <div className="flex items-center">
            <FaTimes className="text-red-500 mr-2" />
            <span className="text-2xl font-bold">{deniedCount}</span>
          </div>
        </div>
        <div className="bg-green-100 p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold">Total Requests</h3>
          <div className="flex items-center">
            <span className="text-2xl font-bold">{availableCount}</span>
          </div>
        </div>
      </div>

      <SessionPieChart
        approvedCount={approvedCount}
        deniedCount={deniedCount}
        waitingCount={waitingCount}
      />

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th className="px-6 py-3">Event Type</th>
              <th className="px-6 py-3">Event Date</th>
              <th className="px-6 py-3">Location</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Progress</th>
              <th className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedEvents.map((event) => (
              <tr
                key={event.eventId}
                className="bg-white border-b hover:bg-gray-50"
              >
                <th className="px-6 py-4 font-medium text-gray-900">
                  {event.eventType}
                </th>
                <td className="px-6 py-4">{event.eventDate}</td>
                <td className="px-6 py-4">{event.location}</td>
                <td
                  className={`px-6 py-4 ${
                    event.status.trim() === "waiting approval"
                      ? "text-blue-500"
                      : ""
                  } ${
                    event.status.trim() === "approved" ? "text-green-500" : ""
                  } ${
                    event.status.trim() === "rejected" ? "text-red-500" : ""
                  }`}
                >
                  {event.status}
                </td>

                <td className="px-6 py-4">
                  {event.isActive ? "Active" : "Inactive"}
                </td>

                <td className="px-6 py-4">
                  <FaEye
                    className="text-blue-600 cursor-pointer hover:text-blue-800"
                    onClick={() => handleViewClick(event)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="mx-2 px-4 py-2 bg-gray-200 text-gray-700 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="px-4 py-2 bg-blue-500 text-white rounded">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="mx-2 px-4 py-2 bg-gray-200 text-gray-700 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {selectedEvent && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">
              {selectedEvent.eventType}
            </h2>
            <p>Name: {selectedEvent.fullname}</p>
            <p>Date: {selectedEvent.eventDate}</p>
            <p>Location: {selectedEvent.location}</p>
            <p
              className={`${
                selectedEvent.status.trim() === "waiting approval"
                  ? "text-blue-500"
                  : ""
              } ${
                selectedEvent.status.trim() === "approved"
                  ? "text-green-500"
                  : ""
              } ${
                selectedEvent.status.trim() === "rejected" ? "text-red-500" : ""
              }`}
            >
              Status: {selectedEvent.status}
            </p>

            <p>Active: {selectedEvent.isActive ? "Yes" : "No"}</p>
            <div className="flex justify-between mt-4">
              <button
                className="bg-green-500 text-white px-4 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={
                  isCompleting || selectedEvent.status.trim() === "approved"
                }
                onClick={() => approveAnEvent(selectedEvent.eventId)}
              >
                Approve
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={
                  isCompleting ||
                  selectedEvent.status.trim() === "rejected" ||
                  (selectedEvent.status.trim() === "approved" &&
                    !selectedEvent.isActive)
                }
                onClick={() => rejectAnEvent(selectedEvent.eventId)}
              >
                Deny
              </button>
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={
                  isCompleting ||
                  selectedEvent.status.trim() === "waiting approval" ||
                  selectedEvent.status.trim() === "rejected" ||
                  (selectedEvent.status.trim() === "approved" &&
                    !selectedEvent.isActive)
                }
                onClick={() => completeAnEvent(selectedEvent.eventId)}
              >
                Complete
              </button>
            </div>
            <button
              className="mt-4 block w-full bg-gray-300 text-black px-4 py-2 rounded-lg"
              onClick={closePopup}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sessions;
