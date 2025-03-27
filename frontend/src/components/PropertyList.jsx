import React from "react";

function PropertyList({ properties = [], toggleWatchlist, watchlist }) {
  console.log("PropertyList Props:", properties); // Debugging line

  return (
    <div className="property-list">
      {properties.length === 0 ? (
        <p>No properties found.</p>
      ) : (
        properties.map((property) => (
          <div key={property.id} className="property-card">
            <img src={property.image} alt={property.title} />
            <h2>{property.title}</h2>
            <p>{property.location}</p>
            <p>${property.price}/month</p>
            <p>
              {property.bedrooms} Beds • {property.bathrooms} Baths • {property.size}
            </p>
            <button onClick={() => toggleWatchlist(property)}>
              {watchlist?.some((item) => item.id === property.id) ? "Remove from Watchlist" : "Add to Watchlist"}
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default PropertyList;

