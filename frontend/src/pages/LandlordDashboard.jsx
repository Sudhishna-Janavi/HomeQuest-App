import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropertyCard from "../components/PropertyCard";
import RequestCard from "../components/RequestCard";
import "../styles/LandlordDashboard.css";

const LandlordDashboard = () => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([
    {
      id: 1,
      name: "HDB in Orchard",
      location: "Orchard, Singapore",
      price: "$1,290/month",
      rating: "4.8 (120)",
      image: "/property1.jpg",
      requests: [
        { id: 101, tenant: "John Doe", status: "Pending" },
      ],
    },
    {
        id: 2,
        name: "Condo in Marina Bay",
        location: "Marina Bay, Singapore",
        price: "$2,500/month",
        rating: "4.9 (150)",
        image: "/property2.jpg",
        requests: [
          { id: 201, tenant: "Jane Daff", status: "Pending" },
        ],
    }
    
  ]);

  const handleApprove = (propertyId, requestId) => {
    setProperties((prev) =>
      prev.map((property) => {
        if (property.id === propertyId) {
          return {
            ...property,
            requests: property.requests.map((req) =>
              req.id === requestId ? { ...req, status: "Approved" } : req
            ),
          };
        }
        return property;
      })
    );
  };

  const handleReject = (propertyId, requestId) => {
    setProperties((prev) =>
      prev.map((property) => {
        if (property.id === propertyId) {
          return {
            ...property,
            requests: property.requests.map((req) =>
              req.id === requestId ? { ...req, status: "Rejected" } : req
            ),
          };
        }
        return property;
      })
    );
  };

  return (
    <div className="landlord-dashboard">
      <div className="landlord-dashboard__properties">
        <h2 className="landlord-dashboard__title">Your Properties</h2>
        <div className="landlord-dashboard__property-actions">
          <button className="landlord-dashboard__add-property-btn" onClick = {() => navigate("/create-listing")}>Add Property</button>
          <button className="landlord-dashboard__update-details-btn">Update Details</button>
        </div>
        <div className="landlord-dashboard__property-list">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
        <button className="landlord-dashboard__see-more-btn">See more</button>
      </div>
      <div className="landlord-dashboard__requests">
        <h2 className="landlord-dashboard__title">Manage Requests</h2>
        <div className="landlord-dashboard__request-list">
          {properties.flatMap((property) =>
            property.requests.map((req) => (
              <RequestCard
                key={req.id}
                property={property}
                request={req}
                onApprove={handleApprove}
                onReject={handleReject}
              />
            ))
          )}
        </div>
        <button className="landlord-dashboard__view-details-btn">View details</button>
      </div>
    </div>
  );
};

export default LandlordDashboard;