import React, { useState, createContext } from "react";


const LocationContext = createContext<any|null>(null);

const LocationProvider = ({children}:any)=>{
    const [locationStamp, setLocationStamp] = useState([])
    

    return(
        <LocationContext.Provider value={{locationStamp, setLocationStamp}}>
            {children}
        </LocationContext.Provider>
    )
};

export {LocationContext, LocationProvider}
// const interval = setInterval(() => {
      //   console.log('This will run every second!');
      // }, 1000);
      // return () => clearInterval(interval);
      // const interval = setInterval(() => {
      //   if (locationStamp.length < MAX_STACK) {
      //     setlocationdata;
      //   }
      // }, 30000);
      // return () => clearInterval(interval);