function createFieldFilter({label, typeField, name, type = '', placeholder = '', optionalType = ''}) {
    return {label, typeField, name, type, placeholder, optionalType};
}

export const fieldsFilter = [
    createFieldFilter({
        label: 'Номер брони:',
        typeField: 'input',
        name: 'id',
        type: 'number',
        placeholder: 'Введите номер брони'
    }),
    createFieldFilter({
        label: 'ФИО гостя:',
        typeField: 'input',
        name: 'guestName',
        type: 'text',
        placeholder: 'Введите что либо..'
    }),
    createFieldFilter({label: 'Дата:', typeField: 'input', name: 'dateBooking', type: 'date'}),
    createFieldFilter({label: 'Отель:', typeField: 'select', name: 'hotelId', optionalType: 'hotels'}),
    createFieldFilter({label: 'Номер:', typeField: 'select', name: 'apartmentId', optionalType: 'apartments'}),
];
