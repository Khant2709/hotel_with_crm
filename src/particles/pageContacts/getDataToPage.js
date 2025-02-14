import {hotels} from "../../services/newApi";
import allRequest from "../../utils/allRequest";
import {HOTEL_ID} from "../../config/envData";

/** Функция для получения данных для страницы отелей
 * @return {object} - возвращает обьект с данными{hotelsData, bannerData}
 * */
export const getDataToPage = async () => {
    const data = {
        hotelsData: null,
        currentHotelData: null
    };

    const request = [
        () => hotels.getMainHotelsData(),
        () => hotels.getCurrentHotelData(`${HOTEL_ID}`),
    ];

    return await allRequest(data, request);
}