import React from "react";

import CardApartment from "../cardApartment/cardApartment";
import TitleWithLine from "../title/titleWithLine";

import {BASE_URL_IMAGES} from "../../../config/envData";

import styles from "./hotelContainer.module.css";
import ErrorLoadingData from "../error/errorLoadingData/errorLoadingData";

/**
 * (Глупый) Компонент для отображения контейнера номеров конкретного отеля.
 * @param {Object} props - Пропсы компонента.
 * @param {Object} props.hotel - Данные отеля.
 * @param {Array} props.apartmentsFromHotel - Список номеров.
 * @param {Function} props.handleApartmentClick - Функция для перехода на страницу бронирования.
 * @returns {JSX.Element} - Контейнер номеров конкретного отеля.
 */
const HotelView = ({hotel, apartmentsFromHotel, handleApartmentClick}) => {
    return (
        <div className={styles.wrapperHotel}>
            <TitleWithLine
                text={hotel.name}
                showTopLine={true}
                hotelType={hotel.type}
                showHotelPrefix={true}
            />
            <div className={styles.wrapperCards}>
                {apartmentsFromHotel.map((apartment, indexApartment) => (
                    <CardApartment
                        image={`${BASE_URL_IMAGES}${apartment.apartment_folder_img}/${apartment.apartment_preview_img_name}`}
                        title={apartment.apartment_name}
                        bedsCount={apartment.person_max}
                        roomsCount={apartment.amount_rooms}
                        cost={apartment?.prices ? Math.min(...Object.values(apartment.prices)) : 0}
                        numberHotel={hotel.type}
                        handleApartmentClick={() => handleApartmentClick(apartment.id)}
                        key={indexApartment}
                    />
                ))}
            </div>
        </div>
    );
};

export default React.memo(HotelView);