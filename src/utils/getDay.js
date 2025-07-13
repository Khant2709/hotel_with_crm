import {MIN_RESERVATION_DAYS, PERIODS_MONTH_DAY} from "../config/envData";

/**
 * Форматирует дату в строку формата "YYYY-MM-DD".
 * @param {Date} date - Объект Date.
 * @returns {string} Отформатированная дата.
 */
const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // добавляем 0 перед числами меньше 10
    const day = String(date.getDate()).padStart(2, "0"); // добавляем 0 перед числами меньше 10
    return `${year}-${month}-${day}`;
};

/**
 * Возвращает текущую дату в формате "YYYY-MM-DD".
 * @returns {string} Текущая дата.
 */
export const getToday = () => formatDate(new Date());

/**
 * Возвращает дату через MIN_RESERVATION_DAYS дней в формате "YYYY-MM-DD".
 * @returns {string} Дата через MIN_RESERVATION_DAYS дней.
 */
export const getNextDay = () => {
    const today = new Date();
    const nextDay = new Date(today);
    nextDay.setDate(today.getDate() + MIN_RESERVATION_DAYS);
    return formatDate(nextDay);
};

export const getPeriodWork = () => {
    const today = new Date();
    const month = today.getMonth();

    // Если месяц больше месяца конца сезона
    const year = month < 10 ? today.getFullYear() : today.getFullYear() + 1;
    const startDatePeriod = PERIODS_MONTH_DAY.firstPeriod.startDate;
    const endDatePeriod = PERIODS_MONTH_DAY.fourthPeriod.endDate;

    return {
        startSeason: formatDate(new Date(`${year}-${startDatePeriod}`)),
        endSeason: formatDate(new Date(`${year}-${endDatePeriod}`))
    }
}

/**
 * Возвращает даты заезда и выезда на основе начала сезона.
 * @returns {{ checkInDate: string, checkOutDate: string }} Даты заезда и выезда.
 */
export const getDayStartSeason = () => {
    const today = new Date();
    const month = today.getMonth();

    // Если месяц больше месяца конца сезона
    const year = month < 10 ? today.getFullYear() : today.getFullYear() + 1;

    const startDatePeriod = PERIODS_MONTH_DAY.firstPeriod.startDate;
    const [startMonth, startDay] = startDatePeriod.split("-");
    const checkInDate = `${year}-${startDatePeriod}`;

    const checkOutDate = new Date(`${year}-${startMonth}-${startDay}`);
    checkOutDate.setDate(checkOutDate.getDate() + MIN_RESERVATION_DAYS);

    return {checkInDate, checkOutDate: formatDate(checkOutDate)};
};

/**
 * Проверяет, находится ли текущая дата в пределах сезона.
 * @returns {boolean} true, если дата в пределах сезона, иначе false.
 */
export const checkDateCorrectness = () => {
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1;

    const {startDate: startDatePeriod} = PERIODS_MONTH_DAY.firstPeriod;
    const {endDate: endDatePeriod} = PERIODS_MONTH_DAY.fourthPeriod;

    const [startMonth, startDay] = startDatePeriod.split("-").map(Number);
    const [endMonth, endDay] = endDatePeriod.split("-").map(Number);

    if (month < startMonth || month > endMonth) return false;
    if (month === startMonth && day < startDay) return false;
    if (month === endMonth && day > endDay) return false;

    return true;
};

/**
 * Возвращает количество дней в текущем месяце.
 * @param {Date} currentDate - Текущая дата.
 * @param {number} currentMonth - Текущий месяц (0-11).
 * @returns {number} Количество дней в текущем месяце.
 */
export const getLastDay = ({currentDate, currentMonth}) => {
    const nextMonth = new Date(currentDate.getFullYear(), currentMonth + 1, 1);
    nextMonth.setDate(nextMonth.getDate() - 1);
    return nextMonth.getDate();
};

/**
 * Преобразует дату из формата "YYYY-MM-DD" в "DD-MM-YYYY".
 * @param {string} dateString - Дата в формате "YYYY-MM-DD".
 * @returns {string} Дата в формате "DD-MM-YYYY".
 */
export const transformDateFormat = (dateString) => {
    if (!dateString) return null;

    const [year, month, day] = dateString.split("-");
    return `${day}-${month}-${year}`;
};
