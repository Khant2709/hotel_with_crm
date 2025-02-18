import {axiosFormData, axiosJson} from "../axiosService";

/**
 * Универсальная функция для выполнения HTTP-запросов.
 * @param {string} method - HTTP-метод (get, post, patch, delete и т.д.).
 * @param {string} url - URL запроса.
 * @param {Object|null} data - Тело запроса (для POST, PATCH и т.д.).
 * @param {Object|null} params - Параметры запроса (для GET).
 * @param {boolean} isAdmin - Использовать ли axiosAdmin (для запросов, требующих прав администратора).
 * @param {Object} options - Дополнительные параметры для axios (например, responseType).
 */
export const makeRequest = async (method,
                                  url,
                                  data = null,
                                  params = null,
                                  isAdmin = false,
                                  options = {}) => {
    try {
        const client = isAdmin ? axiosFormData : axiosJson;
        const config = {
            method,
            url,
            params,
            ...options,
        };
        const isGetRequest = method.toLowerCase() === 'get';

        if (!isGetRequest && data !== null && data !== undefined) {
            config.data = data;
        }

        return await client(config);
    } catch (error) {
        console.debug(`Ошибка при выполнении запроса ${method} ${url}:`, error);
        return error;
    }
};