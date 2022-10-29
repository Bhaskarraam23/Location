import React, { useState, createContext, useEffect } from "react";


const LocationContext = createContext<any|null>(null);

const LocationProvider = ({children}:any)=>{
    const [locationStamp, setLocationStamp] = useState([])
    
    const [useCords, setUserCords] = useState({
        latitude: '',
        longitude: ''
    });

    return(
        <LocationContext.Provider value={{locationStamp, setLocationStamp, useCords, setUserCords}}>
            {children}
        </LocationContext.Provider>
    )
};

export {LocationContext, LocationProvider}