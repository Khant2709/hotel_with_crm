import {checkDateCorrectness, getDayStartSeason, getNextDay, getToday} from "./getDay";

/**
 * Возвращает дефолтные даты заезда и выезда в зависимости от сезона.
 * @returns {{ getDateStart: string, getDateEnd: string }} Даты заезда и выезда (YY_MM_DD).
 */
export const getDefaultDateReservation = () => {
    const {checkInDate, checkOutDate} = getDayStartSeason();
    const isDateValid = checkDateCorrectness();

    return {
        getDateStart: isDateValid ? getToday() : checkInDate,
        getDateEnd: isDateValid ? getNextDay() : checkOutDate,
    };
}