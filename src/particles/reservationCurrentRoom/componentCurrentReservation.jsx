import React from 'react';

import HeaderLine from "../../components/ui/headerLine/headerLine";
import FormSearchDate from "../../components/ui/formSerchDate/formSearchDate";
import TitleWithLine from "../../components/ui/title/titleWithLine";

import ComponentContainerPhotos from "./contentPhotos/componentContainerPhotos";
import WrapperContentDescription from "./contentDescription/wrapper";
import WrapperFormReservation from "./componentFormReservation/wrapper";
import WrapperInformationPrice from "./componentInformationPrice/wrapper";
import WrapperCalendar from "./componentCalendar/wrapper";
import WrapperAnaloguesApartment from "./componentAnaloguesApartment/wrapper";

import styles from "./componentCurrentReservation.module.css";


/** Компонент страницы для бронирования конкретного номера
 * @param {object} props - Пропсы компонента.
 * @param {number} props.width - Ширина экрана.
 * @param {string} props.searchParams - QUERY Параметры дат и кол. чел.
 * @param {object} props.hotel - Данные отеля.
 * @param {array} props.hotel - Список всех номеров.
 * @param {function} props.setDataReservation - Обработчик изменения дат для брони.
 * @param {Object} props.dataReservation - Данные дат брони {startDataReservation, endDataReservation}.
 * @param {Object} props.countOfResidents - Колличество проживающих {countAdults, countChildren}.
 * @param {function} props.changeDataFromCalendar - Обработчик на изменение дат в календаре.
 * @return {JSX.Element} - Компонент страницы для бронирования конкретного номера.
 * */
const ComponentCurrentReservation = ({
                                         width,
                                         searchParams,
                                         hotel,
                                         apartment,
                                         allApartments,
                                         bookings,
                                         setDataReservation,
                                         dataReservation,
                                         countOfResidents,
                                         changeDataFromCalendar
                                     }) => {
    return (
        <div className={styles.main}>
            <HeaderLine searchParams={searchParams} color={"black"}/>

            {width > 768 &&
            <div className={styles.wrapperFormSearch}>
                <FormSearchDate searchParams={searchParams}/>
            </div>
            }

            <div className={styles.wrapperMain}>
                <TitleWithLine
                    text={hotel.name}
                    hotelType={hotel.type}
                    showTopLine={true}
                    showHotelPrefix={true}
                />

                <ComponentContainerPhotos width={width} photosApartment={apartment.images}/>

                <WrapperContentDescription currentApartment={apartment}/>

                <WrapperFormReservation
                    setDataReservation={setDataReservation}
                    dataReservation={dataReservation}
                    countAdults={countOfResidents.countAdults}
                    countChildren={countOfResidents.countChildren}
                    allBookings={bookings}
                    allApartments={allApartments}
                    currentApartment={apartment}
                    currentHotel={hotel}
                    hotelNumber={hotel.type}
                />

                <WrapperInformationPrice
                    prices={Object.values(apartment.prices)}
                />

                <WrapperCalendar
                    hotelNumber={hotel.type}
                    allBookings={bookings}
                    allApartments={allApartments}
                    currentApartment={apartment}
                    dataReservation={dataReservation}
                    changeDataFromCalendar={changeDataFromCalendar}
                />
                <WrapperAnaloguesApartment
                    hotelType={hotel.type}
                    allApartments={allApartments}
                    currentApartment={apartment}
                />
            </div>
        </div>

    );
};

export default ComponentCurrentReservation;