"use client";

import React, {useCallback} from "react";
import {useRouter} from "next/navigation";

import HotelView from "./hotelView";

import {usePreloader} from "../../../hooks/usePreloader";

/** Компонент оберка которая отображает номера-карточки конкретного отеля
 *
 * @param {Object} props - Пропсы компонента.
 * @param {Object} props.hotel - Данные отеля.
 * @param {Array} props.apartmentsFromHotel - Список номеров в отеле.
 * @param {boolean} props.hasQuery - Флаг, указывающий, есть ли параметры запроса.
 * @param {URLSearchParams} props.searchParams - Параметры запроса.
 * @returns {JSX.Element} - Компонент контейнера отеля с карточками номеров.
 */
const HotelContainer = ({
                            hotel,
                            apartmentsFromHotel,
                            hasQuery,
                            searchParams,
                        }) => {
    const router = useRouter();
    const {setIsLoading} = usePreloader();

    const handleApartmentClick = useCallback(
        (id) => {
            setIsLoading(true);
            router.push(
                hasQuery
                    ? `/reservation/${id}?${searchParams.toString()}`
                    : `/reservation/${id}`
            );
        },
        [hasQuery, searchParams, router, setIsLoading]
    );

    return (
        <HotelView hotel={hotel} apartmentsFromHotel={apartmentsFromHotel} handleApartmentClick={handleApartmentClick}/>
    );
};

export default HotelContainer;
