import React, { useEffect, useState } from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import NewPassword from "./components/NewPassword";
import Dashboard from "./components/dashboard/Dashboard";
import Sidebar from "./components/dashboard/Sidebar";
import Header from "./components/dashboard/Header";
import Client from "./components/client/Client";
import { ToastContainer } from "react-toastify";
import { isUserLoggedIn, logout } from "./service/apiService";
import Clients from "./components/dashboard/components/Clients";
import Sessions from "./components/dashboard/components/Sessions";
import Users from "./components/dashboard/components/Users";
import Settings from "./components/dashboard/components/Settings";

function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  // A hook to get the current route
  const location = useLocation();

  // Define routes that should show the dashboard layout
  const dashboardRoutes = [
    "/admin",
    "/users",
    "/clients",
    "/sessions",
    "/settings",
  ];
  const isDashboardRoute = dashboardRoutes.includes(location.pathname);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp < currentTime) {
        logout();
        window.location.href = "/login";
      }
    }
  }, []);

  function AuthenticatedRoute({ children, role }) {
    const { isAuth, userRole } = isUserLoggedIn();

    if (isAuth && userRole === role) {
      return children;
    }
    return <Navigate to="/login" />;
  }

  return (
    <div className="min-h-screen">
      <div className="flex min-h-screen">
        {/* Conditionally render Sidebar and Header for dashboard routes */}
        {isDashboardRoute && (
          <Sidebar
            isOpen={isSidebarOpen}
            onClose={() => setSidebarOpen(false)}
          />
        )}
        <div className={`flex-1 ${isDashboardRoute ? "" : "w-full"}`}>
          {isDashboardRoute && <Header onMenuClick={toggleSidebar} />}

          <Routes>
            {/* Dashboard Routes */}
            <Route
              path="/admin"
              element={
                <AuthenticatedRoute role="admin">
                  <Dashboard />
                </AuthenticatedRoute>
              }
            />
            <Route
              path="/clients"
              element={
                <div className="p-6">
                  <AuthenticatedRoute role="admin">
                    <Clients />
                  </AuthenticatedRoute>
                </div>
              }
            />
            <Route
              path="/sessions"
              element={
                <div className="p-6">
                  <AuthenticatedRoute role="admin">
                    <Sessions />
                  </AuthenticatedRoute>
                </div>
              }
            />
            <Route
              path="/users"
              element={
                <div className="p-6">
                  <AuthenticatedRoute role="admin">
                    <Users />
                  </AuthenticatedRoute>
                </div>
              }
            />
            <Route
              path="/settings"
              element={
                <div className="p-6">
                  <AuthenticatedRoute role="admin">
                    <Settings />
                  </AuthenticatedRoute>
                </div>
              }
            />

            {/* Auth Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/password" element={<NewPassword />} />
            <Route
              path="/client"
              element={
                <AuthenticatedRoute role="client">
                  <Client />
                </AuthenticatedRoute>
              }
            />
          </Routes>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        toastStyle={{
          backgroundColor: "white", // White background
          color: "#333", // Gray text
        }}
      />
    </div>
  );
}

export default function RootApp() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}
