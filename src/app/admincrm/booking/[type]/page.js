'use client'

import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {usePathname} from "next/navigation";

import TitleAdmin from "../../../../components/ui/admin/titleAdmin/titleAdmin";
import WrapperBooking from "../../../../components/ui/admin/wrapperBooking/wrapperBooking";

import {useRedirectAdmin} from "../../../../hooks/useRedirectAdmin";
import {useHotelsAndApartments} from "../../../../hooks/useGetDataHotelsAndApartments";

import {fetchingBookingData} from "../../../../services/fetchingData";
import {notifyShowToast} from "../../../../utils/showToast";

import styles from "../../../../styles/pageAdmin/bookingsPages.module.css";


const INFO_PAGE = {
    all: {title: "Все брони", isRemoteFiltering: false},
    checkin: {title: "Заселение", isRemoteFiltering: true},
    checkout: {title: "Выселение", isRemoteFiltering: true},
    unconfirmed: {title: "Ожидающие брони", isRemoteFiltering: false},
};

/** Основной компонент страницы броней
 * @return {JSX.Element} - компонент-обертка страницы броней
 */
const BookingAdminPage = () => {
    useRedirectAdmin();

    const path = usePathname();
    const typePage = useMemo(() => path.split('/').at(-1), [path]);
    const today = useMemo(() => new Date().toISOString().split('T')[0], []);

    const {hotels, apartments} = useHotelsAndApartments();
    const [bookings, setBookings] = useState([]);

    const fetchBookings = useCallback(async (date) => {
        try {
            const data = await fetchingBookingData(typePage, date);
            setBookings(data);
        } catch (error) {
            notifyShowToast('error', error.message || 'Ошибка при загрузке данных броней.');
        }
    }, [typePage]);

    useEffect(() => {
        fetchBookings(today);
    }, [typePage])

    return (
        <div className={styles.containerDesktop}>
            <TitleAdmin text={INFO_PAGE[typePage].title}/>
            <WrapperBooking hotels={hotels || []}
                            apartments={apartments || []}
                            bookings={bookings}
                            isRemoteFiltering={INFO_PAGE[typePage]?.isRemoteFiltering}
                            fetchBooking={fetchBookings}
                            today={INFO_PAGE[typePage]?.isRemoteFiltering ? today : null}
            />
        </div>
    );
};

export default BookingAdminPage;