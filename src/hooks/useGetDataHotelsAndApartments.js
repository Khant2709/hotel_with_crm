'use client';

import React, {useContext, useEffect, useState} from "react";
import {hotels, apartments} from "../services/api";

const HotelsAndApartmentsContext = React.createContext();

const LOCAL_STORAGE_KEY = "hotelsAndApartmentsData";

const fetchHotelsAndApartments = async (setData) => {
    try {
        const [responseHotels, responseApartments] = await Promise.all([
            hotels.getHotelsData(),
            apartments.getAllApartments(),
        ]);

        if (responseHotels.status === 200 && responseApartments.status === 200) {
            const fetchedData = {
                hotels: responseHotels?.data?.data || null,
                apartments: responseApartments?.data?.data || null,
                lastFetched: Date.now(),
            };

            if (typeof window !== "undefined") {
                localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(fetchedData));
            }

            setData(fetchedData);
        } else {
            console.error("Ошибка при получении данных", {responseHotels, responseApartments});
        }
    } catch (error) {
        console.error("Ошибка в fetchHotelsAndApartments:", error);
    }
};


const HotelsAndApartmentsProvider = ({children}) => {
    const [data, setData] = useState(() => {
        if (typeof window !== "undefined") {
            const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
            return savedData ? JSON.parse(savedData) : {hotels: null, apartments: null, lastFetched: null};
        }

        // На сервере возвращаем пустое начальное состояние
        return {hotels: null, apartments: null, lastFetched: null};
    });
    const [isNeedUpdate, setIsNeedUpdate] = useState(false);

    useEffect(() => {
        const oneHour = 1000 * 60 * 30;
        let interval;

        const fetchIfNeeded = () => {
            if (
                isNeedUpdate ||
                !data.hotels ||
                !data.apartments ||
                (data.lastFetched + oneHour < Date.now())
            ) {
                fetchHotelsAndApartments(setData);
                setIsNeedUpdate(false);
            }
        };

        fetchIfNeeded();

        interval = setInterval(fetchIfNeeded, oneHour);
        return () => clearInterval(interval);
    }, [data, isNeedUpdate]);



    return (
        <HotelsAndApartmentsContext.Provider value={{...data, setIsNeedUpdate}}>
            {children}
        </HotelsAndApartmentsContext.Provider>
    );
};

function useHotelsAndApartments() {
    return useContext(HotelsAndApartmentsContext);
}

export {HotelsAndApartmentsProvider, useHotelsAndApartments};
