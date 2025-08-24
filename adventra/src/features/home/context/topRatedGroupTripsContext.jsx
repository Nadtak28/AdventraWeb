import { createContext, useContext } from "react";

const TopRatedGroupTripsContext = createContext([]);

export const TopRatedGroupTripsProvider = ({ children, value }) => (
  <TopRatedGroupTripsContext.Provider value={value}>
    {children}
  </TopRatedGroupTripsContext.Provider>
);

export const useTopRatedGroupTrips = () => useContext(TopRatedGroupTripsContext);
