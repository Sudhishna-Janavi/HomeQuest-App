import { useState } from "react";

function SearchBar({ onSearch, onOpenFilters }) {
  const [location, setLocation] = useState("");

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search by location..."
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />

      <button onClick={() => onSearch({ location })}>Search</button>
      <button className="filter-btn" onClick={onOpenFilters}>Filters</button>
    </div>
  );
}

export default SearchBar;

