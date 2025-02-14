'use client'

import React from 'react';

import DesktopContent from "./desktopContent/desktopContent";
import MobileContent from "./mobileContent/mobileContent";

import styles from './componentImages.module.css';

import g1 from '../../../../public/gallery/g1.webp';
import g2 from '../../../../public/gallery/g2.webp';
import g3 from '../../../../public/gallery/g3.webp';
import g4 from '../../../../public/gallery/g4.webp';
import g5 from '../../../../public/gallery/g5.webp';
import g6 from '../../../../public/gallery/g6.webp';
import g7 from '../../../../public/gallery/g7.webp';
import g8 from '../../../../public/gallery/g8.webp';
import g9 from '../../../../public/gallery/g9.webp';
import g10 from '../../../../public/gallery/g10.webp';
import g11 from '../../../../public/gallery/g11.webp';
import g12 from '../../../../public/gallery/g12.webp';
import g13 from '../../../../public/gallery/g13.webp';

const listPhoto = [g1, g2, g3, g4, g5, g6, g7, g8, g9, g10, g11, g12, g13];

/** Компонент контейнер фотографий.
 * @param {Object} props - Пропсы компонента.
 * @param {number} props.width - Ширина экрана.
 * @returns {JSX.Element} - Компонент контейнер фотографий.
 */
const ComponentImages = ({width}) => {
    return (
        <div className={styles.wrapper}>
            {width > 768
                ? <DesktopContent/>
                : <MobileContent images={listPhoto}/>
            }
        </div>
    );
};

export default ComponentImages;