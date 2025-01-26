import React, { useState } from "react";
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
  getStoredClientId,
  getStoredClientName,
  logout,
} from "../../service/apiService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const dummyBookings = [
  {
    id: 1,
    date: "2025-01-20",
    service: "Photography",
    status: "completed",
    image:
      "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=200&h=200",
  },
];

const statusColors = {
  completed: "bg-green-100 text-green-800",
  pending: "bg-yellow-100 text-yellow-800",
  cancelled: "bg-red-100 text-red-800",
};

function Client() {
  const clientName = getStoredClientName();
  const clientId = getStoredClientId();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [booking, setBooking] = useState({
    clientId: clientId,
    eventDate: "",
    location: "",
    eventType: "",
  });
  const [errors, setErrors] = useState({
    clientId: clientId,
    eventDate: "",
    location: "",
    eventType: "",
  });

  const [formData, setFormData] = useState({
    date: "",
    location: "",
    eventType: "",
  });

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
            <h1 className="text-xl font-semibold">Studio Dashboard</h1>
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
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
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
                <div className="flex justify-end gap-4">
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
                      isLoading ? "bg-gray-300" : "bg-black text-white"
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

        <div className="grid gap-8 md:grid-cols-7">
          {/* Main Content */}
          <div className="md:col-span-5">
            <div className="p-6 bg-white rounded-lg shadow">
              <div className="flex items-center gap-2 mb-4">
                <FaCalendarAlt className="h-5 w-5" />
                <h3 className="text-xl font-bold">Upcoming Sessions</h3>
              </div>
              <div className="space-y-6">
                {dummyBookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="flex items-center gap-4 rounded-lg border p-4"
                  >
                    <img
                      src={booking.image}
                      alt={booking.service}
                      className="h-16 w-16 rounded-md object-cover"
                    />
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">{booking.service}</h3>
                        <span
                          className={`px-2 py-1 text-sm rounded ${
                            statusColors[booking.status]
                          }`}
                        >
                          {booking.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500">
                        Scheduled for{" "}
                        {new Date(booking.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8 md:col-span-2">
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
                  <h3 className="font-medium">John Doe</h3>
                  <p className="text-sm text-gray-500">Premium Member</p>
                </div>
                <div className="w-full space-y-2">
                  <button className="w-full px-4 py-2 text-left border rounded flex items-center gap-2">
                    <FaCog /> Account Settings
                  </button>
                  <button className="w-full px-4 py-2 text-left border rounded flex items-center gap-2">
                    <FaCreditCard /> Billing
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 text-left border rounded flex items-center gap-2 text-red-600 hover:bg-red-50"
                  >
                    <FaSignOutAlt /> Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Client;
