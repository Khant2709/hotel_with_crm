import Calendar from "../../../../components/ui/Calendar/calendar";
import {mainColorHotel} from "../../../../config/colorConfig";

import stylesFontsT from "../../../../styles/fonts/timesNewRoman.module.css";

import styles from "./contentCalendar.module.css";

/** Компонент календаря.
 * @param {Object} props - Пропсы компонента.
 * @param {string} props.hotelNumber - Тип отеля.
 * @param {array} props.filterBooking - Список всех броней для текущего номера.
 * @param {object} props.dataReservation - Даты брони {startDataReservation, endDataReservation}.
 * @param {function} props.changeDataFromCalendar - Обработчик изменения дат.
 * @returns {JSX.Element} - Компонент календаря.
 */
export const ContentCalendar = ({
                                    filterBooking,
                                    hotelNumber,
                                    dataReservation,
                                    changeDataFromCalendar,
                                }) => {
    return (
        <>
            <p className={`${stylesFontsT.newRoman400} ${styles.titleCalendar}`}>
                Забронированные даты:
            </p>
            <div className={styles.wrapperCalendar}
                style={{borderColor: mainColorHotel[hotelNumber]}}
            >
                <Calendar
                    filterBooking={filterBooking}
                    hotelNumber={hotelNumber}
                    dataReservation={dataReservation}
                    changeDataFromCalendar={changeDataFromCalendar}
                />
            </div>
        </>
    );
};
