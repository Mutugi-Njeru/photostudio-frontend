import React, { useEffect, useState } from "react";
import {
  FaCamera,
  FaCalendarAlt,
  FaUser,
  FaCreditCard,
  FaCog,
  FaSignOutAlt,
  FaUserCircle,
} from "react-icons/fa";
import {
  bookSession,
  getClientEvents,
  getStoredClientId,
  getStoredClientName,
  logout,
} from "../../service/apiService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AccountSettingsModal from "./AccountSettingsModal";

function Client() {
  const itemsPerPage = 3;
  const [currentPage, setCurrentPage] = useState(1);
  const clientName = getStoredClientName();
  const clientId = getStoredClientId();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isAccountSettingsOpen, setIsAccountSettingsOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const totalPages = Math.ceil(events.length / itemsPerPage);
  const paginatedEvents = events.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const [booking, setBooking] = useState({
    clientId: clientId,
    eventDate: "",
    location: "",
    eventType: "",
  });

  useEffect(() => {
    getEvents();
  }, [clientId]);

  const getEvents = async () => {
    try {
      const response = await getClientEvents(clientId);
      setEvents(response.data.message);
    } catch (error) {
      console.error(error);
    }
  };

  const bookEvent = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await bookSession(booking);
      toast.success("Session booked successfully");
      setBooking({
        clientId: clientId,
        eventDate: "",
        location: "",
        eventType: "",
      });
      setIsModalOpen(false);
      await getEvents(); // Now it is defined and accessible
    } catch (error) {
      toast.error("Error booking session. Please try again.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const now = new Date();
  const today = new Date(now.getTime() - now.getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, 16); // Format: YYYY-MM-DDTHH:MM

  return (
    <div className="min-h-screen bg-gray-50/95">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <FaCamera className="h-8 w-8 text-primary" />
            <h1 className="text-xl font-semibold">Stewart Dashboard</h1>
          </div>
          <button className="relative h-10 w-10 rounded-full">
            <img
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100"
              alt="Avatar"
              className="h-10 w-10 rounded-full object-cover"
            />
          </button>
        </div>
      </header>

      <main className="container py-8">
        {/* Welcome Card */}
        <div className="mb-8 p-6 bg-white rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Welcome back, {clientName}</h2>
              <p className="text-sm text-gray-500">
                Here's what's happening with your photography sessions
              </p>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-black px-4 py-2 text-white rounded flex items-center gap-2"
            >
              <FaCamera /> Book New Session
            </button>
          </div>
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl max-h-[90vh] overflow-y-auto">
              <h2 className="text-xl font-bold mb-4">Book a New Session</h2>
              <form onSubmit={bookEvent} className="space-y-6">
                <div>
                  <label className="block text-base font-medium text-gray-700">
                    Event Date and Time
                  </label>
                  <input
                    type="datetime-local"
                    name="date"
                    value={booking.eventDate}
                    onChange={(e) => {
                      setBooking((currentState) => ({
                        ...currentState,
                        eventDate: e.target.value,
                      }));
                    }}
                    min={today}
                    className="mt-2 block w-full rounded-lg border-gray-300 shadow-sm py-3 px-4"
                    required
                  />
                </div>
                <div>
                  <label className="block text-base font-medium text-gray-700">
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={booking.location}
                    onChange={(e) => {
                      setBooking((currentState) => ({
                        ...currentState,
                        location: e.target.value,
                      }));
                    }}
                    className="mt-2 block w-full rounded-lg border-gray-300 shadow-sm py-3 px-4"
                    placeholder="Location address"
                    required
                  />
                </div>
                <div>
                  <label className="block text-base font-medium text-gray-700">
                    Event Type
                  </label>
                  <input
                    type="text"
                    name="eventType"
                    value={booking.eventType}
                    onChange={(e) => {
                      setBooking((currentState) => ({
                        ...currentState,
                        eventType: e.target.value,
                      }));
                    }}
                    className="mt-2 block w-full rounded-lg border-gray-300 shadow-sm py-3 px-4"
                    placeholder="Wedding, Party, etc."
                    required
                  />
                </div>
                <div className="flex flex-col sm:flex-row justify-end gap-4">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-5 py-3 rounded-lg bg-gray-200 text-gray-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className={`px-5 py-3 rounded-lg ${
                      isLoading
                        ? "bg-gray-300 cursor-not-allowed"
                        : "bg-black text-white"
                    }`}
                    disabled={isLoading}
                  >
                    {isLoading ? "Booking..." : "Book"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="grid gap-8 grid-cols-1 md:grid-cols-7">
          {/* Main Content */}
          <div className="md:col-span-5">
            <div className="p-6 bg-white rounded-lg shadow">
              <div className="flex items-center gap-2 mb-4">
                <FaCalendarAlt className="h-5 w-5" />
                <h3 className="text-xl font-bold">Upcoming Sessions</h3>
              </div>

              <div className="space-y-6">
                {paginatedEvents.map((event) => (
                  <div
                    key={event.eventId}
                    className="flex flex-col sm:flex-row items-center gap-4 rounded-lg border p-4"
                  >
                    <img
                      src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=200&h=200"
                      alt={event.eventType}
                      className="h-16 w-16 rounded-md object-cover"
                    />
                    <div className="flex-1 space-y-1 text-center sm:text-left">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <h3 className="font-medium">{event.eventType}</h3>
                        <h3
                          className={`font-medium ${
                            event.status === "waiting approval"
                              ? "text-yellow-600"
                              : event.status === "approved"
                              ? "text-green-600"
                              : "text-gray-600"
                          }`}
                        >
                          {event.status}
                        </h3>
                        <span
                          className={`px-2 py-1 text-sm rounded ${
                            event.isActive
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {event.isActive ? "Completed" : "Pending"}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500">{event.location}</p>
                      <p className="text-sm text-gray-500">
                        Scheduled for{" "}
                        {new Date(event.eventDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination Controls */}
              <div className="flex flex-col sm:flex-row justify-center mt-6 space-y-2 sm:space-y-0 sm:space-x-2">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className={`px-4 py-2 w-full sm:w-auto rounded ${
                    currentPage === 1
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-black text-white"
                  }`}
                >
                  Previous
                </button>

                <span className="px-4 py-2 border rounded text-center">
                  {currentPage} / {totalPages}
                </span>

                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 w-full sm:w-auto rounded ${
                    currentPage === totalPages
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-black text-white"
                  }`}
                >
                  Next
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8 md:col-span-2 order-last md:order-none">
            <div className="p-6 bg-white rounded-lg shadow">
              <div className="flex items-center gap-2 mb-4">
                <FaUserCircle className="h-5 w-5" />
                <h3 className="text-xl font-bold">Profile</h3>
              </div>
              <div className="flex flex-col items-center space-y-4">
                <img
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200"
                  alt="Profile"
                  className="h-20 w-20 rounded-full object-cover"
                />
                <div className="text-center">
                  <h3 className="font-medium">{clientName}</h3>
                  <p className="text-sm text-gray-500">Premium Member</p>
                </div>
                <div className="w-full space-y-2">
                  <button
                    className="w-full px-4 py-2 border rounded flex items-center gap-2"
                    onClick={() => setIsAccountSettingsOpen(true)}
                  >
                    <FaCog /> Account Details
                  </button>
                  <button className="w-full px-4 py-2 border rounded flex items-center gap-2">
                    <FaCreditCard /> Billing
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 border rounded flex items-center gap-2 text-red-600 hover:bg-red-50"
                  >
                    <FaSignOutAlt /> Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <AccountSettingsModal
        isOpen={isAccountSettingsOpen}
        onClose={() => setIsAccountSettingsOpen(false)}
      />
    </div>
  );
}

export default Client;
