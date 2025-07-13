'use client'

import React from 'react';

import DesktopContent from "./desktopContent/desktopContent";
import MobileContent from "./mobileContent/mobileContent";

import styles from './componentImages.module.css';

/** Компонент контейнер фотографий.
 * @param {Object} props - Пропсы компонента.
 * @param {number} props.width - Ширина экрана.
 * @returns {JSX.Element} - Компонент контейнер фотографий.
 */
const ComponentImages = ({width, territoryImages}) => {
    return (
        <div className={styles.wrapper}>
            {width > 768
                ? <DesktopContent/>
                : <MobileContent images={territoryImages}/>
            }
        </div>
    );
};

export default ComponentImages;