function createFieldFilter({label, typeField, name, type = '', placeholder = '', optionalType = ''}) {
    return {label, typeField, name, type, placeholder, optionalType};
}

export const fieldsFilter = [
    createFieldFilter({
        label: 'Номер брони:',
        typeField: 'input',
        name: 'id',
        type: 'text',
        placeholder: 'Введите номер брони'
    }),
    createFieldFilter({
        label: 'Имя гостя:',
        typeField: 'input',
        name: 'guestName',
        type: 'text',
        placeholder: 'Введите имя гостя'
    }),
    createFieldFilter({label: 'Дата заезда:', typeField: 'input', name: 'dateBooking', type: 'date'}),
    createFieldFilter({label: 'Отель:', typeField: 'select', name: 'hotelId', optionalType: 'hotels'}),
    createFieldFilter({label: 'Номер:', typeField: 'select', name: 'apartmentId', optionalType: 'apartments'}),
];
