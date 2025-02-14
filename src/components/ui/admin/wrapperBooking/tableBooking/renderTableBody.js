import Image from "next/image";

import {getDataFromTable} from "./bookingDataUtils";
import {formatPhoneWithMask} from "../../../../../utils/mask/transfomNumber";

import editIcon from '../../../../../../public/editIcon.png';

import styles from './bookingTable.module.css';

/**
 * Компонент для отображения списка бронирований в зависимости от ширины экрана.
 * @param {Object} props - Пропсы компонента.
 * @param {Array} props.bookings - Список бронирований.
 * @param {Array} props.hotels - Список отелей.
 * @param {Array} props.apartments - Список номеров.
 * @param {Function} props.openBooking - функция для перехода на конкретную бронь.
 * @param {String} props.format - Формат отображения тела таблицы.
 * @returns {Array} - Компонент таблицы или мобильного списка.
 */
export const renderTableBody = ({bookings, hotels, apartments, openBooking, format = 'desktop'}) => {
    const currentDate = new Date();
    return bookings.map((booking) => {
        const currentHotel = getDataFromTable.currentHotel(booking, hotels);
        const currentApartment = getDataFromTable.currentApartment(booking, apartments);
        const startDataReserv = getDataFromTable.startReservation(booking);
        const endDataReserv = getDataFromTable.endReservation(booking);
        const finishedLiving = getDataFromTable.finishedLiving(currentDate, booking);
        const nowLiving = getDataFromTable.nowLiving(currentDate, booking);
        const transformPhone = getDataFromTable.transformPhone(booking);
        const formattedDateRange = `${getDataFromTable.sliceDate(startDataReserv)} - ${getDataFromTable.sliceDate(endDataReserv)}`;

        if (format === 'tablet') {
            return <TabletBookingRow key={booking.id}
                                     booking={booking}
                                     hotelName={currentHotel?.name || 'Не найден'}
                                     apartmentName={currentApartment?.apartment_name || 'Не найден'}
                                     transformPhone={transformPhone}
                                     formattedDateRange={formattedDateRange}
                                     openBooking={openBooking}
            />
        } else {
            return <DesktopBookingRow key={booking.id}
                                      booking={booking}
                                      nowLiving={nowLiving}
                                      finishedLiving={finishedLiving}
                                      transformPhone={transformPhone}
                                      hotelName={currentHotel?.name || 'Не найден'}
                                      apartmentName={currentApartment?.apartment_name || 'Не найден'}
                                      formattedDateRange={formattedDateRange}
                                      openBooking={openBooking}
            />
        }
    })
};

const TabletBookingRow = ({
                              hotelName,
                              apartmentName,
                              booking,
                              transformPhone,
                              formattedDateRange,
                              openBooking
                          }) => (
    <tr>
        <td onClick={() => openBooking(booking.id)}>{booking.id}</td>
        <td className={styles.columnTableTablet}>
            <p>{booking.guest_fio}</p>
            <a href={`tel:${transformPhone}`}>{formatPhoneWithMask(booking.guest_phone)}</a>
        </td>
        <td className={styles.columnTableTablet}>
            <p>{hotelName}</p>
            <p className={styles.apartment}>{apartmentName}</p>
            <p>{formattedDateRange}</p>
        </td>
    </tr>
);

const DesktopBookingRow = ({
                               nowLiving,
                               finishedLiving,
                               transformPhone,
                               hotelName,
                               apartmentName,
                               formattedDateRange,
                               booking,
                               openBooking
                           }) => (
    <tr>
        <td onClick={() => openBooking(booking.id)}>
            <div
                className={`${styles.edit} ${nowLiving && styles.nowLiving} ${finishedLiving && styles.finishedLiving}`}>
                <Image alt="edit" src={editIcon} className={styles.editIcon}/>
            </div>
        </td>
        <td>{booking.id}</td>
        <td>{booking.guest_fio}</td>
        <td><a href={`tel:${transformPhone}`}>{formatPhoneWithMask(booking.guest_phone)}</a></td>
        <td>{hotelName}</td>
        <td className={styles.apartment}>{apartmentName}</td>
        <td>{formattedDateRange}</td>
    </tr>
);