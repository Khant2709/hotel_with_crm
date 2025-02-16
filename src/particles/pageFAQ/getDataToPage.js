import {faq} from '../../services/api';
import {HOTEL_ID} from "../../config/envData";
import allRequest from "../../utils/allRequest";

/** Функция для получения данных для страницы отелей
 * @return {object} - возвращает обьект с данными{faqData}
 * */
export const getDataToPage = async () => {
    const data = {
        faqData: null,
    };

    const request = [
        () => faq.getFAQ(`${HOTEL_ID}`)
    ];

    return await allRequest(data, request);
}