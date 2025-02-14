import {hotels} from "../../services/newApi";
import allRequest from "../../utils/allRequest";

/** Функция для получения данных для страницы отелей
 * @return {object} - возвращает обьект с данными{hotelsData, bannerData}
 * */
export const getDataToPage = async () => {
    const data = {
        hotelsData: null,
        bannerData: null,
    };

    const request = [
        () => hotels.getMainHotelsData(),
        () => hotels.getBannerHotelsPage()
    ];

    return await allRequest(data, request);
}