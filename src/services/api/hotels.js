import {makeRequest} from "./makeRequest";
import {HOTEL_ID} from "../../config/envData";

/** Получает данные всех отелей. */
export const getHotelsData = async () => makeRequest('get', '/hotels');

/** Получает данные всех отелей. */
export const getMainHotelsData = async () => makeRequest('get', '/hotels/main');

/** Получает данные текущего отеля.
 @param {string} id - ID отеля.
 @param {object} signal - сигнал для обрыва запроса.
 */
export const getCurrentHotelData = async (id, signal) =>
    makeRequest('get', `/hotels/${id}`, null, null, false, signal);

/** Получает контакты текущего отеля. */
export const getContactsCurrentHotel = async () => makeRequest('get', `/hotels/contacts/${HOTEL_ID}`);

/** Получает изображения текущего отеля. */
export const getImagesCurrentHotel = async (id) => makeRequest('get', `/images/hotel/${id}`);

export const getBannerHotelsPage = async () => makeRequest('get', `/images/banner2/${HOTEL_ID}`)

/** Обновляет данные отеля.
 @param {Object} data - Новые данные отеля.
 */
export const updateHotelData = async (data) => makeRequest('patch', '/hotels/update', data);

/** Обновляет контактные данные отеля.
 @param {Object} data - Новые контактные данные.
 */
export const updateContactsHotel = async (data) => makeRequest('patch', '/hotels/updatecontact', data);

/** Обновляет изображения отеля.
 @param {Object} data - Новое изображение.
 */
// СОЗДАТЬ