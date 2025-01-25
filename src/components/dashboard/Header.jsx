import { FiBell, FiUser, FiMenu } from "react-icons/fi";
import { useState, useEffect, useRef } from "react";

function Header({ onMenuClick }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Function to toggle dropdown
  const handleDropdownToggle = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  // Close the dropdown if clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Placeholder functions for actions
  const handleLogout = () => {
    alert("Logout functionality triggered");
  };

  const handleDeactivate = () => {
    alert("Deactivate functionality triggered");
  };

  return (
    <header className="bg-white shadow-md p-4">
      <div className="flex justify-between items-center">
        {/* Left Side */}
        <div className="flex items-center">
          <button
            onClick={onMenuClick}
            className="p-2 hover:bg-gray-100 rounded-full lg:hidden"
          >
            <FiMenu className="text-xl text-gray-600" />
          </button>
          <div className="text-xl font-semibold text-gray-700 ml-2">
            Dashboard
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center space-x-4">
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <FiBell className="text-xl text-gray-600" />
          </button>

          {/* Dropdown Menu */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={handleDropdownToggle}
              className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-full"
            >
              <FiUser className="text-xl text-gray-600" />
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-10">
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Logout
                </button>
                <button
                  onClick={handleDeactivate}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Deactivate
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
