import React from 'react';
import styles from "./componentDesktop.module.css";
import stylesFont from "../../../../../styles/fonts/timesNewRoman.module.css";
import {formatPhoneWithMask} from "../../../../../utils/mask/transfomNumber";


const ComponentDesktop = ({clients, openClient}) => (
    <div className={styles.wrapperTable}>
      <table className={`${styles.table} ${stylesFont.newRoman400}`}>
        <thead>
        <tr>
          <th>ФИО гостя</th>
          <th>Телефон</th>
          <th>Почта</th>
          <th>Заявки</th>
        </tr>
        </thead>
        <tbody>
        {clients.map((client) => (
            <tr key={client.id} onClick={() =>openClient(client.phone)}>
              <td>{client.fio}</td>
              <td>{formatPhoneWithMask(client.phone)}</td>
              <td>{client.email}</td>
              <td>{client.visits}</td>
            </tr>
        ))}
        </tbody>
      </table>
    </div>
);

export default React.memo(ComponentDesktop);