import { createContext, useContext } from "react";

const GroupTripWithOfferContext = createContext([]);

export const GroupTripWithOfferProvider = ({ children, value }) => (
  <GroupTripWithOfferContext.Provider value={value}>
    {children}
  </GroupTripWithOfferContext.Provider>
);

export const useGroupTripWithOffer = () =>
  useContext(GroupTripWithOfferContext);
