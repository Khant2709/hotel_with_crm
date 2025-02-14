import React from 'react';

import FormSearchDate from "../formSerchDate/formSearchDate.js";

import styles from './headerLine.module.css';

/**
 * Компонент для отображения фоновой линии в шапке с возможностью отображения формы поиска.
 *
 * @param {Object} searchParams - Параметры поиска, передаваемые в форму.
 * @param {string} [color="white"] - Цвет текста в форме поиска.
 * @returns {JSX.Element} - Элемент фоновой линии с формой поиска.
 */

const HeaderLine = ({searchParams, color}) => {
    return (
        <div className={styles.backgroundLine}>
            <div className={styles.wrapperForm}>
                <FormSearchDate color={color || 'white'} searchParams={searchParams}/>
            </div>
        </div>
    );
}

export default HeaderLine;