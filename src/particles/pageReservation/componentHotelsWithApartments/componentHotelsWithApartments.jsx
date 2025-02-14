import React from 'react';

import Preloader from "../../../components/ui/preloader/preloader";
import HeaderLine from "../../../components/ui/headerLine/headerLine";
import FormSearchDate from "../../../components/ui/formSerchDate/formSearchDate";
import HotelContainer from "../../../components/ui/HotelContainer/hotelContainer";
import ErrorResponseData from "../../../components/ui/error/errorResponseData/errorResponseData";

import styles from "./componentHotelsWithApartments.module.css";

/** Компонент всех отелей с карточками номеров
 *
 * @param {Object} props - Пропсы компонента.
 * @param {Array} props.freeApartments - Массив всех свободных номеров.
 * @param {Array} props.allHotels - Список отелей.
 * @param {URLSearchParams} props.searchParams - Параметры запроса.
 * @param {boolean} props.isLoading - Флаг, указывающий, произошла ли ошибка при загрузке данных.
 * @param {Array} props.hasErrorInLoad - Флаг показывающий есть ли ошибка при загрузке данных.
 * @returns {JSX.Element} - Компонент всех отелей с карточками номеров.
 */
const ComponentHotelsWithApartments = ({searchParams, isLoading, allHotels, freeApartments, hasErrorInLoad}) => (
    <div className={styles.main}>
        <HeaderLine searchParams={searchParams} color={"black"}/>
        <div className={styles.wrapperFormSearch}>
            <FormSearchDate searchParams={searchParams}/>
        </div>
        {isLoading
            ? <Preloader/>
            : <>
                {hasErrorInLoad && <ErrorResponseData hasHeaderLine={false}
                                                      page={"Reservation"}
                                                      error={freeApartments}
                                                      text={"Произошла ошибка, не уалось загрузить данные."}
                />}
                {!hasErrorInLoad && !freeApartments?.length &&
                <p className={styles.errorEmpty}>К сожалению, на данный период нет свободных номеров во всех отелях</p>}
                {!hasErrorInLoad && allHotels.map((hotel) => {
                    const apartmentsFromHotel = freeApartments.filter((room) => room.hotel_id === hotel.id);
                    if (apartmentsFromHotel.length !== 0) {
                        return (
                            <div className={styles.wrapperOtherHotelsList} key={hotel.id}>
                                <HotelContainer
                                    hotel={hotel}
                                    apartmentsFromHotel={apartmentsFromHotel}
                                    hasQuery={true}
                                    searchParams={searchParams}
                                />
                            </div>
                        );
                    }
                })}
            </>
        }
    </div>
);

export default ComponentHotelsWithApartments;