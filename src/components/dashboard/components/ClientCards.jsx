import React from "react";

const ClientCards = ({ totalClients }) => {
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center">
          <h3 className="text-gray-600 text-sm">Total Clients</h3>
          <p className="text-2xl font-semibold text-gray-900">{totalClients}</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center">
          <h3 className="text-gray-600 text-sm">Available Products</h3>
          <p className="text-2xl font-semibold text-gray-900">85</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center">
          <h3 className="text-gray-600 text-sm">Pending Orders</h3>
          <p className="text-2xl font-semibold text-gray-900">35</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center">
          <h3 className="text-gray-600 text-sm">Total Revenue</h3>
          <p className="text-2xl font-semibold text-green-500">$56,000</p>
        </div>
      </div>
    </div>
  );
};

export default ClientCards;
