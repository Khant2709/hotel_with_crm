'use client'

import React, {useState} from 'react';

import {mainColorHotel, colorHoverBtn} from "../../../../config/colorConfig";

import styles from './button.module.css';
import stylesFontsT from '../../../../styles/fonts/timesNewRoman.module.css';

/**
 * Компонент кнопки.
 *
 * @param {Object} props - Пропсы компонента.
 * @param {string} props.text - Текст кнопки.
 * @param {string} props.hotel - Номер отеля (для определения цвета).
 * @param {boolean} props.disabled - Флаг, указывающий, отключена ли кнопка.
 * @param {Function} props.handleClick - Функция, вызываемая при клике на кнопку.
 * @returns {JSX.Element} - Компонент кнопки.
 */
const Button = ({text, hotel, disabled, handleClick}) => {
    const [isHover, setIsHover] = useState(false);

    const buttonStyle = {
        background: `${mainColorHotel[hotel]}`,
        border: isHover && `4px solid ${colorHoverBtn[hotel]}`,
    }

    return (
        <button className={`${stylesFontsT.newRoman400} ${styles.btn} ${disabled && styles.disabled}`}
                style={buttonStyle}
                disabled={disabled}
                onClick={handleClick}
                onMouseEnter={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}>
            {text || ''}
        </button>
    );
};

export default Button;