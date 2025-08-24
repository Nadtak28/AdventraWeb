import { createContext, useContext } from "react";

const EventsByCategoryContext = createContext([]);

export const EventsByCategoryProvider = ({ children, value }) => (
  <EventsByCategoryContext.Provider value={value}>
    {children}
  </EventsByCategoryContext.Provider>
);
export const useEventsByCategory = () => useContext(EventsByCategoryContext);
