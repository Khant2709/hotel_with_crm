"use client";

import React, {useState} from "react";

import CalendarView from "./calendarView";

/** Умный компонент для управления календарём.
 * @param {Object} props - Пропсы компонента.
 * @param {Array} props.filterBooking - Фильтр бронирований.
 * @param {string} props.hotelNumber - Номер отеля.
 * @param {Object} props.dataReservation - Данные о бронировании.
 * @param {Function} props.changeDataFromCalendar - Функция для изменения даты.
 * @returns {JSX.Element} - Компонент календаря.
 */
const Calendar = ({
                      filterBooking,
                      hotelNumber,
                      dataReservation,
                      changeDataFromCalendar,
                  }) => {
    const [selectedDate, setSelectedDate] = useState(
        dataReservation?.startDataReservation
            ? new Date(dataReservation.startDataReservation)
            : new Date()
    ); // Устанавливаем начальное значение текущей даты
    const [selectedTypeDate, setSelectedTypeDate] = useState("startData");


    /** Обработчик клика по дню */
    const handleDayClick = (date) => {
        if (date.getMonth() < selectedDate.getMonth()) {
            handleMonthChange(-1);
        }
        if (date.getMonth() > selectedDate.getMonth()) {
            handleMonthChange(1);
        }

        const dateTransform = new Date(date);
        dateTransform.setDate(dateTransform.getDate() + 1);
        const splitDate = dateTransform.toISOString().split("T")[0];

        if (selectedTypeDate === "startData") {
            changeDataFromCalendar(
                "startData",
                splitDate
            );
            setSelectedTypeDate("endData");
        }

        if (selectedTypeDate === "endData") {
            changeDataFromCalendar(
                "endData",
                splitDate
            );
            setSelectedTypeDate("startData");
        }
    };

    /** Функция для переключения месяцев */
    const handleMonthChange = (amount) => {
        const newDate = new Date(selectedDate);
        newDate.setMonth(selectedDate.getMonth() + amount);
        setSelectedDate(newDate);
    };

    return (
        <CalendarView selectedDate={selectedDate}
                      filterBooking={filterBooking}
                      hotelNumber={hotelNumber}
                      dataReservation={dataReservation}
                      onDayClick={handleDayClick}
                      onMonthChange={handleMonthChange}
        />
    );
};

export default Calendar;
