import React from 'react';

import styles from './yaMap.module.css';

/**
 * Компонент для отображения Яндекс.Карты через iframe.
 * @param {Object} props - Пропсы компонента.
 * @param {string} [props.code] - Ссылка на карту. Если не передана, используется карта по умолчанию.
 * @returns {JSX.Element} - iframe с Яндекс.Картой.
 */
const YaMap = ({code}) => {
    const defaultMapUrl =
        "https://yandex.ru/map-widget/v1/?um=constructor%3A5a28226821eea6130a37fc45c18ad77b4bef1599a193d423d8bf87d8f485b12b&amp;source=constructor";

    return (
        <iframe
            src={code || defaultMapUrl}
            className={styles.map}
            title="Расположение базы отдыха на карте"
            width="1280"
            height="720"
            frameBorder="0"
            loading="lazy"
        />
    );
};

export default YaMap;


