import React from "react";

const PropertyCard = ({ property, actions }) => {
  return (
    <div className="property-card">
      <img src={property.image} alt={property.name} />
      <h3>{property.name}</h3>
      <p>{property.location}</p>
      <p>{property.price}</p>
      <p>⭐ {property.rating}</p>
      {actions && <div className="property-actions">{actions}</div>}
    </div>
  );
};

export default PropertyCard;
