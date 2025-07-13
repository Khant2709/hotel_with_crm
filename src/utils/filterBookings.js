/**
 * Фильтрует бронирования для конкретного номера или всего дома.
 * @param {Object} params - Параметры для фильтрации.
 * @param {Array} params.allBookings - Все бронирования.
 * @param {Object} params.apartment - Конкретный номер.
 * @returns {Array} Отфильтрованные бронирования.
 */
export const filterBookingsFromApartment = ({
                                                allBookings,
                                                apartment,
                                            }) => {
    if (!allBookings.length || !apartment) return [];

    // Получаем какой это номер/дом
    const numberRoom = apartment.apartment_number.split('_');


    if (!numberRoom[1] || numberRoom[1] === 'all') {
        //Отфильтруем все брони относящиеся к этому коттеджу
        return allBookings.filter((booking) => booking.hotel_id === apartment.hotel_id && booking.apartment_number.split('_')[0] === numberRoom[0]);
    } else {
        //Отфильтруем все брони относящиеся к этому номеру
        return allBookings.filter((booking) => booking.hotel_id === apartment.hotel_id && booking.apartment_number.split('_')[0] === numberRoom[0] && booking.apartment_number.split('_')[1] === numberRoom[1]);
    }
};