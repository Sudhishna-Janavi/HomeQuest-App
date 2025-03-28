// PropertyListingApproval.jsx
import React from "react";

const PropertyListingApproval = () => {
  const listings = [
    { id: 1, title: "Condo at Jurong", status: "Pending" },
    { id: 2, title: "HDB at Yishun", status: "Pending" },
  ];

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Approve Property Listings</h2>
      {listings.map((listing) => (
        <div key={listing.id} className="p-4 bg-white mb-2 rounded shadow flex justify-between">
          <span>{listing.title}</span>
          <div>
            <button className="bg-green-500 text-white px-3 py-1 rounded mr-2 hover:bg-green-600">Approve</button>
            <button className="bg-gray-300 text-black px-3 py-1 rounded hover:bg-gray-400">Reject</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PropertyListingApproval;