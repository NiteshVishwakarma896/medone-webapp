import { createContext, useContext, useState } from "react";
export const GlobalContext = createContext();

export const GlobalDataProvider = ({ children })=>{
  const [globalData, setGlobalData] = useState({
    location:null,
    pincode:null,
    state:null,
  });

  return (
    <GlobalContext.Provider value={{globalData, setGlobalData}} >
      {children}
    </GlobalContext.Provider>
  );
}

export const useGlobalData = ()=> useContext(GlobalContext);