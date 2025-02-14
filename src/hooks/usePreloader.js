"use client"

import React, {useContext, useState} from "react";

const UsePreloaderContext = React.createContext();

const PreloaderProvider = ({children}) => {
    const [isLoading, setIsLoading] = useState(false);

    return (
        <UsePreloaderContext.Provider value={{isLoading, setIsLoading}}>
            {children}
        </UsePreloaderContext.Provider>
    );
};

function usePreloader() {
    return useContext(UsePreloaderContext);
}

export {PreloaderProvider, usePreloader};