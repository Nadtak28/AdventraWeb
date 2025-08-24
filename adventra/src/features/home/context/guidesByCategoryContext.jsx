import { createContext, useContext } from "react";

const GuidesByCategoryContext = createContext([]);

export const GuidesByCategoryProvider = ({ children, value }) => (
  <GuidesByCategoryContext.Provider value={value}>
    {children}
  </GuidesByCategoryContext.Provider>
);

export const useGuidesByCategory = () => useContext(GuidesByCategoryContext);
