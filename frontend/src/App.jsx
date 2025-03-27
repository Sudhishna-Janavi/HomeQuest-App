import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import TenantDashboard from "./pages/TenantDashboard";
import WatchList from "./pages/WatchList";
import { WatchlistProvider } from "./context/WatchListContext"; // Import the context provider
import LandlordDashboard from "./pages/LandlordDashboard";
import CreateListingForm from "./pages/CreateListingForm";

function App() {
  return (
    <WatchlistProvider> {/* Wrap your app with WatchlistProvider */}
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tenant-dashboard" element={<TenantDashboard />} />
          <Route path="/watchlist" element={<WatchList />} />
          <Route path = "/landlord-dashboard" element = {<LandlordDashboard />} />
          <Route path = "/create-listing" element = {<CreateListingForm />} />
        </Routes>
      </Router>
    </WatchlistProvider>
  );
}

export default App;

