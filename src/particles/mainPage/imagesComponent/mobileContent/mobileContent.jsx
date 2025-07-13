import React from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import {EffectCards} from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-cards';

import styles from './mobileContent.module.css';
import {getFullPathImage} from "../../../../utils/getFullPathImage";

/** Контент фотографий (мобильная версия).
 * @param {Object} props - Пропсы компонента.
 * @param {array} props.images - Ширина экрана.
 * @returns {JSX.Element} - Контент фотографий.
 */
const MobileContent = ({images}) => (
    <Swiper
        effect={'cards'}
        grabCursor={true}
        modules={[EffectCards]}
        className={styles.swiper}
    >
        {images.map((image, i) => {
            return (
                <SwiperSlide key={i}
                             className={styles.slide}
                             style={{backgroundImage: `url(${getFullPathImage(image.image_path, image.image_name)})`}}
                />
            )
        })}
    </Swiper>
);

export default MobileContent;