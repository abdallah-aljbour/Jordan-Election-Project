import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <nav className="bg-white p-4 rounded-md shadow-md flex space-x-4">
        <Link
          to="/overview"
          className="text-gray-800 hover:bg-gray-100 hover:text-blue-600 px-4 py-2 rounded-md border border-gray-300 transition-colors duration-300 ease-in-out"
        >
          Overview
        </Link>
        <Link
          to="/user-management"
          className="text-gray-800 hover:bg-gray-100 hover:text-blue-600 px-4 py-2 rounded-md border border-gray-300 transition-colors duration-300 ease-in-out"
        >
          User Management
        </Link>
        <Link
          to="/election-management"
          className="text-gray-800 hover:bg-gray-100 hover:text-blue-600 px-4 py-2 rounded-md border border-gray-300 transition-colors duration-300 ease-in-out"
        >
          Election Management
        </Link>
      </nav>
    </div>
  );
};

export default AdminDashboard;