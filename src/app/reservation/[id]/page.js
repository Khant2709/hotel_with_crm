import React from "react";

import WrapperCurrentReservation from "../../../particles/reservationCurrentRoom/wrapperCurrentReservation";
import {getDataToPage} from "../../../particles/reservationCurrentRoom/getDataToPage";

import ErrorResponseData from "../../../components/ui/error/errorResponseData/errorResponseData";

import {HOTELS_NAME_AND_LINK} from "../../../config/envData";

import {jsonLDCurrentRoom} from "../../../data/seoData";
import {metaDataCurrentRoom} from "../../../data/metaData";

/** Функция нахождения конкретного отеля */
const getHotelById = (id) => {
    return HOTELS_NAME_AND_LINK.find(hotel => hotel.id === id)
}

/** Мета данные страницы брони конкретного номера. */
export async function generateMetadata({params: {id}}) {
    const {currentApartmentData} = await getDataToPage(id, 'meta');
    const currentApartment = currentApartmentData?.data[0];
    const currentHotel = getHotelById(currentApartment?.hotel_id);
    return metaDataCurrentRoom(id, currentHotel, currentApartment);
}

/** Основной (серверный компонент) страницы брони конкретного номера.
 * @returns {JSX.Element} - Компонент страницы брони конкретного номера.
 * */
export default async function Page({params: {id}}) {
    const {apartmentsData, currentApartmentData, bookingsData} = await getDataToPage(id, 'initial');

    const isResponseValid = (response, isObject = false) => {
        return response?.status === 200 && (isObject ? response.data[0]?.id : response.data.length > 0);
    };

    if (!isResponseValid(apartmentsData) || !isResponseValid(currentApartmentData, true)) {
        return <ErrorResponseData
            hasHeaderLine={true}
            page={"CurrentReservation"}
            error={[apartmentsData, currentApartmentData]}
            text={"Произошла ошибка, не уалось загрузить информацию."}
        />
    }

    const apartment = currentApartmentData.data[0];
    const currentHotel = getHotelById(apartment.hotel_id);

    const jsonLd = jsonLDCurrentRoom({
        room: apartment,
        hotelData: currentHotel
    });

    return (
        <section>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}}
            />
            <WrapperCurrentReservation id={id}
                                       currentHotel={currentHotel}
                                       currentApartment={apartment}
                                       allApartments={apartmentsData.data}
                                       allBookings={bookingsData.data}
            />
        </section>
    );
}
