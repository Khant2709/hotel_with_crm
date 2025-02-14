import {
    validateBookingDate,
    validateCountPeopleReservation,
    validateDataReservation
} from "../../../utils/validate/vaidateFormReservation";
import {filterBookingsFromApartment} from "../../../utils/filterBookings";
import calculateTotalAndAverage from "../../../utils/calculateTotalAndAverage";
import {getToday} from "../../../utils/getDay";


/** Функция для провеки данных брони и расчет цены для брони
 * @param {object} startDate - дата начала брони
 * @param {object} endDate - дата конца брони
 * @param {object} dataPeople - данные кол. проживающих
 * @param {object} currentApartment - данные текущего номера
 * @param {array} allBookings - список всех броней
 * @param {array} allApartments - список всех номеров
 * @param {object} dataPrice - данные по ценам номера (цена за день, за весь период, кол. дней)
 * @param {object || array} errorReservation - данные валидации, изначально null затем массив ошибок текстовых
 * @param {function} setDataPrice - обработчик изменения цен и кол. дней
 * @param {function} setErrorReservation - обработчик ошибок
 * */
export const validFieldAndGetPrice = ({
                                          startDate,
                                          endDate,
                                          dataPeople,
                                          currentApartment,
                                          allBookings,
                                          allApartments,
                                          dataPrice,
                                          errorReservation,
                                          setDataPrice,
                                          setErrorReservation
                                      }) => {
    const today = new Date(getToday()).getTime();
    const error = [];

    const resultValidDate = validateDataReservation({
        today,
        startDate: startDate.getTime(),
        endDate: endDate.getTime(),
    });
    if (resultValidDate.error) error.push(resultValidDate.text);

    const resultValidCountPeople = validateCountPeopleReservation({
        countPeople:
            +dataPeople.countAdults + +dataPeople.countChildren,
        limitPeople: currentApartment.person_max,
        setErrorReservation,
    });
    if (resultValidCountPeople.error) error.push(resultValidCountPeople.text);

    const filterBooking = filterBookingsFromApartment({
        allBookings,
        allApartments,
        apartment: currentApartment,
    });

    const checkReservationDate = validateBookingDate({
        filterBooking,
        startDate,
        endDate,
    });
    if (checkReservationDate.error) error.push(checkReservationDate.text);

    const {
        averageSumPerDay,
        totalSum,
        totalDays,
        error: errorCalculate,
        text: textCalculate,
    } = calculateTotalAndAverage({
        startReservation: startDate.getTime(),
        endReservation: endDate.getTime(),
        priceArray: Object.values(currentApartment.prices),
    });
    if (errorCalculate) error.push(textCalculate);

    if (
        dataPrice.averageSumPerDay !== averageSumPerDay ||
        dataPrice.totalSum !== totalSum ||
        dataPrice.totalDays !== totalDays
    ) {
        setDataPrice({averageSumPerDay, totalSum, totalDays});
    }

    if (
        error.length > 0 &&
        JSON.stringify(error) !== JSON.stringify(errorReservation)
    ) {
        setErrorReservation(error);
    } else if (error.length === 0 && errorReservation !== null) {
        setErrorReservation(null);
    }
}