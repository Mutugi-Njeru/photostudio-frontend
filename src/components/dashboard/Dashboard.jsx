import { useState } from "react";
import NewUser from "./components/NewUser";
import DashboardStats from "./DashboardStats";

function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-semibold mb-6">
        Dashboard Overview
      </h2>
      <DashboardStats />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="flex items-center space-x-4 border-b pb-4"
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-200 rounded-full"></div>
                <div>
                  <p className="font-medium">User Activity {item}</p>
                  <p className="text-sm text-gray-500">2 hours ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <button
              onClick={openModal}
              className="p-3 sm:p-4 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 text-sm sm:text-base"
            >
              Add New User
            </button>
            <button className="p-3 sm:p-4 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 text-sm sm:text-base">
              Create Product
            </button>
            <button className="p-3 sm:p-4 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 text-sm sm:text-base">
              View Reports
            </button>
            <button className="p-3 sm:p-4 bg-orange-50 text-orange-600 rounded-lg hover:bg-orange-100 text-sm sm:text-base">
              Manage Orders
            </button>
          </div>
        </div>
      </div>
      <NewUser isOpen={isModalOpen} closeModal={closeModal} />
    </div>
  );
}

export default Dashboard;
