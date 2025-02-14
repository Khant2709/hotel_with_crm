"use client";

import React, {useEffect, useState} from "react";
import {useSearchParams} from "next/navigation";

import ComponentCurrentReservation from "./componentCurrentReservation";
import Preloader from "../../components/ui/preloader/preloader";

import {usePreloader} from "../../hooks/usePreloader";
import {useWindowWidth} from "../../hooks/UseWidth";

import {notifyShowToast} from "../../utils/showToast";
import {getSearchParams} from "../../utils/getSearchParams";
import {getDefaultDateReservation} from "../../utils/getDefaultDateReservation";
import {getDataToPage} from "./getDataToPage";


/** Компонент обертка для страницы бронирования конкретного номера
 * @param {object} props - Пропсы компонента.
 * @param {string} props.id - ID конкретного номера взятого из url.
 * @param {object} props.currentHotel - Данные конкретного отеля.
 * @param {object} props.currentApartment - Данные конкретного номера (в последствии обновляется на свежие данные на клиенте).
 * @param {array} props.allApartments - Список номеров полученные при серверном рендере (в последствии обновляется на свежие данные на клиенте).
 * @param {array} props.allBookings - Список броней полученные при серверном рендере (в последствии обновляется на свежие данные на клиенте).
 * @returns {JSX.Element} - Компонент бронирования конкретного номера.
 * */
export default function WrapperCurrentReservation({
                                                      id,
                                                      currentHotel,
                                                      currentApartment,
                                                      allApartments,
                                                      allBookings,
                                                  }) {
    const searchParams = useSearchParams();
    const width = useWindowWidth();
    const {isLoading, setIsLoading} = usePreloader();

    const {
        startDateReservation,
        endDateReservation,
        countAdultsReservation,
        countChildrenReservation
    } = getSearchParams(searchParams);

    const {getDateStart, getDateEnd} = getDefaultDateReservation();

    const [bookings, setBookings] = useState(allBookings || []);
    const [apartmentsData, setApartmentsData] = useState({currentApartment, allApartments});
    const [dataReservation, setDataReservation] = useState({
        startDataReservation: startDateReservation || getDateStart,
        endDataReservation: endDateReservation || getDateEnd,
    });


    useEffect(() => {
        if (isLoading) setIsLoading(false);

        getDataToPage(id, 'initial')
            .then(response => {
                const {currentApartmentData, apartmentsData, bookingsData} = response;
                setApartmentsData({
                    currentApartment: currentApartmentData.data[0],
                    allApartments: apartmentsData.data,
                });
                if (bookingsData.data.length !== bookings.length) {
                    setBookings(bookingsData.data);
                }
            })
            .catch(err => {
                console.debug('CURRENT RESERVATION! Error fetching data: ', err);
                notifyShowToast(
                    'error', 'Произошла ошибка при обновлении данных, обновите страницу или попробуйте по позже.'
                );
            })
            .finally(() => setIsLoading(false))
    }, [id, isLoading, setIsLoading, bookings.length]);

    const changeDataFromCalendar = (field, data) => {
        if (field === "startData") {
            setDataReservation({
                ...dataReservation,
                startDataReservation: data,
            });
        }

        if (field === "endData") {
            setDataReservation({
                ...dataReservation,
                endDataReservation: data,
            });
        }
    };

    if (!width) {
        return <Preloader/>
    }

    return (
        <ComponentCurrentReservation width={width}
                                     searchParams={searchParams}
                                     hotel={currentHotel}
                                     apartment={apartmentsData.currentApartment}
                                     allApartments={apartmentsData.allApartments}
                                     bookings={bookings}
                                     setDataReservation={setDataReservation}
                                     dataReservation={dataReservation}
                                     countOfResidents={{
                                         countAdults: countAdultsReservation,
                                         countChildren: countChildrenReservation
                                     }}
                                     changeDataFromCalendar={changeDataFromCalendar}
        />
    );
};