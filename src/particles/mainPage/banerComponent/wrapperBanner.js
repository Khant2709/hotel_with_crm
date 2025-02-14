'use client'

import React, {useCallback, useMemo, useState} from 'react';

import ContentDesktop from "./contentDesktop/contentDesktop";
import ContentMobile from "./contentMobile/contentMobile";

import {HOTELS_NAME_AND_LINK} from "../../../config/envData";

import styles from './wrapperBanner.module.css';

/** Компонент обертка для компонента банера на главной страницы
 * @param {object} props - Пропсы компонента.
 * @param {array} props.hotels - Список отелей.
 * @param {number} props.width - Ширина экрана.
 * @returns {JSX.Element} - Компонент банера главной страницы.
 * */
const WrapperBanner = ({hotels, width}) => {
    const [hoveredHotel, setHoveredHotel] = useState(null);

    const hotelsData = useMemo(() => hotels.reduce(
        function (prev, curr) {
            const defaultDataHotel = HOTELS_NAME_AND_LINK.find(hotel => hotel.id === curr.id);
            return [...prev, {
                id: curr.id,
                type: curr.type || defaultDataHotel.type,
                name: curr.name || defaultDataHotel.name,
                address: curr.address || defaultDataHotel.address,
                website: curr.website || defaultDataHotel.link,
                image: defaultDataHotel.image
            }]
        }, []
    ), [hotels])


    const toggleStateContainerHotel = useCallback((id) => {
        if (hoveredHotel) {
            setHoveredHotel(null);
        } else {
            if (id) setHoveredHotel(id);
        }
    }, [hoveredHotel]);

    return (
        <div className={styles.main}>
            {width > 480
                ? <ContentDesktop hotelsData={hotelsData}
                                  hoveredHotel={hoveredHotel}
                                  changeState={toggleStateContainerHotel}
                />
                : <ContentMobile obile hotels={hotelsData}/>
            }
        </div>
    );
};

export default WrapperBanner;