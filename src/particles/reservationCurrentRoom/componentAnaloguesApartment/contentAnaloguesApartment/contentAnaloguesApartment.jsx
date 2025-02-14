'use client'

import CardApartment from "../../../../components/ui/cardApartment/cardApartment";

import {BASE_URL_IMAGES} from "../../../../config/envData";

import styles from "./contentAnaloguesApartment.module.css";
import stylesFontsT from "../../../../styles/fonts/timesNewRoman.module.css";

/** Компонент похожих номеров.
 * @param {Object} props - Пропсы компонента.
 * @param {array} props.analoguesRooms - Список похожих номеров.
 * @param {string} props.hotelType - Тип отеля.
 * @param {Function} props.handleApartmentClick - Функция для перехода на другой номер.
 * @returns {JSX.Element} - Компонент похожих номеров.
 */
export const ContentAnaloguesApartment = ({
                                              analoguesRooms,
                                              hotelType,
                                              handleApartmentClick,
                                          }) => (
    <div className={styles.wrapperAnaloguesRooms}>
        <h2 className={stylesFontsT.newRoman400}>Похожие преложения</h2>
        <div className={styles.wrapperCards}>
            {analoguesRooms.slice(0, 3).map((apartment, indexApartment) => {
                const imageUrl = `${BASE_URL_IMAGES}${apartment.apartment_folder_img}/${apartment.apartment_preview_img_name}`;
                return (
                    <CardApartment
                        image={imageUrl}
                        title={apartment.apartment_name}
                        bedsCount={apartment.person_max}
                        roomsCount={apartment.amount_rooms}
                        cost={Math.min(...Object.values(apartment.prices)) || 0}
                        numberHotel={hotelType}
                        handleApartmentClick={() => handleApartmentClick(apartment.id)}
                        key={indexApartment}
                    />
                );
            })}
        </div>
    </div>
);
