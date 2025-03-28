// SuspendAccounts.jsx
import React from "react";

const SuspendAccounts = () => {
  const users = [
    { id: 1, username: "trouble_user", status: "Active" },
    { id: 2, username: "spam_bot", status: "Suspended" },
  ];

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Suspend User Accounts</h2>
      {users.map((user) => (
        <div key={user.id} className="flex justify-between p-4 bg-white mb-2 rounded shadow">
          <span>{user.username}</span>
          <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
            {user.status === "Active" ? "Suspend" : "Reinstate"}
          </button>
        </div>
      ))}
    </div>
  );
};

export default SuspendAccounts;