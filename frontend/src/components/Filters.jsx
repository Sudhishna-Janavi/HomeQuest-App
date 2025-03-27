import React, { useState } from "react";
import { Range } from "react-range"; // Import the Range component
import "../styles/Filters.css";

function Filters({ onApplyFilters, onClose }) {
  const [priceRange, setPriceRange] = useState([1000, 5000]);
  const [bedrooms, setBedrooms] = useState(1);
  const [amenities, setAmenities] = useState("");

  const applyFilters = () => {
    onApplyFilters({ priceRange, bedrooms, amenities });
    onClose(); // Close modal after applying
  };

  return (
    <div className="filters-modal">
      <h3>Filters</h3>

      {/* Price Range Slider */}
      <div className="price-range-container">
        <label className="price-range-label">
          Price Range: ${priceRange[0]} - ${priceRange[1]}
        </label>

        <Range
          step={100}
          min={0}
          max={10000}
          values={priceRange}
          onChange={(values) => setPriceRange(values)}
          renderTrack={({ props, children }) => (
            <div
              {...props}
              style={{
                ...props.style,
                height: "6px",
                backgroundColor: "#ddd",
                borderRadius: "5px",
              }}
            >
              {children}
            </div>
          )}
          renderThumb={({ index, props }) => (
            <div
              {...props}
              style={{
                ...props.style,
                height: "18px",
                width: "18px",
                borderRadius: "50%",
                backgroundColor: "#5a2c8a",
                cursor: "pointer",
              }}
            />
          )}
        />
      </div>

      {/* Bedrooms Dropdown */}
      <div className="bedroom-dropdown">
        <label>Bedrooms</label>
        <select value={bedrooms} onChange={(e) => setBedrooms(Number(e.target.value))}>
          <option value="1">1+</option>
          <option value="2">2+</option>
          <option value="3">3+</option>
        </select>
      </div>

      {/* Amenities Input */}
      <div className = "amenities-input">
      <label>Amenities</label>
      <input
        type="text"
        placeholder="e.g., pool, gym"
        value={amenities}
        onChange={(e) => setAmenities(e.target.value)}
      />
      </div>

      {/* Apply Filters Button */}
      <div className="button-group">
        <button onClick={applyFilters}>Apply Filters</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default Filters;
