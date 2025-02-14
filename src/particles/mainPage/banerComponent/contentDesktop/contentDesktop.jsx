import React from 'react';
import Link from "next/link";

import styles from './contentDesktop.module.css';
import stylesFontT from '../../../../styles/fonts/timesNewRoman.module.css';


/** Компонент банерас отелями (десктоп версия)
 * @param {object} props - Пропсы компонента.
 * @param {array} props.hotelsData - Список отелей.
 * @param {number} props.hoveredHotel - ID наведенного отеля.
 * @param {function} props.changeState - Обработчик при наводе на отель.
 * @returns {JSX.Element} - Компонент банерас отелями (десктоп версия).
 * */
const ContentDesktop = ({hotelsData, hoveredHotel, changeState}) => {
    return (
        <div className={styles.wrapperHotels}>
            {hotelsData.map(hotel => {
                const isHovered = hoveredHotel === hotel.id;
                const style = {
                    backgroundImage: `url(${hotel.image.src})`,
                    ...(hoveredHotel && !isHovered ? {transform: 'scale(0.97)'} : {})
                };
                return (
                    <Link href={hotel.website} key={hotel.id}>
                        <div
                            className={styles.containerHotel}
                            style={style}
                            onMouseEnter={() => changeState(hotel.id)}
                            onMouseLeave={() => changeState(null)}
                        >
                            <div className={`${hoveredHotel && !isHovered ? styles.faded : ''}`}/>
                            <hr/>
                            <p className={`${stylesFontT.newRoman700} ${styles.hotelName}`}>{hotel.name}</p>
                            <p className={`${stylesFontT.newRoman400} ${styles.hotelAddress}`}>{hotel.address}</p>
                        </div>
                    </Link>
                )
            })}
        </div>
    );
};

export default ContentDesktop;