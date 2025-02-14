import {makeRequest} from "./makeRequest";

/** Создает новое бронирование.
 @param {Object} data - Данные для создания бронирования.
 */
export const createReservation = async (data) => makeRequest('post', '/reservation/create', data);

/** Подтверждает бронирование.
 @param {string} id - ID бронирования.
 @param {Object} data - Данные для подтверждения (например, подтвержденный статус).
 */
export const confirmReservation = async (id, data) => makeRequest('patch', `/reservation/confirmation/${id}`, data);

/** Завершает бронирование.
 @param {string} id - ID бронирования.
 @param {string} confirmedBy - Идентификатор пользователя, подтверждающего завершение.
 */
export const conclusionReservation = async (id, confirmedBy) => {
    const queryParams = new URLSearchParams({confirmedBy}).toString();
    return makeRequest('delete', `/reservation/conclusion/${id}?${queryParams}`);
};

/** Отклоняет бронирование.
 @param {string} id - ID бронирования.
 @param {Object} data - Данные для отклонения (например, причина).
 */
export const refusalReservation = async (id, data) => makeRequest('post', `/reservation/refusal/${id}`, data);

/** Удаляет бронирование.
 @param {string} id - ID бронирования.
 @param {string} confirmedBy - Идентификатор пользователя, подтверждающего удаление.
 */
export const deleteReservation = async (id, confirmedBy) => {
    const queryParams = new URLSearchParams({confirmedBy}).toString();
    return makeRequest('delete', `/reservation/delete/${id}?${queryParams}`);
};