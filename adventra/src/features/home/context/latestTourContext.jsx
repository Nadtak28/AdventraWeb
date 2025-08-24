import  { createContext, useContext } from "react";

const LatestToursContext = createContext([]);

export const LatestToursProvider = ({ children, value }) => {
  return (
    <LatestToursContext.Provider value={value}>
      {children}
    </LatestToursContext.Provider>
  );
};

export const useLatestTours = () => useContext(LatestToursContext);
