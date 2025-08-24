import { createContext, useContext } from "react";

const LatestEventsContext = createContext([]);

export const LatestEventsProvider = ({ children, value }) => (
  <LatestEventsContext.Provider value={value}>
    {children}
  </LatestEventsContext.Provider>
);

export const useLatestEvents = () => useContext(LatestEventsContext);
