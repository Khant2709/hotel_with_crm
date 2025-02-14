import React from 'react';

import {renderTableBody} from "./renderTableBody";

import styles from './bookingTable.module.css';
import stylesFontI from '../../../../../styles/fonts/inter.module.css';
import stylesFontT from '../../../../../styles/fonts/timesNewRoman.module.css';


/**
 * Компонент для отображения списка бронирований в зависимости от ширины экрана.
 * @param {Object} props - Пропсы компонента.
 * @param {Array} props.bookings - Список бронирований.
 * @param {Array} props.hotels - Список отелей.
 * @param {Array} props.apartments - Список номеров.
 * @param {Function} props.openBooking - Функция для перехода на конкретную бронь.
 * @returns {JSX.Element} - Компонент таблицы или мобильного списка.
 */
const TableTablet = ({bookings, hotels, apartments, openBooking}) => {
    return (
        <>
            <thead className={`${stylesFontI.Inter300} ${styles.tableHeadTablet}`}>
            <tr>
                <th>№</th>
                <th>Имя</th>
                <th>Бронирование</th>
            </tr>
            </thead>
            <tbody className={`${stylesFontT.newRoman400} ${styles.tableBodyTablet}`}>
            {renderTableBody({bookings, hotels, apartments, openBooking, format: 'tablet'})}
            </tbody>
        </>
    );
};

export default TableTablet;