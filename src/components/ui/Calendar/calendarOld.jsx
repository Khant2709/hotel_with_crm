{/* "use client";
import React, {useState} from "react";
import Image from "next/image";

import styles from "./calendar.module.css";
import stylesFontsT from "../../../styles/fonts/timesNewRoman.module.css";
import {
    arrowHotel,
    mainColorHotel,
} from "../../../config/colorConfig";

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

    const today = new Date(); // Устанавливаем начальное значение текущей даты
    const startDataReservation = new Date(dataReservation?.startDataReservation);
    const endDataReservation = new Date(dataReservation?.endDataReservation);

    const checkDate = (day, currentDate) => {
        if (
            day === "today" &&
            today.getDate() === currentDate.getDate() &&
            today.getMonth() === currentDate.getMonth()
        )
            return true;

        if (day === "verificationBookedDate") {
            return filterBooking.some((element) => {
                if (
                    new Date(element.start_date).getTime() <= currentDate.getTime() &&
                    new Date(element.end_date).getTime() > currentDate.getTime() &&
                    !!element.verification
                ) {
                    return true;
                }
            });
        }

        if (day === "noVerificationBookedDate") {
            return filterBooking.some((element) => {
                if (
                    new Date(element.start_date).getTime() <= currentDate.getTime() &&
                    new Date(element.end_date).getTime() > currentDate.getTime() &&
                    !element.verification
                ) {
                    return true;
                }
            });
        }

        currentDate.setHours(0, 0, 0, 0);
        startDataReservation.setHours(0, 0, 0, 0);
        endDataReservation.setHours(0, 0, 0, 0);

        if (
            day === "reservationDate" &&
            startDataReservation.getTime() <= currentDate.getTime() &&
            endDataReservation.getTime() >= currentDate.getTime()
        )
            return true;
    };

    // Функция для отображения дней месяца
    const renderDays = () => {
        const days = []; // Создаем массив для хранения компонентов с днями месяца
        const monthStart = new Date(
            selectedDate.getFullYear(),
            selectedDate.getMonth(),
            1
        ); // Получаем начальную дату текущего месяца
        const monthEnd = new Date(
            selectedDate.getFullYear(),
            selectedDate.getMonth() + 1,
            0
        ); // Получаем конечную дату текущего месяца
        const startDayOfWeek = monthStart.getDay(); // Получаем день недели, с которого начинается месяц (0 - воскресенье, 1 - понедельник, и т.д.)
        const startDate = new Date(monthStart);
        // Устанавливаем начальную дату, соответствующую понедельнику, вычитая из начальной даты день недели и добавляя 1 день, если начало месяца не попадает на понедельник
        startDate.setDate(
            startDate.getDate() - startDayOfWeek + (startDayOfWeek === 0 ? -6 : 1)
        );
        const endDate = new Date(monthEnd); // Получаем объект даты для последнего дня текущего месяца
        let currentDate = new Date(startDate); // Устанавливаем текущую дату в начало месяца

        // Пока текущая дата не превышает последний день месяца
        while (currentDate <= endDate) {
            // Создаем массив с днем месяца
            days.push({day: currentDate.toISOString()});
            currentDate.setDate(currentDate.getDate() + 1); // Увеличиваем текущую дату на 1 день
        }

        // Если последний день месяца - воскресенье, добавляем числа следующего месяца до субботы
        if (endDate.getDay() !== 0) {
            let nextMonthDate = new Date(endDate);
            nextMonthDate.setDate(nextMonthDate.getDate() + 1); // Первое число следующего месяца

            while (nextMonthDate.getDay() !== 1) {
                days.push({day: nextMonthDate.toISOString()});
                nextMonthDate.setDate(nextMonthDate.getDate() + 1); // Переходим к следующему дню
            }
        }
        return days; // Возвращаем массив с компонентами дней месяца
    };

    // Обработчик клика по дню
    const handleDayClick = (date) => {
        if (date.getMonth() < selectedDate.getMonth()) {
            changeMonth(-1);
        }
        if (date.getMonth() > selectedDate.getMonth()) {
            changeMonth(1);
        }

        const dateTransform = new Date(date);
        dateTransform.setDate(dateTransform.getDate() + 1);
        if (selectedTypeDate === "startData") {
            changeDataFromCalendar(
                "startData",
                dateTransform.toISOString().split("T")[0]
            );
            setSelectedTypeDate("endData");
        }

        if (selectedTypeDate === "endData") {
            changeDataFromCalendar(
                "endData",
                dateTransform.toISOString().split("T")[0]
            );
            setSelectedTypeDate("startData");
        }
    };

    // Функция для переключения месяцев
    const changeMonth = (amount) => {
        const newDate = new Date(selectedDate);
        newDate.setMonth(selectedDate.getMonth() + amount);
        setSelectedDate(newDate);
    };

    return (
        <div className={styles.calendarContainer}>
            <div className={`${stylesFontsT.newRoman700} ${styles.header}`}>
                <Image
                    alt={"left"}
                    src={arrowHotel[hotelNumber]}
                    onClick={() => changeMonth(-1)}
                    className={`${styles.arrow} ${styles.arrowTransform}`}
                />
                <h2>
                    {selectedDate.toLocaleDateString("default", {month: "long", year: "numeric"})}
                </h2>
                <Image
                    alt={"right"}
                    src={arrowHotel[hotelNumber]}
                    onClick={() => changeMonth(1)}
                    className={styles.arrow}
                />
            </div>

            <div
                className={`${stylesFontsT.newRoman400} ${styles.daysHeader}`}
                style={{borderColor: mainColorHotel[hotelNumber]}}
            >
                <div className={styles.dayName}>Пн</div>
                <div className={styles.dayName}>Вт</div>
                <div className={styles.dayName}>Ср</div>
                <div className={styles.dayName}>Чт</div>
                <div className={styles.dayName}>Пт</div>
                <div className={styles.dayName}>Сб</div>
                <div className={styles.dayName}>Вс</div>
            </div>

            <div className={styles.days}>
                {renderDays().map((el) => {
                    const currentDate = new Date(el.day);
                    return (
                        <div
                            key={el.day}
                            onClick={() => handleDayClick(currentDate)}
                            className={`${styles.day} 
                               ${currentDate.getMonth() === selectedDate.getMonth() ? "" : styles.disabled}`}
                        >
                            <p className={`${stylesFontsT.newRoman400} 
                            ${checkDate("reservationDate", currentDate) ? styles.reservation : ""}`}>
                                    <span className={
                                        `${checkDate("verificationBookedDate", currentDate) ? styles.verificationReserv : ""}
                                         ${checkDate("noVerificationBookedDate", currentDate) ? styles.verificationNoReserv : ""}
                                         ${checkDate("today", currentDate) ? styles.today : ""}
                                         `}
                                    >
                                      {currentDate.getDate()}
                                    </span>
                            </p>
                        </div>
                    );
                })}
            </div>

            <div className={`${stylesFontsT.newRoman400} ${styles.descriptionMarker}`}>
                <div className={styles.wrapperRow}>
                    <div className={styles.circleRed}/>
                    <p> - забронированные даты</p>
                </div>

                <div className={styles.wrapperRow}>
                    <div className={styles.circleGreen}/>
                    <p> - ждут подтверждения</p>
                </div>

                <div className={styles.wrapperRow}>
                    <div className={styles.circleGray}/>
                    <p> - выбранные даты</p>
                </div>
            </div>
        </div>
    );
};

export default Calendar;

 */
}