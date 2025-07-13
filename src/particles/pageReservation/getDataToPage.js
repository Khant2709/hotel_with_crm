import {apartmentsAPI, bookingAPI} from "../../services/api";
import {singleRequest} from "../../services/utils/requestUtils";
import {TIME_CASH} from "../../config/envData";

/** Функция для получения данных для страницы отелей (с фильтрацией)
 * @param {object} searchParams - Опциональний параметр, если есть получаем обьект {searchStartReservation, searchEndReservation, countPeopleReservation}
 * @return {object} - возвращает обьект с данными{hotelsData, bannerData}
 * */
export const getApartmentsData = async (searchParams) => {
    const hasSearchParams = searchParams && Object.values(searchParams).every(param => Boolean(param));
    let result;
    try {
        if (hasSearchParams) {
            const params = {
                startReservation: searchParams?.startDateReservation,
                endReservation: searchParams?.endDateReservation,
                countPeopleReservation: searchParams?.countPeopleReservation,
            }
            result = await singleRequest(() => bookingAPI.getFilterBooking({...params, cacheAge: TIME_CASH["5min"]}))
        } else {
            result = await singleRequest(() => apartmentsAPI.getAllApartments(TIME_CASH["60min"]));
        }
        return {apartmentsData: result.data.data, status: result.status}
    } catch (err) {
        console.debug(err);
        throw new Error(err)
    }
};