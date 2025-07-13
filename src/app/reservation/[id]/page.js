import React from "react";

import WrapperCurrentReservation from "../../../particles/reservationCurrentRoom/wrapperCurrentReservation";

import ErrorResponseData from "../../../components/ui/error/errorResponseData/errorResponseData";

import {HOTEL_TYPE, HOTELS_NAME_AND_LINK, TIME_CASH} from "../../../config/envData";

import {jsonLDCurrentRoom} from "../../../data/seoData";
import {metaDataCurrentRoom} from "../../../data/metaData";
import {batchRequest, singleRequest} from "../../../services/utils/requestUtils";
import {apartmentsAPI, bookingAPI} from '../../../services/api';

/** Функция нахождения конкретного отеля */
const getHotelById = (id) => {
    return HOTELS_NAME_AND_LINK.find(hotel => hotel.id === id)
}

/** Мета данные страницы брони конкретного номера. */
export async function generateMetadata({params: {id}}) {
    const apartmentData = await singleRequest(() => apartmentsAPI.getCurrentApartment(id, TIME_CASH["60min"]))
    if (apartmentData.status !== 200) return null;

    const currentApartment = apartmentData.data.data[0];
    const currentHotel = getHotelById(currentApartment.hotel_id);
    return metaDataCurrentRoom(id, currentHotel, currentApartment);
}

async function getData(id) {
    const data = {
        apartmentData: null,
        allApartmentsData: null,
        bookingsData: null,
    };

    const request = [
        () => apartmentsAPI.getCurrentApartment(id, TIME_CASH["60min"]),
        () => apartmentsAPI.getAllApartments(TIME_CASH["60min"]),
        () => bookingAPI.getAllBookings(TIME_CASH["5min"]),
    ];

    return await batchRequest(data, request);
}

/** Основной (серверный компонент) страницы брони конкретного номера. */
export default async function Page({params: {id}}) {
    const {apartmentData, allApartmentsData, bookingsData} = await getData(id);

    if (apartmentData.status !== 200 ||
        allApartmentsData.status !== 200 ||
        bookingsData.status >= 300
    ) {
        return (
            <ErrorResponseData
                hasHeaderLine={true}
                page={'CURRENT_APARTMENT'}
                text={"Произошла ошибка, не уалось загрузить статьи."}
                error={apartmentData?.error || allApartmentsData?.error || bookingsData?.error || 'Произошла ошибка при загрузке данных отеля. =('}
            />
        );
    }
    const apartment = apartmentData.data.data[0];
    const allApartments = allApartmentsData.data.data;
    const bookings = bookingsData.data.data;
    const currentHotel = getHotelById(apartment.hotel_id);

    const jsonLd = jsonLDCurrentRoom({
        room: apartmentData,
        hotelData: currentHotel
    });

    return (
        <section>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}}
            />
            <WrapperCurrentReservation
                id={id}
                ssrData={{currentHotel, allApartments, apartment}}
                hotelNumber={HOTEL_TYPE}
                allBookings={bookings}
            />
        </section>
    );
}

export const revalidate = TIME_CASH["60min"] / 1000;