'use client'

import React, {useCallback} from 'react';
import {useRouter} from "next/navigation";

import TableDesktop from "./tableDesktop";
import TableTablet from "./tableTablet";
import FormatMobile from "./formatMobile/formatMobile";

import {useWindowWidth} from "../../../../../hooks/UseWidth";
import {usePreloaderAdmin} from "../../../../../hooks/usePreloaderAdmin";

import styles from './bookingTable.module.css';
import stylesFontT from "../../../../../styles/fonts/timesNewRoman.module.css";

/**
 * Компонент для отображения списка бронирований в зависимости от ширины экрана.
 * @param {Object} props - Пропсы компонента.
 * @param {Array} props.bookings - Список бронирований.
 * @param {Array} props.hotels - Список отелей.
 * @param {Array} props.apartments - Список номеров.
 * @returns {JSX.Element} - Компонент таблицы или мобильного списка.
 */
const BookingTable = ({bookings, hotels, apartments}) => {
    const router = useRouter();
    const width = useWindowWidth();
    const {setToggleStatePreloader} = usePreloaderAdmin();

    /** Функция для перехода но конкретную бронь*/
    const openBooking = useCallback((bookingId) => {
        setToggleStatePreloader(true);
        router.push(`/admincrm/currentbooking/${bookingId}`);
    }, [router, setToggleStatePreloader]);

    if (!bookings?.length) {
        return <p className={`${stylesFontT.newRoman400} ${styles.emptyText}`}>Брони не найдены</p>
    }

    const isMobile = width <= 480;

    return (
        <div className={styles.wrapperTable}>
            {isMobile ? (
                <FormatMobile openBooking={openBooking} hotels={hotels} apartments={apartments} bookings={bookings}/>
            ) : (<table className={styles.table}>
                    {width > 900 ? (
                        <TableDesktop openBooking={openBooking}
                                      hotels={hotels}
                                      apartments={apartments}
                                      bookings={bookings}/>
                    ) : (
                        <TableTablet openBooking={openBooking}
                                     hotels={hotels}
                                     apartments={apartments}
                                     bookings={bookings}/>
                    )}
                </table>
            )}
        </div>
    );
};

export default BookingTable;