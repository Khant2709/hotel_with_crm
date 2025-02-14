"use client";

import React, {useState} from "react";

import {mainColorHotel} from "../../../../config/colorConfig";

import styles from "./buttonSecondory.module.css";
import stylesFontsT from "../../../../styles/fonts/timesNewRoman.module.css";

/**
 * Вторичная кнопка.
 *
 * @param {Object} props - Пропсы компонента.
 * @param {string} props.text - Текст кнопки.
 * @param {string} props.hotel - Номер отеля (для определения цвета).
 * @param {boolean} props.disabled - Флаг, указывающий, отключена ли кнопка.
 * @param {Function} props.handleClick - Функция, вызываемая при клике на кнопку.
 * @returns {JSX.Element} - Вторичная кнопка.
 */
const ButtonSecondary = ({text, hotel, handleClick, disabled}) => {
    const [isHover, setIsHover] = useState(false);

    const buttonStyle = {
        color: isHover ? "white" : "black",
        background: isHover ? `${mainColorHotel[hotel]}` : "white",
        border: `1px solid ${mainColorHotel[hotel]}`,
    };

    return (
        <button
            className={`${stylesFontsT.newRoman400} ${styles.btn} 
                        ${disabled && styles.disabled}`}
            style={buttonStyle}
            onClick={handleClick}
            disabled={disabled}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
        >
            {text}
        </button>
    );
};

export default ButtonSecondary;
