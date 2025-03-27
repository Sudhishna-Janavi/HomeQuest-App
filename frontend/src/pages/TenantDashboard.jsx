import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useWatchlist } from "../context/WatchListContext";
import "../styles/TenantDashboard.css";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import PropertyList from "../components/PropertyList";
import Filters from "../components/Filters";

function TenantDashboard() {
  const [properties] = useState([
    { id: 1, title: "3-room HDB", location: "Orchard", price: 4095, bedrooms: 3, bathrooms: 2, size: "1600 sq meters", image: "https://source.unsplash.com/400x300/?house" },
    { id: 2, title: "Luxury Condo", location: "Marina Bay", price: 6500, bedrooms: 4, bathrooms: 3, size: "1920 sq meters", image: "https://source.unsplash.com/400x300/?luxury-house" },
  ]);

  const [filteredProperties, setFilteredProperties] = useState(properties);
  const { watchlist, toggleWatchlist } = useWatchlist();

  const [showFilters, setShowFilters] = useState(false);

  const handleSearch = ({ location }) => {
    setFilteredProperties(properties.filter((p) => p.location.toLowerCase().includes(location.toLowerCase())));
  };

  const applyFilters = ({ priceRange, bedrooms, amenities }) => {
    setFilteredProperties(
      properties.filter(
        (p) =>
          p.price >= priceRange[0] &&
          p.price <= priceRange[1] &&
          p.bedrooms >= bedrooms &&
          (amenities ? p.title.toLowerCase().includes(amenities.toLowerCase()) : true)
      )
    );
  };

  return (
    <div className="tenant-dashboard">
      <Header />
      <SearchBar onSearch={handleSearch} onOpenFilters={() => setShowFilters(true)} />

      {showFilters && <Filters onApplyFilters={applyFilters} onClose={() => setShowFilters(false)} />}

      <h2>Recommended Properties</h2>
      <PropertyList properties={filteredProperties} toggleWatchlist={toggleWatchlist} watchlist={watchlist} />

      <Link to="/watchlist">
        <button id="watchListBtn">Go to My Watchlist</button>
      </Link>
    </div>
  );
}

export default TenantDashboard;
