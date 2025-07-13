import {booking, articles} from "./api";

/**
 * Функция для получения данных броней
 * @param {string} type - тип запроса
 * @param {string || null} date - выбранная дата (если применимо)
 * @returns {Promise<Array>} - массив данных броней
 */
export const fetchingBookingData = async (type, date = null) => {
    try {
        const fetchMap = {
            all: () => booking.getAllBookings(),
            unconfirmed: () => booking.getUnverifiedBookings(),
            checkin: (date) => booking.getBookingsByDate('checkin', date),
            checkout: (date) => booking.getBookingsByDate('checkout', date)
        };

        if (!fetchMap[type]) {
            throw new Error(`Неизвестный тип запроса: ${type}`);
        }

        const response = await fetchMap[type](date);

        if (response?.status >= 200 && response?.status < 300) {
            return response?.data?.data || [];
        } else {
            throw new Error(response?.response?.errorText || 'Ошибка при получении данных броней.');
        }
    } catch (error) {
        console.error(`! Ошибка в fetchingBookingData: ${error.message}`);
        throw error;
    }
};