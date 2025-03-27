import React from "react";

const RequestCard = ({ property, request, onApprove, onReject }) => {
  return (
    <div className="request-card">
      <h3>{property.name}</h3>
      <p>Tenant: {request.tenant}</p>
      <p>Status: <strong>{request.status}</strong></p>
      {request.status === "Pending" && (
        <div className="request-actions">
          <button onClick={() => onApprove(property.id, request.id)}>Approve</button>
          <button onClick={() => onReject(property.id, request.id)}>Reject</button>
        </div>
      )}
    </div>
  );
};

export default RequestCard;
