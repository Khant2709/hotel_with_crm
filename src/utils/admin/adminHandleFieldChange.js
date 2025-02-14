/**
 * Обрабатывает изменение значения поля ввода.
 * @param {Event} e - Событие изменения поля.
 * @param {string} type - Тип поля ('file' или другой).
 * @param {Array} fields - Массив полей.
 * @param {Function} setFields - Функция для обновления состояния полей.
 */
export const handleFieldsChange = (e, type = 'text', fields, setFields) => {
    const {name, value, files} = e.target;

    // Проверяем, что имя поля существует
    if (!name) {
        console.error('Field name is missing');
        return;
    }

    // Обработка файлов
    if (type === 'file') {
        const file = files?.[0];
        if (!file) return; // Если файл не выбран, выходим

        updateFieldState(name, file, fields, setFields, (field, file) => {
            const fileUrl = URL.createObjectURL(file);
            const {errorText} = field.validation(file);
            return {...field, value: fileUrl, file, isEdit: true, errorText};
        });
        return;
    }

    // Обработка текстовых полей
    updateFieldState(name, value, fields, setFields, (field, value) => {
        let error;
        if (field?.validation) {
            const {errorText} = field.validation(value);
            error = errorText
        }
        return {...field, value, isEdit: true, errorText: error};
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