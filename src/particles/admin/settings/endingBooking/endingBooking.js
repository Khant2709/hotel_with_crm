'use client'

import React, {useEffect, useState} from 'react';

import WrapperBooking from "../../../../components/ui/admin/wrapperBooking/wrapperBooking";
import TitleAdmin from "../../../../components/ui/admin/titleAdmin/titleAdmin";
import ErrorComponent from "../../../../components/ui/admin/errorComponent/errorComponent";

import {useHotelsAndApartments} from "../../../../hooks/useGetDataHotelsAndApartments";

import {booking} from "../../../../services/api";
import {singleRequest} from "../../../../services/utils/requestUtils";
import PreloaderAdminComponent from "../../../../components/ui/preloader/preloaderAdminComponent";


const EndingBooking = ({activeType, title}) => {
    const {hotels, apartments} = useHotelsAndApartments();
    const [isLoading, setIsLoading] = useState(false);
    const [bookings, setBookings] = useState([]);
    const [errorResponse, setErrorResponse] = useState(null);

    useEffect(() => {
        const type = activeType.split('_')[1];
        const fetchData = async () => {
            setIsLoading(true)
            const response = await singleRequest(() => booking.getEndingBooking(type));

            if (response.error) {
                setErrorResponse(response.error);
                return;
            }

            const bookingsData = response.data?.data;
            if (!bookingsData?.length) {
                setErrorResponse('Произошла ошибка при получении данных броней.');
                return;
            }

            setBookings(bookingsData);
        };

        fetchData().finally(() => setIsLoading(false))
    }, [activeType]);

    if (isLoading) return <PreloaderAdminComponent/>

    if (errorResponse) {
        return <ErrorComponent text={errorResponse} isContainerError={true}/>
    }

    return (
        <>
            <TitleAdmin text={title}/>
            <WrapperBooking
                hotels={hotels || []}
                apartments={apartments || []}
                bookings={bookings}
                isRemoteFiltering={false}
                fetchBooking={null}
                today={null}
                isSettingPage={true}
            />
        </>
    );
};

export default EndingBooking;