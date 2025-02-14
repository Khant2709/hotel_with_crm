/**
 * Универсальная функция для обработки изменений в полях формы.
 * @param {Event} e - Событие изменения.
 * @param {Array} fields - Массив полей формы.
 * @param {Function} setFields - Функция для обновления состояния полей.
 */
export const handleFieldChange = (e, fields, setFields) => {
    const {name, value, type, checked} = e.target;

    const currentName = type === 'checkbox' ? 'checkbox' : name;
    const currentValue = type === 'checkbox' ? checked : value;

    if (!currentName) {
        console.error('Поле name не передано');
        return;
    }

    // Проверяем, существует ли поле с указанным именем
    const fieldExists = fields.some((field) => field.name === currentName);
    if (!fieldExists) {
        console.error(`Field with name "${currentName}" does not exist`);
        return;
    }


    // Обновляем состояние поля
    updateFieldState(currentName, currentValue, fields, setFields, (field, value) => {
        const {message} = field.validation(value);
        return {...field, value, isEdit: true, errorText: message};
    });
};

/**
 * Обновляет состояние поля.
 * @param {string} name - Имя поля.
 * @param {any} newValue - Новое значение поля.
 * @param {Array} fields - Массив полей.
 * @param {Function} setFields - Функция для обновления состояния.
 * @param {Function} updateLogic - Логика обновления поля.
 */
const updateFieldState = (name, newValue, fields, setFields, updateLogic) => {
    const updatedFields = fields.map((field) =>
        field.name === name ? updateLogic(field, newValue) : field
    );
    setFields(updatedFields);
};



// Определяем новое значение в зависимости от типа поля
// let newValue;
// switch (type) {
//     case 'checkbox':
//         newValue = checked; // Для чекбокса используем `checked`
//         break;
//     case 'select-one': // Для выпадающего списка
//         newValue = value;
//         break;
//     default:
//         newValue = value; // Для текстовых полей, даты и других
// }