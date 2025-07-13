"use client";

import React, {useEffect, useState} from "react";
import {useSearchParams} from "next/navigation";

import ComponentHotelsWithApartments from "./componentHotelsWithApartments/componentHotelsWithApartments";

import {getApartmentsData} from "./getDataToPage";

import {notifyShowToast} from "../../utils/showToast";

/** Компонент обертка для страницы всех отелей с номерами */
const WrapperAllHotelsApartments = ({allHotels, allApartments}) => {
    const searchParams = useSearchParams();
    const [freeApartments, setFreeApartments] = useState(allApartments);
    const [isLoading, setIsLoading] = useState(true);
    const [hasErrorInLoad, setHasErrorInLoad] = useState(false);


    /** Обновляем на свежие данные номеров или фильтруем если есть параметры */
    useEffect(() => {
        setIsLoading(true);

        const startDateReservation = searchParams.get("startReservation");
        const endDateReservation = searchParams.get("endReservation");
        const countAdultsReservation = searchParams.get("countAdults");
        const countChildrenReservation = searchParams.get("countChildren");

        getApartmentsData({
            startDateReservation,
            endDateReservation,
            countPeopleReservation:
                +countAdultsReservation + +countChildrenReservation,
        })
            .then((res) => {
                setFreeApartments(res.apartmentsData);
            })
            .catch((err) => {
                console.debug('RESERVATION! Something went wrong: ', err);
                setHasErrorInLoad(true)
                notifyShowToast('error', 'Произошла ошибка в получении данных попробуйте сново или зайдите позднее.');
            })
            .finally(() => {
                setIsLoading(false);
            })
    }, [searchParams]);

    return (
        <ComponentHotelsWithApartments searchParams={searchParams}
                                       isLoading={isLoading}
                                       allHotels={allHotels}
                                       freeApartments={freeApartments}
                                       hasErrorInLoad={hasErrorInLoad || !freeApartments}
        />
    );
};

export default WrapperAllHotelsApartments;