import  { createContext, useContext } from "react";

const FeaturedCitiesContext = createContext([]);

export const FeaturedCitiesProvider = ({ children, value }) => {
  return (
    <FeaturedCitiesContext.Provider value={value}>
      {children}
    </FeaturedCitiesContext.Provider>
  );
};

export const useFeaturedCities = () => useContext(FeaturedCitiesContext);
