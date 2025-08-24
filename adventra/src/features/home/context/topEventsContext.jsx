import  { createContext, useContext } from "react";

const TopEventsContext = createContext([]);

export const TopEventsProvider = ({ children, value }) => {
  return (
    <TopEventsContext.Provider value={value}>
      {children}
    </TopEventsContext.Provider>
  );
};

export const useTopEvents = () => useContext(TopEventsContext);
