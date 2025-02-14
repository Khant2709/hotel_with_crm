/**
 * Фильтрует отели, исключая отель с id = 5 и типом 'hotel_5'.
 * @param {Array<{id: number, type: string}>} hotels - Массив отелей.
 * @returns {Array<{id: number, type: string}>} Отфильтрованный массив отелей.
 */
export const filterHotels = (hotels) => {
    return hotels.filter(hotel => hotel.id !== 5 && hotel.type !== 'hotel_5');
};