import {makeRequest} from "./makeRequest";


/** Получает все бронирования.*/
export const getAllBookings = async (cacheAge) =>
    makeRequest('get', '/booking', null, null, false, cacheAge = null);

/** Получает бронирования, требующие подтверждения.*/
export const getUnverifiedBookings = async () => makeRequest('get', '/booking/noVerification');

/** Получает бронирования по дате.*/
export const getBookingsByDate = async (typeQuery, date) => makeRequest('get', '/booking/bookingbydate', null, {
    typeQuery,
    date
});

/** Получает отфильтрованные бронирования. */
export const getFilterBooking = async ({
                                           startReservation,
                                           endReservation,
                                           countPeopleReservation,
                                           cacheAge
                                       }) => makeRequest(
    'get',
    '/booking/freeApartments',
    null,
    {
        startReservation,
        endReservation,
        countPeopleReservation
    },
    false,
    cacheAge
);

/** Получает данные конкретного бронирования. */
export const getCurrentBooking = async (id) => makeRequest('get', `/booking/${id}`);

export const getEndingBooking = async (type) => makeRequest('get', '/booking/endingBooking', null, {type});