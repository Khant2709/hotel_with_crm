'use client'

import React, {useCallback, useMemo, useState} from 'react';

import BookingTable from "./tableBooking/bookingTable";
import ContainerFilters from "./containerFilters/containerFilters";

import styles from './wrapperBooking.module.css';

/**
 * Умный компонент для управления фильтрами и отображения таблицы бронирований.
 * @param {Object} props - Пропсы компонента.
 * @param {Array} props.hotels - Список отелей.
 * @param {Array} props.apartments - Список апартаментов.
 * @param {Array} props.bookings - Список бронирований.
 * @param {Function} props.fetchBooking - Функция для загрузки бронирований.
 * @param {boolean} props.isRemoteFiltering - Флаг удаленной фильтрации.
 * @param {string} props.today - Текущая дата.
 * @returns {JSX.Element} - Компонент управления бронированиями.
 */
const WrapperBooking = ({hotels, apartments, bookings, fetchBooking, isRemoteFiltering, today}) => {
    const defaultFilters = useMemo(() => ({
        id: '',
        guestName: '',
        dateBooking: today || '',
        hotelId: '',
        apartmentId: '',
    }), [today]);

    const [fieldsValue, setFieldsValue] = useState(defaultFilters);

    /** Исключаем 5 отель потому что в нем нет номеров */
    const filteredHotels = useMemo(() => hotels.filter(hotel => hotel.id !== 5), [hotels]);

    /** Фильтрация апартаментов по выбранному отелю */
    const filteredApartments = useMemo(() => {
        if (!fieldsValue.hotelId) return apartments;
        return apartments.filter(apartment => apartment.hotel_id === +fieldsValue.hotelId);
    }, [apartments, fieldsValue.hotelId]);

    /** Опции для фильтров */
    const optionsValues = useMemo(() => ({
            hotels: filteredHotels,
            apartments: filteredApartments,
        }),
        [filteredHotels, filteredApartments]
    );

    /** Фильтрация бронирований */
    const filterBooking = useMemo(() => {
        const {id, hotelId, apartmentId, dateBooking, guestName} = fieldsValue;

        if (!id && !hotelId && !apartmentId && !dateBooking && !guestName) {
            return [...bookings].sort((a, b) => new Date(a.start_date_local) - new Date(b.start_date_local));
        }

        const dateSelected = dateBooking ? new Date(dateBooking).toISOString().split('T')[0] : null;

        return bookings
            .filter(booking =>
                (!id || booking.id === +id) &&
                (!guestName || booking.guest_fio.toLowerCase().includes(guestName.toLowerCase())) &&
                (!hotelId || booking.hotel_id === +hotelId) &&
                (!apartmentId || booking.apartment_id === +apartmentId) &&
                (isRemoteFiltering || !dateSelected || booking.start_date_local.split('T')[0] === dateSelected)
            )
            .sort((a, b) => new Date(a.start_date_local) - new Date(b.start_date_local)); // Сортировка по дате
    }, [bookings, fieldsValue, isRemoteFiltering]);

    /** Обработчик изменения значений фильтров */
    const handleInputChange = useCallback((e) => {
        const {name, value} = e.target;
        setFieldsValue(prev => ({...prev, [name]: value}));

        if (isRemoteFiltering && name === 'dateBooking' && fetchBooking) {
            fetchBooking(value);
        }
    }, [fetchBooking, isRemoteFiltering]);

    /** Сброс фильтров */
    const clearFilter = useCallback(() => setFieldsValue(defaultFilters), [defaultFilters]);

    return (
        <div className={styles.wrapperMain}>
            <ContainerFilters fieldsValue={fieldsValue}
                              handleInputChange={handleInputChange}
                              optionsValues={optionsValues}
                              clearFilter={clearFilter}
            />
            <BookingTable hotels={hotels} apartments={apartments} bookings={filterBooking}/>
        </div>
    );
};

export default WrapperBooking;