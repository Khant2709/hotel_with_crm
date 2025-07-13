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


/** Компонент страницы для бронирования конкретного номера */
const ComponentCurrentReservation = ({
                                         width,
                                         searchParams,
                                         hotel,
                                         hotelNumber,
                                         apartment,
                                         dataReservation,
                                         setDataReservation,
                                         searchCountAdultsReservation,
                                         searchCountChildrenReservation,
                                         bookings,
                                         allApartments,
                                         changeDataFromCalendar,
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
                    hotel={hotelNumber}
                    hasTopLine={true}
                    hasNameHotel={true}
                />

                <ComponentContainerPhotos width={width} photosApartment={apartment.images}/>

                <WrapperContentDescription currentApartment={apartment}/>

                <WrapperFormReservation
                    setDataReservation={setDataReservation}
                    dataReservation={dataReservation}
                    countAdults={searchCountAdultsReservation}
                    countChildren={searchCountChildrenReservation}
                    allBookings={bookings}
                    allApartments={allApartments}
                    currentApartment={apartment}
                    currentHotel={hotel}
                    hotelNumber={hotelNumber}
                />

                <WrapperInformationPrice
                    prices={Object.values(apartment.prices)}
                />

                <WrapperCalendar
                    hotelNumber={hotelNumber}
                    allBookings={bookings}
                    allApartments={allApartments}
                    currentApartment={apartment}
                    dataReservation={dataReservation}
                    changeDataFromCalendar={changeDataFromCalendar}
                />
                <WrapperAnaloguesApartment
                    hotelType={hotelNumber}
                    allApartments={allApartments}
                    currentApartment={apartment}
                />
            </div>
        </div>

    );
};

export default ComponentCurrentReservation;