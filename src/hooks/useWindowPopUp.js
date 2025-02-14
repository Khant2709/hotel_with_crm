"use client";

import React, {useContext, useState} from "react";

const UsePopUpWindowContext = React.createContext();

const PopUpProvider = ({children}) => {
    const [showWindow, setShowWindow] = useState(false);
    const [reservationData, setReservationData] = useState({
        idHotel: null,
        nameHotel: null,
        idApartment: null,
        nameApartment: null,
        startData: null,
        endData: null,
        countAdults: null,
        countChildren: null,
        priceOneNight: null,
        finishPrice: null,
    });

    const togglePopUpWindow = () => setShowWindow(!showWindow);

    const popUpWindowValue = {
        showWindow,
        togglePopUpWindow,
        reservationData,
        setReservationData,
    };

    return (
        <UsePopUpWindowContext.Provider value={popUpWindowValue}>
            {children}
        </UsePopUpWindowContext.Provider>
    );
};

function usePopUpWindow() {
    return useContext(UsePopUpWindowContext);
}

export {PopUpProvider, usePopUpWindow};
