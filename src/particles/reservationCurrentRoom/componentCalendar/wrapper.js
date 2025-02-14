import {useMemo} from "react";

import {ContentCalendar} from "./contentCalendar/contentCalendar";

import {filterBookingsFromApartment} from "../../../utils/filterBookings";

/** Компонент-обертка календаря.
 * @param {Object} props - Пропсы компонента.
 * @param {string} props.hotelNumber - Тип отеля.
 * @param {array} props.allBookings - Список всех броней.
 * @param {array} props.allApartments - Список всех номеров.
 * @param {object} props.currentApartment - Текущий номер.
 * @param {object} props.dataReservation - Даты брони {startDataReservation, endDataReservation}.
 * @param {function} props.changeDataFromCalendar - Обработчик изменения дат.
 * @returns {JSX.Element} - Компонент календаря.
 */
const WrapperCalendar = ({
                             hotelNumber,
                             allBookings,
                             allApartments,
                             currentApartment,
                             dataReservation,
                             changeDataFromCalendar,
                         }) => {
    const filterBooking = useMemo(() => filterBookingsFromApartment({
        allBookings,
        allApartments,
        apartment: currentApartment,
    }), [allBookings, allApartments, currentApartment]);

    return (
        <ContentCalendar
            filterBooking={filterBooking}
            hotelNumber={hotelNumber}
            dataReservation={dataReservation}
            changeDataFromCalendar={changeDataFromCalendar}
        />
    );
};

export default WrapperCalendar;
