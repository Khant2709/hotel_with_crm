"use client";

import {useCallback} from "react";
import {useRouter} from "next/navigation";

import {ContentAnaloguesApartment} from "./contentAnaloguesApartment/contentAnaloguesApartment";

/** Компонент-обертка похожих номеров.
 * @param {Object} props - Пропсы компонента.
 * @param {array} props.allApartments - Список всех номеров.
 * @param {string} props.hotelType - Тип отеля.
 * @param {object} props.currentApartment - Текущий номер.
 * @returns {JSX.Element} - Компонент похожих номеров.
 */
const WrapperAnaloguesApartment = ({
                                       hotelType,
                                       allApartments,
                                       currentApartment,
                                   }) => {
    const router = useRouter();


    const analoguesRooms = allApartments.filter(
        (apartment) =>
            apartment.hotel_id === currentApartment.hotel_id &&
            apartment.person_max >= currentApartment.person_max &&
            apartment.id !== currentApartment.id
    );


    const handleApartmentClick = useCallback((id) => {
        router.push(`/reservation/${id}`)
    }, [router]);

    if (!currentApartment || !allApartments || allApartments.length === 0) return null;
    if (!analoguesRooms || analoguesRooms.length === 0) return null;

    return (
        <ContentAnaloguesApartment
            analoguesRooms={analoguesRooms}
            hotelType={hotelType}
            handleApartmentClick={handleApartmentClick}
        />
    );
};

export default WrapperAnaloguesApartment;
