import {makeRequest} from "./makeRequest";

/** Получает данные всех клиентов.
 @param {Object} data - Данные для фильтрации или поиска клиентов.
 */
export const getAllClients = async (data) => makeRequest('post', '/clients', data);

/** Скачивает файл с данными клиентов.
 @returns {Promise<Blob>} Файл с данными клиентов.
 */
export const clientsDownload = async () => makeRequest('get', '/clients/download', null, null, false, {responseType: 'blob'});