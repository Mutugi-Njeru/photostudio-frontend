const DashboardStats = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
        <h3 className="text-gray-500 text-sm font-medium">Total Clients</h3>
        <p className="text-xl sm:text-2xl font-bold">45</p>
        <span className="text-green-500 text-sm">+12% from last month</span>
      </div>
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
        <h3 className="text-gray-500 text-sm font-medium">
          Completed Sessions
        </h3>
        <p className="text-xl sm:text-2xl font-bold">$45,678</p>
        <span className="text-green-500 text-sm">+8% from last month</span>
      </div>
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
        <h3 className="text-gray-500 text-sm font-medium">Active Sessions</h3>
        <p className="text-xl sm:text-2xl font-bold">456</p>
        <span className="text-red-500 text-sm">-3% from last month</span>
      </div>
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
        <h3 className="text-gray-500 text-sm font-medium">Rejected Orders</h3>
        <p className="text-xl sm:text-2xl font-bold">89</p>
        <span className="text-yellow-500 text-sm">+5% from last month</span>
      </div>
    </div>
  );
};

export default DashboardStats;
