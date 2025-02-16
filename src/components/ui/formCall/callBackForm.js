"use client";

import React, {useMemo, useState} from "react";

import ContentForm from "./contentForm";

import {
    validateCheckBox,
    validateName,
    validatePhone,
} from "../../../utils/validate/validateFields";
import {formatPhoneWithoutMask} from "../../../utils/mask/transfomNumber";
import {handleFieldChange} from "../../../utils/handleFieldChange";

import {connection} from "../../../services/api";

import styles from "./formCall.module.css";
import stylesFontsT from "../../../styles/fonts/timesNewRoman.module.css";

const fieldsInitial = [
    {
        name: 'name',
        type: 'text',
        placeholder: 'Имя или ФИО',
        value: '',
        isEdit: false,
        validation: (value) => validateName(value, false),
        errorText: ''
    },
    {
        name: 'phone',
        type: 'tel',
        placeholder: '+7 (999)-999-99-99',
        value: '',
        isEdit: false,
        validation: (value) => validatePhone(value),
        errorText: ''
    },
    {
        name: 'checkbox',
        type: 'checkbox',
        value: false,
        isEdit: false,
        validation: (value) => validateCheckBox(value),
        errorText: ''
    }
];

/**
 * Компонент формы для запроса обратного звонка.
 * @param {string} text - Текст кнопки.
 * @param {string} numberHotel - Номер отеля.
 * @returns {JSX.Element} - Возвращает JSX элемент формы.
 */
const CallBackForm = ({text, numberHotel}) => {
    const [fields, setFields] = useState(fieldsInitial);
    const checkFields = useMemo(() => fields.some(field => field?.errorText || !field.value), [fields]);

    /**
     * Обработчик изменения значений в полях ввода.
     * @param {Event} e - Событие изменения.
     */
    const onInputChange = (e) => {
        handleFieldChange(e, fields, setFields);
    };

    /**
     * Подготавливает данные для отправки.
     * @returns {Object} - Данные формы.
     */
    const prepareFormData = () => {
        return fields.reduce((acc, field) => {
            if (field.type !== 'checkbox') {
                acc[field.name] = field.name === 'phone' ? formatPhoneWithoutMask(field.value) : field.value;
            }
            return acc;
        }, {});
    };

    /** Обработчик отправки формы. */
    const onCallBackRequest = async () => {
        if (checkFields) {
            const data = prepareFormData();

            try {
                const result = await connection.callBack(data);
                alert(result.status === 200 ? result.data.message : result.data.errorText);
            } catch (error) {
                console.debug("Error:", error);
                alert(error.response?.data?.message || "Произошла ошибка");
            }
        }
    };

    return (
        <section className={`${stylesFontsT.newRoman400} ${styles.containerMain}`}>
            <ContentForm
                fields={fields}
                onInputChange={onInputChange}
                numberHotel={numberHotel}
                onCallBackRequest={onCallBackRequest}
                checkFields={checkFields}
                textBtn={text}
            />
        </section>
    );
};

export default CallBackForm;