import React from "react";
import { useNavigate } from "react-router-dom";
import { FaCommentDots, FaUserSlash, FaClipboardCheck, FaBullhorn } from "react-icons/fa";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const menuItems = [
    { label: "View Feedback", route: "/admin/feedback", icon: <FaCommentDots /> },
    { label: "Suspend Accounts", route: "/admin/suspend", icon: <FaUserSlash /> },
    { label: "Property Listing Approval", route: "/admin/approval", icon: <FaClipboardCheck /> },
    { label: "Announcements", route: "/admin/announcements", icon: <FaBullhorn /> },
  ];

  return (
    <div
      className="min-h-screen flex justify-center items-center px-4 bg-white bg-opacity-80 text-black"
      style={{ height: "100vh" }} // Ensure full height of viewport
    >
      <div className="text-center flex flex-col items-center justify-center w-full max-w-4xl p-4">
        {/* Avatar */}
        <div className="mb-6">
          <div className="w-20 h-20 bg-white rounded-full shadow-md flex items-center justify-center mb-2">
            <img
              src="https://img.icons8.com/ios-filled/50/000000/user.png"
              alt="User Icon"
              className="w-10 h-10"
            />
          </div>
          <h1 className="text-3xl font-bold">Admin Settings</h1>
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-2xl mb-8">
          {menuItems.map((item) => (
            <button
              key={item.label}
              onClick={() => navigate(item.route)}
              className="flex items-center justify-center gap-4 px-6 py-6 bg-white shadow-lg rounded-2xl text-xl text-gray-800 font-semibold hover:bg-blue-100 transition"
            >
              <span className="text-2xl">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </div>

        {/* Logo */}
        <div className="mt-6">
          <img
            src="/logo.png"
            alt="HomeQuest Logo"
            className="w-28 h-28 object-contain"
            onError={(e) => (e.target.style.display = 'none')}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
