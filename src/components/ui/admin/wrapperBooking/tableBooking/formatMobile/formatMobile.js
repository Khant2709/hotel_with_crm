'use client'

import React, {useState} from 'react';
import {getDataFromTable} from "../bookingDataUtils";

import fieldsData from "./fieldsData";

import styles from './formatMobile.module.css';
import stylesFontT from '../../../../../../styles/fonts/timesNewRoman.module.css';


/**
 * Компонент для отображения списка бронирований в зависимости от ширины экрана.
 * @param {Object} props - Пропсы компонента.
 * @param {Array} props.bookings - Список бронирований.
 * @param {Array} props.hotels - Список отелей.
 * @param {Array} props.apartments - Список номеров.
 * @param {Function} props.openBooking - Функция для перехода на конкретную бронь.
 * @returns {JSX.Element} - Компонент таблицы или мобильного списка.
 */
const FormatMobile = ({bookings, hotels, apartments, openBooking, isSettingPage}) => {
  const [activeCards, setActiveCards] = useState([])

  const toggleCardStatus = (id) => {
    setActiveCards(prev =>
        prev.includes(id) ? prev.filter(el => el !== id) : [...prev, id]
    );
  };

  return (
      <div className={styles.containerCards}>
        {
          bookings.map((booking) => {
            const currentHotel = getDataFromTable.currentHotel(booking, hotels);
            const currentApartment = getDataFromTable.currentApartment(booking, apartments);
            const startDataReserv = getDataFromTable.startReservation(booking);
            const endDataReserv = getDataFromTable.endReservation(booking);
            const checkActive = activeCards.some(el => el === booking.id);

            const fields = fieldsData({
              booking,
              currentHotel,
              currentApartment,
              toggleCardStatus,
              startDataReserv,
              endDataReserv
            })

            return <div
                key={`mobile_${booking.id}`}
                className={`${stylesFontT.newRoman400} 
                                ${checkActive ? styles.activeCard : ''}
                                ${styles.containerCurrentCard}`}
            >

              {fields.map((field, i) => (
                  <div
                      className={styles.rowCard} key={i}
                      onClick={field.type === 'bookingId' ? field.fn : undefined}
                  >
                    <p className={styles.label}>{field.label}</p>
                    {field.type === 'phone'
                        ? <a href={field.link}>{field.value}</a>
                        : <p>{field.value}</p>
                    }
                  </div>
              ))}
              {!isSettingPage && <button
                  className={`${stylesFontT.newRoman400} ${styles.btn}`}
                  onClick={() => openBooking(booking.id)}
              >
                Открыть
              </button>}
            </div>
          })
        }
      </div>
  );
};

export default FormatMobile;