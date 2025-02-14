import {makeRequest} from "./makeRequest";
import {HOTEL_ID} from "../../config/envData";

/** Получает данные FAQ для отеля.
 @param {string|null} id - ID отеля (если не указан, используется HOTEL_ID).
 @param {object} signal - ID отеля (если не указан, используется HOTEL_ID).
 */
export const getFAQ = async (id, signal) =>
    makeRequest('get', `/faq/${id || HOTEL_ID}`, null, null, false, signal);


/** Создает новый FAQ.
 @param {Object} data - Данные для создания FAQ.
 */
export const createCurrentFAQ = async (data) => makeRequest('post', '/faq', data);

/** Обновляет данные FAQ.
 @param {string} id - ID FAQ.
 @param {Object} data - Новые данные FAQ.
 */
export const updateCurrentFAQ = async (id, data) => makeRequest('patch', `/faq/${id}`, data);

/** Удаляет FAQ.
 @param {string} id - ID FAQ.
 */
export const deleteCurrentFAQ = async (id) => makeRequest('delete', `/faq/${id}`);