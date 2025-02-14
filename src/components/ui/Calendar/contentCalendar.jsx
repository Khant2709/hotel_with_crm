import React from "react";
import Image from "next/image";

import {arrowHotel, mainColorHotel} from "../../../config/colorConfig";

import styles from "./calendar.module.css";
import stylesFontsT from "../../../styles/fonts/timesNewRoman.module.css";

/**
 * Компонент для отображения заголовка календаря.
 * @param {Object} props - Пропсы компонента.
 * @param {string} props.hotelNumber - Номер отеля.
 * @param {Function} props.onMonthChange - Обработчик изменения месяца.
 * @param {Date} props.selectedDate - Выбранная дата.
 * @returns {JSX.Element} - Заголовок календаря.
 */
export const ContainerHeader = ({hotelNumber, onMonthChange, selectedDate}) => (
    <div className={`${stylesFontsT.newRoman700} ${styles.header}`}>
        <Image
            alt={"left"}
            src={arrowHotel[hotelNumber]}
            onClick={() => onMonthChange(-1)}
            className={`${styles.arrow} ${styles.arrowTransform}`}
        />
        <h2>
            {selectedDate.toLocaleDateString("default", {month: "long", year: "numeric"})}
        </h2>
        <Image
            alt={"right"}
            src={arrowHotel[hotelNumber]}
            onClick={() => onMonthChange(1)}
            className={styles.arrow}
        />
    </div>
);


/**
 * Компонент для отображения тела календаря.
 * @param {Object} props - Пропсы компонента.
 * @param {string} props.hotelNumber - Номер отеля.
 * @param {Array} props.days - Дни для отображения.
 * @param {Function} props.onDayClick - Обработчик клика по дню.
 * @param {Date} props.selectedDate - Выбранная дата.
 * @param {Function} props.checkDate - Функция для проверки даты.
 * @returns {JSX.Element} - Тело календаря.
 */
export const ContainerBody = ({hotelNumber, days, onDayClick, selectedDate, checkDate}) => (
    <>
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
            {days.map((el) => {
                const currentDate = new Date(el.day);
                return (
                    <div
                        key={el.day}
                        onClick={() => onDayClick(currentDate)}
                        className={`${styles.day} 
                               ${currentDate.getMonth() === selectedDate.getMonth() ? "" : styles.disabled}`}
                    >
                        <p className={`${stylesFontsT.newRoman400} 
                            ${checkDate("reservationDate", currentDate) ? styles.reservation : ""}`}>
                                    <span className={
                                        `${checkDate("verificationBookedDate", currentDate) ? styles.verificationReserv : ""}
                                         ${checkDate("noVerificationBookedDate", currentDate) ? styles.verificationNoReserv : ""}
                                         ${checkDate("today", currentDate) ? styles.today : ""}
                                         ${checkDate("selected", currentDate) ? styles.selected : ""}
                                         `}
                                    >
                                      {currentDate.getDate()}
                                    </span>
                        </p>
                    </div>
                );
            })}
        </div>
    </>
);


/**
 * Компонент для отображения маркеров (легенды) календаря.
 * @returns {JSX.Element} - Маркеры календаря.
 */
export const ContainerMarker = () => (
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
);