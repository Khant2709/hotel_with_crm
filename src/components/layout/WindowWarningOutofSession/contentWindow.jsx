import React from 'react';
import Image from "next/image";

import Button from "../../ui/buttons/button/button";

import {transformDateFormat} from "../../../utils/getDay";

import {HOTEL_TYPE} from "../../../config/envData";

import emojiSleep from "../../../../public/emoji_sleep.png";

import stylesFontT from "../../../styles/fonts/timesNewRoman.module.css";
import styles from "./WindowWarningOutofSession.module.css";

/**
 * Компонент для отображения контактов.
 * @param {Object} props - Пропсы компонента.
 * @param {function} props.handleClose - Обработчик закрытия окна.
 * @param {string} props.startSeason - Дата начала сезона.
 * @param {string} props.endSeason - Дата конца сезона.
 * @param {function} props.handleViewRooms - Обработчик перехода на страницу номеров.
 * @returns {JSX.Element} - Блок контактов.
 */
const ContentWindow = ({handleClose, startSeason, endSeason, handleViewRooms}) => {
    return (
        <div className={styles.wrapperWindow} onClick={handleClose}>
            <div className={`${stylesFontT.newRoman400} ${styles.containerContent}`}
                 onClick={(e) => e.stopPropagation()}>
                <p className={styles.title}>Добро пожаловать! Но пока мы отдыхаем...</p>
                <Image
                    alt="Спящий эмодзи"
                    src={emojiSleep}
                    className={styles.emoji}
                    placeholder="blur"
                />
                <p className={styles.description}>
                    Наш отель работает в период с{" "}
                    <span>{transformDateFormat(startSeason)}</span> по{" "}
                    <span>{transformDateFormat(endSeason)}</span>. Вы можете
                    ознакомиться с сайтом или забронировать номер на сезон.
                </p>
                <div className={styles.containerButtons}>
                    <Button text="Ознакомиться с отелем" hotel={HOTEL_TYPE} handleClick={handleClose}/>
                    <Button text="Посмотреть номера" hotel={HOTEL_TYPE} handleClick={handleViewRooms}/>
                </div>
            </div>
        </div>
    );
};

export default ContentWindow;