/** Проверка даты, что является одной и тойже
 * @param {object} firstDate - Первая дата
 * @param {object} secondDate - Вторая дата
 * @return {boolean}
 * */
const compareDate = (firstDate, secondDate) => {
    return (
        firstDate.getDate() === secondDate.getDate() &&
        firstDate.getMonth() === secondDate.getMonth() &&
        firstDate.getFullYear() === secondDate.getFullYear()
    );
}

/** Проверка что день является сегоднешним
 * @param {object} currentDate - Дата из календаря
 * @return {boolean}
 */
export const isToday = (currentDate) => {
    const today = new Date();
    return compareDate(today, currentDate);
};

/** Проверка выбранна ли дата
 * @param {object} currentDate - Дата из календаря
 * @param {object} startDataReservation - Дата начало броони
 * @param {object} endDataReservation - Дата конца брони
 * @return {boolean}
 */
export const isSelectedDate = (currentDate, startDataReservation, endDataReservation) => {
    const isSelectedStartDate = compareDate(startDataReservation, currentDate);
    const isSelectedEndDate = compareDate(endDataReservation, currentDate);
    return isSelectedEndDate || isSelectedStartDate;
}

/** Проверка забронирована ли дата
 * @param {object} currentDate - Дата из календаря
 * @param {array} filterBooking - Список броней
 * @param {string} verificationStatus - Статус брони (Подтверждена || Ожидает подтверждения)
 * @return {boolean}
 */
export const isBookedDate = (currentDate, filterBooking, verificationStatus) => {
    return filterBooking.some((element) => {
        const startDate = new Date(element.start_date);
        const endDate = new Date(element.end_date);
        return (
            startDate.getTime() <= currentDate.getTime() &&
            endDate.getTime() > currentDate.getTime() &&
            element.status === verificationStatus
        );
    });
};

/** Проверка выбранные даты для брони
 * @param {object} currentDate - Дата из календаря
 * @param {object} startDataReservation - Дата начала брони
 * @param {object} endDataReservation - Дата конца брони
 * @return {boolean}
 */
export const isReservationDate = (currentDate, startDataReservation, endDataReservation) => {
    currentDate.setHours(0, 0, 0, 0);
    startDataReservation.setHours(0, 0, 0, 0);
    endDataReservation.setHours(0, 0, 0, 0);
    return (
        startDataReservation.getTime() <= currentDate.getTime() &&
        endDataReservation.getTime() >= currentDate.getTime()
    );
};