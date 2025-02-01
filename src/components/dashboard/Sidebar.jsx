import {
  FiHome,
  FiUsers,
  FiSettings,
  FiBox,
  FiBarChart2,
  FiX,
} from "react-icons/fi";
import { Link } from "react-router-dom";

function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={onClose}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`
        fixed lg:static inset-y-0 left-0 transform 
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 transition-transform duration-300 ease-in-out
        bg-gray-800 text-white w-64 min-h-screen p-4 z-30
      `}
      >
        <div className="flex justify-between items-center mb-8">
          <div className="text-2xl font-bold">Stewart</div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-700 lg:hidden"
          >
            <FiX className="text-xl" />
          </button>
        </div>
        <nav>
          <ul className="space-y-2">
            <li>
              <Link
                to="/admin"
                className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded"
                onClick={onClose}
              >
                <FiHome className="text-xl" />
                <span>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                to="/clients"
                className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded"
                onClick={onClose}
              >
                <FiUsers className="text-xl" />
                <span>Clients</span>
              </Link>
            </li>
            <li>
              <Link
                to="/sessions"
                className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded"
                onClick={onClose}
              >
                <FiBox className="text-xl" />
                <span>Sessions</span>
              </Link>
            </li>
            <li>
              <Link
                to="/users"
                className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded"
                onClick={onClose}
              >
                <FiUsers className="text-xl" />
                <span>Users</span>
              </Link>
            </li>
            <li>
              <Link
                to="/settings"
                className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded"
                onClick={onClose}
              >
                <FiSettings className="text-xl" />
                <span>Settings</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}

export default Sidebar;
