import React from 'react';

import styles from "./titleAdmin.module.css";
import stylesFont from '../../../../styles/fonts/timesNewRoman.module.css'

/**
 * Компонент заголовка для административной панели.
 *
 * @param {Object} props - Пропсы компонента.
 * @param {string} props.text - Текст заголовка.
 * @returns {JSX.Element} - Компонент заголовка для административной панели.
 */
const TitleAdmin = ({text}) => {
    return (
        <p className={`${styles.title} ${stylesFont.newRoman400}`}>{text}</p>
    );
};

export default TitleAdmin;