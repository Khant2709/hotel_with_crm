import React from 'react';

import {renderTableBody} from "./renderTableBody";

import styles from './bookingTable.module.css';
import stylesFontI from '../../../../../styles/fonts/inter.module.css';
import stylesFontT from '../../../../../styles/fonts/timesNewRoman.module.css';


/** Компонент для отображения списка бронирований в зависимости от ширины экрана. */
const TableDesktop = ({bookings, hotels, apartments, openBooking, isSettingPage}) => {
  return (
      <>
        <thead className={`${stylesFontI.Inter300} ${styles.tableHeadDesktop}`}>
        <tr>
          {!isSettingPage && <th/>}
          <th>№</th>
          <th>ФИО</th>
          <th>Телефон</th>
          <th>Отель</th>
          <th>Номер</th>
          <th>Период</th>
        </tr>
        </thead>
        <tbody className={`${stylesFontT.newRoman400} ${styles.tableBodyDesktop}`}>
        {renderTableBody({bookings, hotels, apartments, openBooking, isSettingPage})}
        </tbody>
      </>
  );
};

export default TableDesktop;