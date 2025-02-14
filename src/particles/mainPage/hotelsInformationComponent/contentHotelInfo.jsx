import React from 'react';

import TitleWithLine from "../../../components/ui/title/titleWithLine";

import styles from './contentHotelInfo.module.css';
import AllHotelsContent from "../../../components/ui/componentHotels/componentsHotels";

/** Компонент всех отелей.
 * @param {Object} props - Пропсы компонента.
 * @param {Array} props.hotels - Список отелей.
 * @param {number} props.width - Ширина экрана.
 * @returns {JSX.Element} - Компонент всех отелей.
 */
const ContentHotelInfo = ({hotels, width}) => {
    return (
        <div className={styles.wrapper}>
            <TitleWithLine text={'Отдых на черноморском побережье'} showTopLine={true} hotelType={'hotel_5'}/>
            <AllHotelsContent allHotel={hotels} width={width}/>
        </div>
    );
};

export default ContentHotelInfo;