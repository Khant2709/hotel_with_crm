'use client'

import React from "react";
import Image from "next/image";

import Button from "../buttons/button/button";

import {hotelsLogo} from "../../../data/hotelsLogo";
import {secondaryColorHotel, mainColorHotel} from "../../../config/colorConfig";

import styles from "./componentsHotels.module.css";
import stylesFontsT from "../../../styles/fonts/timesNewRoman.module.css";


/**
 * Компонент для отображения основных отелей с возможностью перехода на них.
 * @param {Object} props - Пропсы компонента.
 * @param {Array} props.allHotel - Список отелей.
 * @param {function} props.redirectToHotel - Функция для перехода на отель.
 * @param {number} props.width - Ширина экрана.
 * @returns {JSX.Element} - Компонент для отображения основных отелей.
 */
const ComponentsHotels = ({allHotel, redirectToHotel, width}) => (
    <section className={styles.main}>
        {allHotel.map((hotel, i) => {
            const hotelLogoStyle = {backgroundImage: `url(${hotelsLogo[hotel.type].src})`};
            return (
                <div key={hotel.id}
                     className={styles.wrapperHotel}
                     style={{background: `${secondaryColorHotel[hotel.type]}`}}
                >
                    <div className={styles.containerHotel}>
                        {width > 768
                            ? <DesktopContent hotel={hotel}
                                              i={i}
                                              redirectToHotel={redirectToHotel}
                                              hotelLogoStyle={hotelLogoStyle}
                            />
                            : <MobileContent hotel={hotel} redirectToHotel={redirectToHotel}/>
                        }
                    </div>
                </div>
            );
        })}
    </section>
);

export default React.memo(ComponentsHotels);

/**
 * Компонент отображения отеля (десктоп версия).
 * @param {Object} props - Пропсы компонента.
 * @param {Object} props.hotel - Обьект с данными отеля.
 * @param {function} props.redirectToHotel - Функция для перехода на отель.
 * @param {string} props.hotelLogoStyle - Стиль логотипа.
 * @returns {JSX.Element} - Компонент отображения отеля.
 */
const DesktopContent = ({i, hotel, redirectToHotel, hotelLogoStyle}) => (
    <>
        {
            i % 2 === 0
                ? <>
                    <HotelInfo hotel={hotel} redirectToHotel={redirectToHotel}/>
                    <div style={hotelLogoStyle} className={styles.imgHotel}/>
                </>
                : <>
                    <div style={hotelLogoStyle} className={styles.imgHotel}/>
                    <HotelInfo hotel={hotel} redirectToHotel={redirectToHotel}/>
                </>
        }
    </>
);


/**
 * Компонент отображения отеля (мобильная версия).
 * @param {Object} props - Пропсы компонента.
 * @param {Object} props.hotel - Обьект с данными отеля.
 * @param {function} props.redirectToHotel - Функция для перехода на отель.
 * @returns {JSX.Element} - Компонент отображения отеля.
 */
const MobileContent = ({hotel, redirectToHotel}) => (
    <div className={`${stylesFontsT.newRoman400} ${styles.informationContainerHotel}`}>
        <p className={styles.nameHotel}
           style={{color: `${mainColorHotel[hotel.type]}`}}
        >
            {hotel.name}
        </p>
        <p className={styles.descriptionHotel}>
            {hotel.description}
        </p>
        <Image alt={"img"}
               src={hotelsLogo[hotel.type]}
               className={styles.imgHotel}
        />
        <HotelButtons hotel={hotel} redirectToHotel={redirectToHotel}/>
    </div>
);

/**
 * Компонент отображающий информацию отеля.
 * @param {Object} props - Пропсы компонента.
 * @param {Object} props.hotel - Обьект с данными отеля.
 * @param {function} props.redirectToHotel - Функция для перехода на отель.
 * @returns {JSX.Element} - Информационный компонент отеля.
 */
const HotelInfo = React.memo(({hotel, redirectToHotel}) => (
    <div className={`${stylesFontsT.newRoman400} ${styles.informationContainerHotel}`}>
        <p className={styles.nameHotel} style={{color: `${mainColorHotel[hotel.type]}`}}>
            {hotel.name}
        </p>
        <p className={styles.descriptionHotel}>{hotel.description}</p>
        <HotelButtons hotel={hotel} redirectToHotel={redirectToHotel}/>
    </div>
));
HotelInfo.displayName = "HotelInfo";


/**
 * Компонент кнопок для перехода на отель.
 * @param {Object} props - Пропсы компонента.
 * @param {Object} props.hotel - Обьект с данными отеля.
 * @param {function} props.redirectToHotel - Функция для перехода на отель.
 * @returns {JSX.Element} - Компонент кнопок.
 */
const HotelButtons = React.memo(({hotel, redirectToHotel}) => (
    <div className={styles.wrapperBtn}>
        <Button text={"Номера"}
                hotel={hotel.type}
                handleClick={() => redirectToHotel(`${hotel.website}/reservation`)}
        />
        <Button text={"Перейти на отель"}
                hotel={hotel.type}
                handleClick={() => redirectToHotel(hotel.website)}
        />
    </div>
));
HotelButtons.displayName = "HotelButtons";