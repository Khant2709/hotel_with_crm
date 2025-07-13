import {makeRequest} from "./makeRequest";
import {HOTEL_ID} from "../../config/envData";


/** Получает данные всех отелей. */
export const getHotelsData = async (cacheAge) => makeRequest(
    'get',
    '/hotels',
    null,
    null,
    false,
    cacheAge = null
);

/** Получает данные всех отелей. */
export const getMainHotelsData = async (cacheAge) => makeRequest(
    'get',
    '/hotels/main',
    null,
    null,
    false,
    cacheAge = null
);

/** Получает данные текущего отеля. */
export const getCurrentHotelData = async (id, signal = null, cacheAge = null) => makeRequest(
    'get',
    `/hotels/${id || HOTEL_ID}`,
    null,
    null,
    false,
    cacheAge,
    signal
);

/** Получает контакты текущего отеля. */
export const getContactsCurrentHotel = async () => makeRequest('get', `/hotels/contacts/${HOTEL_ID}`);

/** Получает изображения текущего отеля. */
export const getImagesCurrentHotel = async (id) => makeRequest('get', `/images/hotel/${id}`);

export const getBannerHotelsPage = async (cacheAge) => makeRequest(
    'get',
    `/images/banner2/${HOTEL_ID}`,
    null,
    null,
    false,
    cacheAge = null
);

/** Обновляет данные отеля. */
export const updateHotelData = async (data) => makeRequest('patch', '/hotels/update', data);

/** Обновляет контактные данные отеля. */
export const updateContactsHotel = async (data) => makeRequest('patch', '/hotels/updatecontact', data);

/** Обновляет изображения отеля.
 @param {Object} data - Новое изображение.
 */
export const updateImageHotel = async (data) => makeRequest('patch', '/images/image', data, null, true);
