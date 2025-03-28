// ViewFeedback.jsx
import React from "react";

const ViewFeedback = () => {
  const feedback = [
    { id: 1, user: "Tenant123", message: "Great app!" },
    { id: 2, user: "LandlordX", message: "Please improve listing approval speed." },
  ];

  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4 bg-white bg-opacity-80">
      <div className="text-center text-black max-w-2xl w-full">
        <h1 className="text-3xl font-bold mb-6">User Feedback</h1>
        <ul>
          {feedback.map((f) => (
            <li
              key={f.id}
              className="mb-4 p-4 bg-white rounded-xl shadow text-left text-black border border-gray-200"
            >
              <strong>{f.user}</strong>: {f.message}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ViewFeedback;
