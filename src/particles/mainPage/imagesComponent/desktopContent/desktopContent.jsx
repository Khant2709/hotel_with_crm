import React from 'react';
import Image from "next/image";

import styles from './desktopContent.module.css';

import g2 from '../../../../../public/gallery/g2.webp';
import g6 from '../../../../../public/gallery/g6.webp';
import g8 from '../../../../../public/gallery/g8.webp';
import g11 from '../../../../../public/gallery/g11.webp';
import g12 from '../../../../../public/gallery/g12.webp';
import g13 from '../../../../../public/gallery/g13.webp';

/** Контейнер фотографий (десктоп версия).
 * @returns {JSX.Element} - Контейнер фотографий.
 */
const DesktopContent = () => (
    <>
        <div className={styles.img1}/>
        <Image alt={'img2'} src={g2} className={styles.img2}/>
        <Image alt={'img3'} src={g6} className={styles.img3}/>
        <Image alt={'img4'} src={g8} className={styles.img4}/>
        <Image alt={'img5'} src={g11} className={styles.img5}/>
        <Image alt={'img6'} src={g12} className={styles.img6}/>
        <Image alt={'img7'} src={g13} className={styles.img7}/>
        <div className={styles.img8}/>
        <div className={styles.img9}/>
    </>
);

export default DesktopContent;