// src/context/WatchlistContext.js
import React, { createContext, useContext, useState } from 'react';

const WatchlistContext = createContext();

export const useWatchlist = () => {
  return useContext(WatchlistContext);
};

export const WatchlistProvider = ({ children }) => {
  const [watchlist, setWatchlist] = useState([]);

  const toggleWatchlist = (property) => {
    setWatchlist((prevWatchlist) => {
      if (prevWatchlist.some((item) => item.id === property.id)) {
        return prevWatchlist.filter((item) => item.id !== property.id);
      } else {
        return [...prevWatchlist, property];
      }
    });
  };

  return (
    <WatchlistContext.Provider value={{ watchlist, toggleWatchlist }}>
      {children}
    </WatchlistContext.Provider>
  );
};
