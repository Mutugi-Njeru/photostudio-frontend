import React, { useEffect, useState } from "react";
import ClientCards from "./ClientCards";
import AddClientModal from "./AddClientModal";
import { getAllClients } from "../../../service/apiService";

const Clients = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clients, setClients] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const clientsPerPage = 5;

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    getClients();
  }, []);

  const getClients = async () => {
    try {
      const response = await getAllClients();
      setClients(response.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  // Filter clients based on search query
  const filteredClients = clients.filter((client) =>
    client.fullname.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination logic
  const indexOfLastClient = currentPage * clientsPerPage;
  const indexOfFirstClient = indexOfLastClient - clientsPerPage;
  const currentClients = filteredClients.slice(
    indexOfFirstClient,
    indexOfLastClient
  );

  const nextPage = () => {
    if (indexOfLastClient < filteredClients.length) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <div className="p-4">
      <ClientCards />
      <h1 className="text-2xl font-semibold">Clients</h1>

      {/* Search and Add Client Section */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-4 mt-4">
        <button
          type="button"
          className="text-white bg-gray-800 hover:bg-gray-900 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5"
          onClick={openModal}
        >
          Add Client
        </button>

        {/* Search Input */}
        <form
          className="w-full sm:max-w-md mt-2 sm:mt-0"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="relative">
            <input
              type="search"
              className="w-full p-3 pl-10 text-sm border rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search Clients"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </form>
      </div>

      {/* Clients Table */}
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th className="p-4">
                <input type="checkbox" className="w-4 h-4" />
              </th>
              <th className="px-4 py-3">Fullname</th>
              <th className="px-4 py-3 hidden lg:table-cell">Joined</th>
              <th className="px-4 py-3 hidden sm:table-cell">Phone</th>
              <th className="px-4 py-3 hidden sm:table-cell">Email</th>
              <th className="px-4 py-3 hidden md:table-cell">Username</th>
              <th className="px-4 py-3 hidden md:table-cell">Sessions</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentClients.length > 0 ? (
              currentClients.map((client, index) => (
                <tr key={index} className="bg-white border-b hover:bg-gray-50">
                  <td className="p-4">
                    <input type="checkbox" className="w-4 h-4" />
                  </td>
                  <td className="px-4 py-4 font-medium text-gray-900">
                    {client.fullname}
                  </td>
                  <td className="px-4 py-4 hidden sm:table-cell">
                    {client.dateOfJoin}
                  </td>
                  <td className="px-4 py-4 hidden sm:table-cell">
                    {client.phone}
                  </td>
                  <td className="px-4 py-4 hidden md:table-cell">
                    {client.email}
                  </td>
                  <td className="px-4 py-4 hidden md:table-cell">
                    {client.username}
                  </td>
                  <td className="px-4 py-4">{client.sessions}</td>
                  <td className="px-4 py-4 hidden lg:table-cell">
                    {client.status}
                  </td>
                  <td className="px-4 py-4 flex space-x-3">
                    <a href="#" className="text-blue-600 hover:underline">
                      Activate
                    </a>
                    <a href="#" className="text-red-600 hover:underline">
                      Deactivate
                    </a>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="text-center p-4">
                  No clients found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between mt-4">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className={`px-4 py-2 text-white font-medium rounded-lg ${
            currentPage === 1
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-700 hover:bg-blue-800"
          }`}
        >
          Previous
        </button>
        <span className="text-sm font-medium text-gray-600">
          Page {currentPage} of{" "}
          {Math.ceil(filteredClients.length / clientsPerPage)}
        </span>
        <button
          onClick={nextPage}
          disabled={indexOfLastClient >= filteredClients.length}
          className={`px-4 py-2 text-white font-medium rounded-lg ${
            indexOfLastClient >= filteredClients.length
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-700 hover:bg-blue-800"
          }`}
        >
          Next
        </button>
      </div>

      <AddClientModal isOpen={isModalOpen} closeModal={closeModal} />
    </div>
  );
};

export default Clients;
