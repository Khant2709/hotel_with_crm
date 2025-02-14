/**
 * Очищает номер телефона от всех символов, кроме цифр.
 * @param {string} phone - Входная строка с номером телефона.
 * @returns {string} - Очищенный номер телефона, содержащий только цифры.
 */
export const cleanPhoneNumber = (phone) => phone.replace(/\D/g, '');

/**
 * Форматирует номер телефона в вид +7 (XXX) XXX-XX-XX.
 * @param {string} phone - Входная строка с номером телефона.
 * @returns {string} - Номер телефона в формате +7 (XXX) XXX-XX-XX.
 */
export const formatPhoneWithMask = (phone) => {
    const cleaned = cleanPhoneNumber(phone);
    if (cleaned.length <= 1) return '+7'; // Если номер пустой или только код страны

    return `+7 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7, 9)}-${cleaned.slice(9, 11)}`;
};

/**
 * Преобразует номер телефона в формат 7989XXXXXXX (только цифры, начиная с 7).
 * @param {string} phone - Входная строка с номером телефона.
 * @returns {string} - Номер телефона в формате 7989XXXXXXX.
 */
export const formatPhoneWithoutMask = (phone) => {
    const cleaned = cleanPhoneNumber(phone);
    return `7${cleaned.slice(1)}`;
};

/**
 * Универсальная функция для форматирования номера телефона с динамическим определением формата.
 * Если номер некорректный, возвращает пустую строку.
 * @param {string} inputValue - Входная строка с номером телефона.
 * @returns {string} - Форматированный номер телефона (пример: +7 (XXX) XXX-XX-XX) или пустая строка при ошибке.
 */
export const formatPhoneNumber = (inputValue) => {
    const cleaned = inputValue.replace(/[^\d+]/g, '');
    const match = cleaned.match(/^(\+7)?(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})$/);

    if (!match) return ''; // Возврат пустой строки при некорректном формате

    const [, prefix = '+7', part1, part2, part3, part4] = match;

    return [
        prefix,
        part1 ? ` (${part1})` : '',
        part2 ? ` ${part2}` : '',
        part3 ? `-${part3}` : '',
        part4 ? `-${part4}` : '',
    ].join('');
};