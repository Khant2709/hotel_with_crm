import {formatPhoneWithMask} from "../../../../../../utils/mask/transfomNumber";
import {getDataFromTable} from "../bookingDataUtils";

/**
 * Создает объект поля для отображения в карточке бронирования.
 * @param {Object} field - Параметры поля.
 * @param {string} field.type - Тип поля (например, 'bookingId', 'phone').
 * @param {string} field.label - Заголовок поля.
 * @param {string} field.value - Значение поля.
 * @param {Function} [field.fn] - Функция, вызываемая при клике на поле (опционально).
 * @param {string} [field.link] - Ссылка для поля (опционально).
 * @returns {Object} - Объект поля.
 */
function createField({type, label, value, fn = undefined, link = '#'}) {
    return {type, label, value, fn, link}
}

/**
 * Генерирует массив полей для отображения в карточке бронирования.
 * @param {Object} params - Параметры для генерации полей.
 * @param {Object} params.booking - Данные бронирования.
 * @param {Object} params.currentHotel - Текущий отель.
 * @param {Object} params.currentApartment - Текущий номер.
 * @param {Function} params.changeCardStatus - Функция для изменения состояния карточки.
 * @param {string} params.startDataReserv - Дата начала бронирования.
 * @param {string} params.endDataReserv - Дата окончания бронирования.
 * @returns {Array} - Массив полей для отображения.
 */
const fieldsData = ({booking, currentHotel, currentApartment, changeCardStatus, startDataReserv, endDataReserv}) => {
    return [
        createField({
            type: 'bookingId',
            label: 'Бронь:',
            value: booking.id,
            fn: () => changeCardStatus(booking.id),
        }),
        createField({
            type: 'name',
            label: 'Имя:',
            value: booking.guest_fio,
        }),
        createField({
            type: 'phone',
            label: 'Телефон:',
            value: formatPhoneWithMask(booking.guest_phone),
            link: `tel:${booking.guest_phone}`
        }),
        createField({
            type: 'hotel',
            label: 'Отель:',
            value: currentHotel?.name || 'Не найден',
        }),
        createField({
            type: 'apartment',
            label: 'Номер:',
            value: currentApartment?.apartment_name || 'Не найден',
        }),
        createField({
            type: 'period',
            label: 'Период:',
            value: `${getDataFromTable.sliceDate(startDataReserv)} - ${getDataFromTable.sliceDate(endDataReserv)}`,
        }),
    ];
};

export default fieldsData;