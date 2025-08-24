import  { createContext, useContext } from "react";

const TopRatedGuidesContext = createContext([]);

export const TopRatedGuidesProvider = ({ children, value }) => {
  return (
    <TopRatedGuidesContext.Provider value={value}>
      {children}
    </TopRatedGuidesContext.Provider>
  );
};

export const useTopRatedGuides = () => useContext(TopRatedGuidesContext);
