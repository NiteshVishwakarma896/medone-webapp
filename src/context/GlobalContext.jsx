import { createContext, useContext, useEffect, useState } from "react";
export const GlobalContext = createContext();

export const GlobalDataProvider = ({ children })=>{
  const [globalData, setGlobalData] = useState({
    token:null,
    name:null,
    email:null,
  });
  const [globalLocation, setGlobalLocation] = useState({
    location:null,
    pincode:null,
    state:null,
  });
  const locationLocalStorage = JSON.parse(localStorage.getItem('locationGlobal'))
  const userLocalStorage = JSON.parse(localStorage.getItem('user'))

  useEffect(()=>{
    if(locationLocalStorage && userLocalStorage){
      setGlobalData({
        token:userLocalStorage.token,
        name:userLocalStorage.name,
        email:userLocalStorage.email,
      })
      setGlobalLocation({
        location:locationLocalStorage.location,
        pincode:locationLocalStorage.pincode,
        state:locationLocalStorage.state,
      })
    }
  },[]);

  return (
    <GlobalContext.Provider value={{globalData, setGlobalData, globalLocation, setGlobalLocation}} >
      {children}
    </GlobalContext.Provider>
  );
}

export const useGlobalData = ()=> useContext(GlobalContext);