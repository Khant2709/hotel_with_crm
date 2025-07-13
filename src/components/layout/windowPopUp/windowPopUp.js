"use client";

import React, {useCallback, useMemo, useState} from "react";

import {ReservationWindow} from "./reservationWindow";

import {formatPhoneWithoutMask} from "../../../utils/mask/transfomNumber";
import {handleFieldChange} from "../../../utils/handleFieldChange";
import {notifyShowToast} from "../../../utils/showToast";

import {reservation} from '../../../services/api';

import {usePopUpWindow} from "../../../hooks/useWindowPopUp";

import {fieldsDefault, reservationFields} from "./fields";

/** Функция для подготовки данных для отправки
 * @returns {object} - обьект с данными о брони и госте.
 * */
const prepareReservationData = ({reservationData, fields}) => {
    const {
        idHotel, idApartment, apartment_number, countAdults, countChildren, startData, endData, finishPrice,
    } = reservationData;

    const data = {
        hotel_id: idHotel,
        apartment_id: idApartment,
        apartment_number: apartment_number,
        count_adults: +countAdults,
        count_children: +countChildren,
        start_date: startData,
        end_date: endData,
        total_price: finishPrice,
        status: "WAITING",
    };

    return fields.reduce((acc, field) => {
        if (field.name === 'checkbox') return acc;
        let value;

        switch (field.name) {
            case 'guest_phone':
                value = formatPhoneWithoutMask(field.value);
                break;
            case 'comments':
                value = field?.value || 'нет';
                break;
            default:
                value = field.value;
                break;
        }

        acc[field.name] = value;
        return acc;
    }, data);
}

/** Компонент всплывающего окна для завершения брони.
 * @returns {JSX.Element} - Компонент всплывающего окна для завершения брони.
 */
const WindowPopUp = () => {
    const {showWindow, togglePopUpWindow, reservationData} = usePopUpWindow();

    const [fields, setFields] = useState(fieldsDefault);
    const [isDisable, setIsDisable] = useState(false);
    const fieldCheckbox = fields.find(field => field.type === 'checkbox');

    /** Проверка на существование данных брони */
    const checkDataReservation = useMemo(() => Object.keys(reservationData).every(el => {
        if (el !== 'countChildren') {
            return !!reservationData[el]
        } else {
            return true;
        }
    }), [reservationData]);

    /** Проверка пользовательских полей */
    const checkFields = useMemo(() => fields.every(field => {
        if (field.isEdit) {
            return !field.errorText
        } else {
            return field.name === 'comments'
        }
    }), [fields]);

    /** обработчик полей */
    const handleFieldsChange = useCallback((e) => {
        handleFieldChange(e, fields, setFields);
    }, [setFields, fields])

    /** Данные брони для полей */
    const dataReservationFields = checkDataReservation && reservationFields(reservationData);

    /** Функция для отправки запроса для создания брони */
    const sendReservation = async () => {
        if (checkDataReservation && checkFields) {
            notifyShowToast('info', 'Заявка отправлена, дождитесь ответа, это займет не более 30сек.')
            setIsDisable(true);
            const finishData = prepareReservationData({reservationData, fields});

            const result = await reservation.createReservation(finishData);

            if (result.status === 200) {
                notifyShowToast('success',
                    result?.data?.message || 'Благодарим за бронирование, прошло успешно. Вам должно придти письмо на указанную почту (в течении часа), если письмо не пришло напишите или позваните нам.');
                setIsDisable(false)
                togglePopUpWindow()
            } else {
                notifyShowToast('error',
                    result?.response?.data?.errorText || 'Произшла ошибка при бронировании попробуйте пожалуйста заного.');
                setIsDisable(false)
            }
        }
    };

    if (!showWindow) {
        return null;
    }

    if (!checkDataReservation) {
        togglePopUpWindow();
        notifyShowToast('error', 'Произшла ошибка в заполнении данных брони, перезагрузите страницу и попробуйте заного пожалуйста.');
    }

    return (
        <ReservationWindow
            fields={fields}
            fieldCheckbox={fieldCheckbox}
            handleFieldsChange={handleFieldsChange}
            hotelName={reservationData?.nameHotel || 'Ошибка'}
            apartmentName={reservationData?.nameApartment || 'Ошибка'}
            disableBtn={!checkDataReservation || !checkFields || isDisable}
            togglePopUpWindow={togglePopUpWindow}
            dataReservationFields={dataReservationFields}
            sendReservation={sendReservation}
        />
    );
};

export default WindowPopUp;
