"use client";

import React, {useState} from "react";
import {Swiper, SwiperSlide} from 'swiper/react';
import {FreeMode, Navigation, Thumbs} from 'swiper/modules';

import {getFullPathImage} from "../../../utils/getFullPathImage";

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import styles from "./componentContainerPhotos.module.css";

/** Контейнер слайдера фотографий номера
 * @param {object} props - Пропсы компонента.
 * @param {number} props.width - Ширина экрана.
 * @param {array} props.photosApartment - Список фотографий.
 * @return {JSX.Element} - Контейнер слайдера фотографий номера.
 */
const ComponentContainerPhotos = ({photosApartment, width}) => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    return (
        <div className={styles.wrapperContainer}>
            <Swiper
                style={{
                    '--swiper-navigation-color': '#000000FF',
                    '--swiper-pagination-color': '#000000FF',
                }}
                spaceBetween={20}
                navigation={true}
                thumbs={{swiper: thumbsSwiper}}
                modules={[FreeMode, Navigation, Thumbs]}
                className={styles.swiper}
            >
                {renderSlides(photosApartment)}
            </Swiper>

            {width > 768 && <Swiper
                onSwiper={setThumbsSwiper}
                spaceBetween={10}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className={styles.swiper2}
            >
                {renderSlides(photosApartment, true)}
            </Swiper>}
        </div>
    )
};

export default ComponentContainerPhotos;

/** Компонент слайдов слайдера
 * @param {array} photos - список фотографий
 * @param {boolean} isThumbnail - флаг указывающий, нижний слайдер это или нет
 * @return {array} - возвращает массив слайдов
 * */
const renderSlides = (photos, isThumbnail = false) => {
    return photos.map(photo => (
        <SwiperSlide key={isThumbnail ? `mini_slider_${photo.image_name}` : photo.image_name}>
            <div
                className={isThumbnail ? styles.photoMini : styles.photo}
                style={{
                    backgroundImage: `url(${getFullPathImage(photo.image_path, photo.image_name)})`,
                }}
            />
        </SwiperSlide>
    ));
};