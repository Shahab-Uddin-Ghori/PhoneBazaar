import { createContext, useState } from "react";

export const AdContext = createContext();

export const AdProvider = ({ children }) => {
  const [ads, setAds] = useState([]); // Use an array for storing multiple ads

  const setAdData = (newAd) => {
    setAds((prevAds) => [...prevAds, newAd]); // Add new ad to existing ads
  };

  return (
    <AdContext.Provider value={{ ads, setAdData }}>
      {children}
    </AdContext.Provider>
  );
};
