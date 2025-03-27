import React from "react";
import "../styles/Watchlist.css";

function Watchlist({ watchlist, toggleWatchlist }) {
  return (
    <div className="watchlist-container">
      <h2>My Watchlist</h2>
      {watchlist.length === 0 ? (
        <p className = "noPropPlaceholder">No properties in watchlist.</p>
      ) : (
        <div className="watchlist">
          {watchlist.map((property) => (
            <div key={property.id} className="watchlist-item">
              <img src={property.image} alt={property.title} />
              <div>
                <h3>{property.title}</h3>
                <p>{property.location}</p>
                <p>${property.price}/month</p>
              </div>
              <button onClick={() => toggleWatchlist(property)}>Remove</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Watchlist;
