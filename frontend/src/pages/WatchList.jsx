// src/pages/WatchList.js
import React from "react";
import { useWatchlist } from "../context/WatchListContext"; // Import the custom hook
import Watchlist from "../components/Watchlist";

function WatchList() {
  const { watchlist, toggleWatchlist } = useWatchlist(); // Use the watchlist from context

  return (
    <div className="watchlist-page">
      <Watchlist watchlist={watchlist} toggleWatchlist={toggleWatchlist} />
    </div>
  );
}

export default WatchList;
