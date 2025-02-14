import React, {useCallback, useMemo} from 'react';

import {ContainerBody, ContainerHeader, ContainerMarker} from "./contentCalendar";

import {isBookedDate, isReservationDate, isSelectedDate, isToday} from "./validatesDateCalendar";

import {renderDays} from "./utilsRenderDays";

import styles from "./calendar.module.css";


/**
 * Глупый компонент для отображения календаря.
 * @param {Object} props - Пропсы компонента.
 * @param {Date} props.selectedDate - Выбранная дата.
 * @param {Array} props.filterBooking - Фильтр бронирований.
 * @param {string} props.hotelNumber - Номер отеля.
 * @param {Object} props.dataReservation - Данные о бронировании.
 * @param {Function} props.onDayClick - Обработчик клика по дню.
 * @param {Function} props.onMonthChange - Обработчик изменения месяца.
 * @returns {JSX.Element} - Компонент календаря.
 */
const CalendarView = ({
                          selectedDate,
                          filterBooking,
                          hotelNumber,
                          dataReservation,
                          onDayClick,
                          onMonthChange,
                      }) => {

    /** Проверка дат */
    const checkDate = useCallback(
        (day, currentDate) => {
            const startDataReservation = new Date(dataReservation?.startDataReservation);
            const endDataReservation = new Date(dataReservation?.endDataReservation);

            switch (day) {
                case "today":
                    return isToday(currentDate);
                case "selected":
                    return isSelectedDate(currentDate, startDataReservation, endDataReservation);
                case "verificationBookedDate":
                    return isBookedDate(currentDate, filterBooking, 'Подтверждена');
                case "noVerificationBookedDate":
                    return isBookedDate(currentDate, filterBooking, 'Ожидает подтверждения');
                case "reservationDate":
                    return isReservationDate(currentDate, startDataReservation, endDataReservation);
                default:
                    return false;
            }
        },
        [filterBooking, dataReservation]
    );

    const days = useMemo(() => renderDays(selectedDate), [selectedDate]);

    return (
        <div className={styles.calendarContainer}>
            <ContainerHeader hotelNumber={hotelNumber}
                             onMonthChange={onMonthChange}
                             selectedDate={selectedDate}
            />

            <ContainerBody hotelNumber={hotelNumber}
                           days={days}
                           onDayClick={onDayClick}
                           selectedDate={selectedDate}
                           checkDate={checkDate}

            />

            <ContainerMarker/>
        </div>
    );
};

export default CalendarView;