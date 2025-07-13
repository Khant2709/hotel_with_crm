import {validateEmail, validateName, validatePhone} from "../../../utils/validate/validateFields";
import {createField} from "../../../components/ui/fields/createField";

export const fieldsConfig = [
    createField({
        label: 'ФИО гостя:',
        typeField: 'input',
        type: 'text',
        name: 'guest_fio',
        placeholder: 'Введите фио гостя',
        validation: (name) => validateName(name),
        group: 'guest_info'
    }),
    createField({
        label: 'Телефон:',
        typeField: 'input',
        type: 'tel',
        name: 'guest_phone',
        placeholder: 'Введите телефон гостя',
        validation: (phone) => validatePhone(phone),
        group: 'guest_info'
    }),
    createField({
        label: 'Почта:',
        typeField: 'input',
        type: 'email',
        name: 'guest_email',
        placeholder: 'Введите почту гостя',
        validation: (email) => validateEmail(email),
        group: 'guest_info'
    }),
    createField({
        label: 'Комментарий:',
        typeField: 'textarea',
        name: 'comments',
        placeholder: 'Комментарий',
        group: 'guest_info'
    }),

    createField({
        label: 'Отель:',
        typeField: 'select',
        name: 'hotel_id',
        group: 'booking_info'
    }),
    createField({
        label: 'Апартаменты:',
        typeField: 'select',
        name: 'apartment_id',
        group: 'booking_info'
    }),
    createField({
        label: 'Заезд:',
        typeField: 'input',
        type: 'date',
        name: 'start_date_local',
        group: 'booking_info'
    }),
    createField({
        label: 'Выезд:',
        typeField: 'input',
        type: 'date',
        name: 'end_date_local',
        group: 'booking_info'
    }),
    createField({
        label: 'Кол. взрослых:',
        typeField: 'input',
        type: 'number',
        name: 'count_adults',
        group: 'booking_info'
    }),
    createField({
        label: 'Кол. детей:',
        typeField: 'input',
        type: 'number',
        name: 'count_children',
        group: 'booking_info'
    }),

    createField({
        label: 'Итоговая сумма:',
        typeField: 'input',
        type: 'number',
        name: 'total_price',
        group: 'admin_info'
    }),
    createField({
        label: 'Статус:',
        // typeField: 'select',
        name: 'status',
        group: 'admin_info'
    }),
    createField({
        label: 'Предопллата:',
        typeField: 'input',
        type: 'number',
        name: 'prepayment',
        group: 'admin_info'
    }),
    createField({
        label: 'Администратор:',
        type: 'text',
        name: 'confirmedBy',
        group: 'admin_info'
    }),
    createField({
        label: 'Дата изменений:',
        type: 'date',
        name: 'reservationTimestamp',
        group: 'admin_info'
    }),
    createField({
        label: 'Оповестить гостя:',
        typeField: 'select',
        name: 'sendToGuest',
        value: "1",
        group: 'admin_info'
    }),
];