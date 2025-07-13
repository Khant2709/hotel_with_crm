'use client'

import React, {useContext, useState} from "react";

const UsePreloaderAdminContext = React.createContext();

const PreloaderAdminProvider = ({children}) => {
    const [toggleStatePreloader, setToggleStatePreloader] = useState(true);

    const statePreloaderValue = {
        toggleStatePreloader,
        setToggleStatePreloader
    }

    return (
        <UsePreloaderAdminContext.Provider value={statePreloaderValue}>
            {children}
        </UsePreloaderAdminContext.Provider>
    );
}

function usePreloaderAdmin() {
    return useContext(UsePreloaderAdminContext);
}

export {PreloaderAdminProvider, usePreloaderAdmin};