import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Existing Pages
import Home from "./pages/Home";
import TenantDashboard from "./pages/TenantDashboard";
import WatchList from "./pages/WatchList";
import LandlordDashboard from "./pages/LandlordDashboard";
import CreateListingForm from "./pages/CreateListingForm";

// Admin Pages (New!)
import AdminDashboard from "./pages/AdminDashboard";
import ViewFeedback from "./pages/ViewFeedback";
import SuspendAccounts from "./pages/SuspendAccounts";
import PropertyListingApproval from "./pages/PropertyListingApproval";
import Announcements from "./pages/Announcements";

import InvestorDashboard from "./pages/InvestorDashboard"; 


// Context
import { WatchlistProvider } from "./context/WatchListContext";

function App() {
  return (
    <WatchlistProvider>
      <Router>
        <Routes>
          {/* Existing Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/tenant-dashboard" element={<TenantDashboard />} />
          <Route path="/watchlist" element={<WatchList />} />
          <Route path="/landlord-dashboard" element={<LandlordDashboard />} />
          <Route path="/create-listing" element={<CreateListingForm />} />

          {/* Admin Routes (New!) */}
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/admin/feedback" element={<ViewFeedback />} />
          <Route path="/admin/suspend" element={<SuspendAccounts />} />
          <Route path="/admin/approval" element={<PropertyListingApproval />} />
          <Route path="/admin/announcements" element={<Announcements />} />

          <Route path="/investor-dashboard" element={<InvestorDashboard />} /> {/* ✅ Add this route */}

        </Routes>
      </Router>
    </WatchlistProvider>
  );
}

export default App;
