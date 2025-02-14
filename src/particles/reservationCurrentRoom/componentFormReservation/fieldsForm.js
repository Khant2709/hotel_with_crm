import {textFromAmount} from "../../../utils/mask/textFromAmount";

/** Поля для гостевого ввода
 * @param {function} setDataReservation - обработчик изменения дат
 * @param {function} setDataPeople - обработчик изменения кол. проживающих
 * @param {object} dataReservation - данные дат
 * @param {object} dataPeople - данные проживающих
 * @param {object} dataPrice - данные цен
 * @return {array} массив полей
 * */
export const getFields = (setDataReservation, setDataPeople, dataReservation, dataPeople, dataPrice) => {
    const {startDataReservation, endDataReservation} = dataReservation;
    const {countAdults, countChildren} = dataPeople;
    const {averageSumPerDay, totalDays, totalSum} = dataPrice;

    return [
        {
            label: "Дата заезда:",
            name: "startDataReservation",
            type: "date",
            value: startDataReservation,
            onChange: (e) => setDataReservation({...dataReservation, startDataReservation: e.target.value}),
        },
        {
            label: "Дата выезда:",
            name: "endDataReservation",
            type: "date",
            value: endDataReservation,
            onChange: (e) => setDataReservation({...dataReservation, endDataReservation: e.target.value}),
        },
        {
            label: "Кол. взрослых:",
            name: "countAdults",
            type: "select",
            maxValue: 16,
            value: countAdults,
            onChange: (e) => setDataPeople((prev) => ({...prev, countAdults: e.target.value})),
        },
        {
            label: "Кол. детей:",
            name: "countChildren",
            type: "select",
            maxValue: 16,
            value: countChildren,
            onChange: (e) => setDataPeople((prev) => ({...prev, countChildren: e.target.value})),
        },
        {
            label: `Цена за 1 ночь:`,
            name: "priceOneNight",
            type: "text",
            value: averageSumPerDay,
        },
        {
            label: `Цена за ${totalDays} ${textFromAmount(
                totalDays,
                "ночь",
                "ночи",
                "ночей"
            )}`,
            name: "finishPrice",
            type: "text",
            value: totalSum,
        },
    ];
};