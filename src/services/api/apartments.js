import {makeRequest} from "./makeRequest";
import {HOTEL_ID} from "../../config/envData";

/** Получает данные всех номеров. */
export const getAllApartments = async () => makeRequest('get', '/apartments');

/** Получает данные номеров по ID отеля. Если ID отеля не указан, используется HOTEL_ID.
 @param {string|null} hotelId - ID отеля.
 @param {object} signal - сигнал для обрыва запроса.
 */
export const getApartmentByHotel = async (hotelId, signal) =>
    makeRequest('get', `/apartments/hotel/${hotelId || HOTEL_ID}`, null, null, false, signal);

/** Получает данные конкретного номера.
 @param {string} id - ID номера.
 */
export const getCurrentApartment = async (id) => makeRequest('get', `/apartments/${id}`);

/** Получает изображения номера.
 @param {string} id - ID номера.
 */
export const getApartmentImages = async (id) => makeRequest('get', `/apartments/images/${id}`);

/** Создает изображение для номера (запрос FORM DATA).
 @param {Object} data - Данные изображения.
 */
export const createApartmentImage = async (data) => makeRequest('post', '/apartments/image', data, null, true);

/** Обновляет данные номера (запрос FORM DATA).
 @param {Object} data - Новые данные номера.
 */
export const updateApartmentData = async (data) => makeRequest('patch', '/apartments/data', data, null, true);

/** Обновляет цену номера.
 @param {Object} data - Новые данные о цене.
 */
export const updateApartmentPrice = async (data) => makeRequest('patch', '/apartments/price', data);

/** Обновляет изображение номера (запрос FORM DATA).
 @param {Object} data - Новые данные изображения.
 */
export const updateApartmentImage = async (data) => makeRequest('patch', '/apartments/image', data, null, true);

/** Удаляет изображение номера.
 @param {string} id - ID изображения.
 */
export const deleteApartmentImage = async (id) => makeRequest('delete', `/apartments/image/${id}`);