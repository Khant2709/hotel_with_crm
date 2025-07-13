import {makeRequest} from "./makeRequest";
import {HOTEL_ID} from "../../config/envData";


/** Получает данные FAQ для отеля. */
export const getFAQ = async (id, signal = null, cacheAge = null) =>
    makeRequest('get', `/faq/${id || HOTEL_ID}`, null, null, false, cacheAge, signal);


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