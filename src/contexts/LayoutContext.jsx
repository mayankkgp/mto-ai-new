import React, { createContext, useContext } from 'react';

const LayoutContext = createContext({ isCompact: false });

export const useLayoutContext = () => useContext(LayoutContext);

export const LayoutProvider = ({ isCompact, children }) => {
  return (
    <LayoutContext.Provider value={{ isCompact }}>
      {children}
    </LayoutContext.Provider>
  );
};
