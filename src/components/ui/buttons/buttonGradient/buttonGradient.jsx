import React from 'react';

import styles from "./buttonGradient.module.css";
import stylesFonts from "../../../../styles/fonts/timesNewRoman.module.css";

/**
 * Компонент кнопки с градиентным фоном.
 *
 * @param {Object} props - Пропсы компонента.
 * @param {string} props.text - Текст кнопки.
 * @param {Function} props.handleClick - Функция, вызываемая при клике на кнопку.
 * @param {string} props.type - Тип кнопки (например, "button", "submit").
 * @returns {JSX.Element} - Компонент кнопки с градиентным фоном.
 */
const ButtonGradient = ({text, handleClick, type = "button"}) => {
    return (
        <button className={`${stylesFonts.newRoman400} ${styles.slidingButton}`}
                type={type}
                onClick={handleClick}
        >
            {text}
        </button>
    );
};

export default ButtonGradient;