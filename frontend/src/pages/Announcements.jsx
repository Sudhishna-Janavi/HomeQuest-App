import React, { useState } from "react";

const Announcements = () => {
  const [message, setMessage] = useState("");
  
  // Sample posted announcements
  const [announcements, setAnnouncements] = useState([
    {
      id: 1,
      content: "🚨 Scheduled maintenance on 30th March, 12AM - 4AM.",
      timestamp: "Mar 27, 2025, 10:00 AM"
    }
  ]);

  const sendAnnouncement = () => {
    if (message.trim()) {
      const newAnnouncement = {
        id: Date.now(),
        content: message,
        timestamp: new Date().toLocaleString()
      };
      setAnnouncements([newAnnouncement, ...announcements]);
      alert("Announcement sent: " + message);
      setMessage("");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Post Announcement</h2>

      {/* Display previous announcements */}
      <div className="mb-6">
        {announcements.map((a) => (
          <div
            key={a.id}
            className="bg-purple-100 border-l-4 border-purple-500 text-purple-700 p-4 mb-3 rounded"
          >
            <p className="font-medium">{a.content}</p>
            <p className="text-xs text-gray-600 mt-1">{a.timestamp}</p>
          </div>
        ))}
      </div>

      {/* Input area */}
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="w-full p-3 border rounded mb-4"
        placeholder="Enter announcement message..."
        rows={4}
      ></textarea>
      <button
        onClick={sendAnnouncement}
        className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
      >
        Send
      </button>
    </div>
  );
};

export default Announcements;
