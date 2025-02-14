import React from 'react';

import styles from "./componentMobile.module.css";
import stylesFont from "../../../../../styles/fonts/timesNewRoman.module.css";

const ComponentMobile = ({clients}) => (
    <>
        {clients.map((client) => (
            <ClientCard key={client.id} client={client}/>
        ))}
    </>
);

export default ComponentMobile;

const ClientCard = ({client}) => (
    <div className={`${stylesFont.newRoman400} ${styles.cardClient}`}>
        <div className={styles.containerData}>
            <p>ФИО:</p>
            <p>{client.fio}</p>
        </div>
        <div className={styles.containerData}>
            <p>Телефон:</p>
            <p>{client.phone}</p>
        </div>
        <div className={styles.containerData}>
            <p>Почта:</p>
            <p>{client.email}</p>
        </div>
        <div className={styles.containerData}>
            <p>Заявки:</p>
            <p>{client.visits}</p>
        </div>
    </div>
);