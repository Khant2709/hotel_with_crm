import React from "react";

import {mainColorHotel} from "../../../config/colorConfig";
import Button from "../buttons/button/button";
import transformPrice from "../../../utils/mask/transformPrice";

import styles from "./cardApartment.module.css";
import stylesFontsT from "../../../styles/fonts/timesNewRoman.module.css";


/**
 * Компонент карточки номера.
 * @param {Object} props - Пропсы компонента.
 * @param {string} props.image - Ссылка на изображение апартаментов.
 * @param {string} props.title - Название апартаментов.
 * @param {number} props.bedsCount - Количество гостей.
 * @param {number} props.roomsCount - Количество комнат.
 * @param {number} props.cost - Стоимость апартаментов.
 * @param {string} props.numberHotel - Номер отеля (для определения цвета).
 * @param {Function} props.handleApartmentClick - Функция для перехода на страницу бронирования.
 * @returns {JSX.Element} - Компонент карточки номера.
 */
const CardApartment = ({
                           image,
                           title,
                           bedsCount,
                           roomsCount,
                           cost,
                           numberHotel,
                           handleApartmentClick,
                       }) => {
    const styleBorder = {borderBottom: `1px solid ${mainColorHotel[numberHotel]}`};
    const formattedCost = cost !== 0 ? transformPrice(cost) : '...';

    return (
        <div className={`${stylesFontsT.newRoman400} ${styles.card}`} onClick={handleApartmentClick}>
            <div style={{backgroundImage: `url(${image})`}} className={styles.img}/>
            <div className={styles.wrapperInformation}>
                <p className={`${stylesFontsT.newRoman700} ${styles.title}`}>{title}</p>
                <div className={styles.row} style={styleBorder}>
                    <p>Количество гостей</p>
                    <p>{bedsCount}</p>
                </div>
                <div className={styles.row} style={styleBorder}>
                    <p>Количество комнат</p>
                    <p>{roomsCount}</p>
                </div>
            </div>
            <div className={styles.row2}>
                <p>
                    От {formattedCost} <span className={styles.cost}>руб/сутки</span>
                </p>
                <Button text={"Подробнее"} hotel={numberHotel} handleClick={handleApartmentClick}/>
            </div>
        </div>
    );
}

export default React.memo(CardApartment);
