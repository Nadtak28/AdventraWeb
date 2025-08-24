import { createContext, useContext } from "react";

const EventWithOfferContext = createContext([]);

export const EventWithOfferProvider = ({ children, value }) => (
  <EventWithOfferContext.Provider value={value}>
    {children}
  </EventWithOfferContext.Provider>
);

export const useEventWithOffer = () => useContext(EventWithOfferContext);
