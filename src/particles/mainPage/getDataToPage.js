import {hotels, faq} from "../../services/newApi";
import allRequest from "../../utils/allRequest";
import {HOTEL_ID} from "../../config/envData";

/** Функция для получения данных для главной страницы
 * @return {object} - возвращает обьект с данными{hotelsData, bannerData}
 * */
export const getDataToPage = async () => {
    const data = {
        hotelsData: null,
        faqData: null
    };

    const request = [
        () => hotels.getMainHotelsData(),
        () => faq.getFAQ(`${HOTEL_ID}`),
    ];

    return await allRequest(data, request);
}