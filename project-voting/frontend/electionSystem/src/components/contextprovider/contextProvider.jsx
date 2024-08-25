import React from "react";
import { useState } from "react";
export const Context = React.createContext();

export const ContextProvider = ({ children }) => {
  const [call, setCall] = useState("");
  return (
    <Context.Provider value={{ call: [call, setCall] }}>
      {children}
    </Context.Provider>
  );
};
