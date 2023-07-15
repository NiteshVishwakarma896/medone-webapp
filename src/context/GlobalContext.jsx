import { createContext, useContext, useEffect, useState } from "react";
export const GlobalContext = createContext();

export const GlobalDataProvider = ({ children })=>{
  const [globalData, setGlobalData] = useState({
    location:null,
    pincode:null,
    state:null,
    token:null,
    name:null,
    email:null,
  });
  const locationLocalStorage = JSON.parse(localStorage.getItem('locationGlobal'))
  const userLocalStorage = JSON.parse(localStorage.getItem('user'))

  useEffect(()=>{
    if(locationLocalStorage && userLocalStorage){
      setGlobalData({
        location:locationLocalStorage.location,
        pincode:locationLocalStorage.pincode,
        state:locationLocalStorage.state,
        token:userLocalStorage.token,
        name:userLocalStorage.name,
        email:userLocalStorage.email,
      })
    }
  },[]);

  return (
    <GlobalContext.Provider value={{globalData, setGlobalData}} >
      {children}
    </GlobalContext.Provider>
  );
}

export const useGlobalData = ()=> useContext(GlobalContext);