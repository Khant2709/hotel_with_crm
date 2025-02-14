import {makeRequest} from "./makeRequest";

/** Получает все бронирования.*/
export const getAllBookings = async () => makeRequest('get', '/booking');

/** Получает бронирования, требующие подтверждения.
 */
export const getUnverifiedBookings = async () => makeRequest('get', '/booking/noVerification');

/** Получает бронирования по дате.
 @param {string} typeQuery - Тип запроса (например, "arrival" или "departure").
 @param {string} date - Дата в формате YYYY-MM-DD.
 */
export const getBookingsByDate = async (typeQuery, date) => makeRequest('get', '/booking/bookingbydate', null, {
    typeQuery,
    date
});

/** Получает отфильтрованные бронирования.
 @param {Object} filters - Параметры фильтрации.
 @param {string} filters.startReservation - Начальная дата бронирования.
 @param {string} filters.endReservation - Конечная дата бронирования.
 @param {number} filters.countPeopleReservation - Количество людей.
 */
export const getFilterBooking = async ({
                                           startReservation,
                                           endReservation,
                                           countPeopleReservation
                                       }) => makeRequest('get', '/booking/filterBooking', null, {
    startReservation,
    endReservation,
    countPeopleReservation
});

/** Получает данные конкретного бронирования.
 @param {string} id - ID бронирования.
 */
export const getCurrentBooking = async (id) => makeRequest('get', `/booking/${id}`);