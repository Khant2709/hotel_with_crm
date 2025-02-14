import {createField} from "../../ui/fields/createField";

import {
    validateCheckBox,
    validateCommit,
    validateEmail,
    validateName,
    validatePhone
} from "../../../utils/validate/validateFields";
import {transformDateFormat} from "../../../utils/getDay";

export const fieldsDefault = [
    createField({
        typeField: 'input',
        type: 'text',
        name: 'guest_fio',
        placeholder: 'Введите ФИО',
        value: '',
        validation: (value) => validateName(value),
    }),
    createField({
        typeField: 'input',
        type: 'tel',
        name: 'guest_phone',
        placeholder: 'Номер телефона',
        value: '',
        validation: (value) => validatePhone(value),
    }),
    createField({
        typeField: 'input',
        type: 'email',
        name: 'guest_email',
        placeholder: 'Почта',
        value: '',
        validation: (value) => validateEmail(value),
    }),
    createField({
        typeField: 'textarea',
        type: 'textarea',
        name: 'comments',
        placeholder: 'Вы можете оставить комментарий (не обязательно)',
        value: '',
        validation: (value) => validateCommit(value),
    }),
    createField({
        typeField: 'checkbox',
        type: 'checkbox',
        name: 'checkbox',
        value: '',
        validation: (value) => validateCheckBox(value),
    }),
];

export const reservationFields = (data) => [
    {
        label: "Дата заезда:",
        text: transformDateFormat(data?.startData) || "ошибка",
        valid: 'required'
    },
    {
        label: "Дата выезда:",
        text: transformDateFormat(data?.endData) || "ошибка",
        valid: 'required'
    },
    {
        label: "Кол-во взрослых:",
        text: Number(data?.countAdults) || 'ошибка',
        valid: 'required'
    },
    {
        label: "Кол-во детей:",
        text: Number(data?.countChildren) || 0,
        valid: 'optional'
    },
    {
        label: "Цена за ночь:",
        text: data?.priceOneNight || 'ошибка',
        valid: 'required'
    },
    {
        label: "Итоговая сумма:",
        text: data?.finishPrice || 'ошибка',
        valid: 'required'
    },
];