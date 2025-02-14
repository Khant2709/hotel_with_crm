import React from 'react';

import styles from './title.module.css';
import stylesFontsT from '../../../styles/fonts/timesNewRoman.module.css';

/**
 * Компонент для отображения заголовка с возможностью выбора тега.
 *
 * @param {string} Tag - Тег для заголовка (например, "h1", "h2").
 * @param {string} text - Текст заголовка.
 * @returns {JSX.Element} - Элемент заголовка.
 */
const Title = ({Tag, text}) => (
    <Tag className={`${stylesFontsT.newRoman700} ${styles.title}`}>
        {text}
    </Tag>
);

export default Title;