'use client'

import React from 'react';
import Link from "next/link";
import {Swiper, SwiperSlide} from 'swiper/react';
import {Pagination} from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

import styles from './containerMobile.module.css';
import stylesFont from '../../../../styles/fonts/timesNewRoman.module.css';

/** Компонент банерас отелями (мобильная версия)
 * @param {object} props - Пропсы компонента.
 * @param {array} props.hotels - Список отелей.
 * @returns {JSX.Element} - Компонент банерас отелями (мобильная версия).
 * */
const ContentMobile = ({hotels}) => {

    return (
        <Swiper
            pagination={{dynamicBullets: true}}
            modules={[Pagination]}
            className={styles.swiper}
        >
            {hotels.map(hotel => {
                return (
                    <SwiperSlide key={hotel.id}
                                 className={`${stylesFont.newRoman400} ${styles.slide}`}
                                 style={{backgroundImage: `url(${hotel.image.src})`}}
                    >
                        <div className={styles.background}/>
                        <p className={styles.hotelName}>
                            {hotel.name}
                        </p>
                        <p className={styles.hotelAddress}>
                            {hotel.address}
                        </p>
                        <Link href={hotel.website} className={styles.link}>Перейти на отель</Link>
                    </SwiperSlide>
                )
            })}
        </Swiper>
    );
};

export default ContentMobile;