const getBookingDates = (booking) => {
    return {
        startDate: new Date(booking.start_date),
        endDate: new Date(booking.end_date),
    };
};

/** Утилиты для работы с данными бронирований. */
export const getDataFromTable = {
    /** Получение конкретного отеля. */
    currentHotel: (booking, allHotel) => {
        return allHotel.find((hotel) => hotel.id === booking.hotel_id);
    },
    /** Получение конкретного номера. */
    currentApartment: (booking, allApartments) => {
        return allApartments.find((apartment) => apartment.id === booking.apartment_id);
    },
    /** Возвращает дату начала бронирования в формате строки. */
    startReservation: (booking) => {
        return new Date(booking.start_date).toLocaleDateString();
    },
    /** Возвращает дату конца бронирования в формате строки. */
    endReservation: (booking) => {
        return new Date(booking.end_date).toLocaleDateString();
    },
    /** Проверяет, завершено ли бронирование. */
    finishedLiving: (currentDate, booking) => {
        const { endDate } = getBookingDates(booking);
        return currentDate > endDate;
    },
    /** Проверяет, активно ли бронирование в текущий момент. */
    nowLiving: (currentDate, booking) => {
        const { startDate, endDate } = getBookingDates(booking);
        return currentDate >= startDate && currentDate <= endDate;
    },
    /** Форматирует номер телефона, удаляя все нечисловые символы. */
    transformPhone: (booking) => {
        return booking.guest_phone.replace(/\D/g, '');
    },
    /** Форматирует дату в короткий вид (день.месяц). */
    sliceDate: (date) => {
        return date.split('.').slice(0, 2).join('.')
    }
};