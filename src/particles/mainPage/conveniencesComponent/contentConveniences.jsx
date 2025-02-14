import React from 'react';
import Image from "next/image";

import TitleWithLine from "../../../components/ui/title/titleWithLine";

import {comfortList} from "./comfortList";
import {HOTEL_TYPE} from "../../../config/envData";

import styles from './contentConveniences.module.css';
import stylesFont from '../../../styles/fonts/timesNewRoman.module.css';

/** Компонент удобств.
 * @returns {JSX.Element} - Компонент удобств.
 */
const ContentConveniences = () => (
    <section className={styles.main}>
        <TitleWithLine text={'Удобства'} showTopLine={false} hotelType={HOTEL_TYPE}/>
        <div className={styles.wrapperComfortList}>
            {comfortList.map(el => {
                return <div key={el.id} className={`${stylesFont.newRoman400} ${styles.containerComfort}`}>
                    <Image alt={'icon'} src={el.img}/>
                    <p>{el.text}</p>
                </div>
            })}
        </div>
    </section>
);

export default ContentConveniences;