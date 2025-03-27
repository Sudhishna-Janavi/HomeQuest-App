import React, { useState } from "react";
import "../styles/Home.css";
import PropertyList from "../components/PropertyList";
import SearchBar from "../components/SearchBar";
import Header from "../components/Header";

function Home({ isDashboard = false }) {
  const [properties] = useState([
    {
      id: 1,
      title: "3-room HDB",
      location: "Orchard",
      price: 4095,
      bedrooms: 3,
      bathrooms: 2,
      size: "5x7 m²",
      image: "https://source.unsplash.com/400x300/?house",
    },
    {
      id: 2,
      title: "Luxury Condo",
      location: "Marina Bay",
      price: 6500,
      bedrooms: 4,
      bathrooms: 3,
      size: "8x10 m²",
      image: "https://source.unsplash.com/400x300/?luxury-house",
    },
  ]);

  const [filteredProperties, setFilteredProperties] = useState(properties);

  const handleSearch = ({ location, priceRange, amenities }) => {
    const filtered = properties.filter((property) => {
      const locationMatch = property.location
        .toLowerCase()
        .includes(location.toLowerCase());
      const priceMatch = priceRange ? property.price <= priceRange : true;
      const amenitiesMatch = amenities
        ? property.title.toLowerCase().includes(amenities.toLowerCase())
        : true;

      return locationMatch && priceMatch && amenitiesMatch;
    });

    setFilteredProperties(filtered);
  };

  return (
    <div className="container">
      <Header />
      <SearchBar onSearch={handleSearch} />
      {!isDashboard && (
        <div className="filters">
          <button className="active">All</button>
          <button>Rent</button>
          <button>Sale</button>
          <button>Luxury</button>
        </div>
      )}
      <h2>{isDashboard ? "Your Recommended Properties" : "Recommended"}</h2>
      <PropertyList properties={filteredProperties} />
    </div>
  );
}

export default Home;
