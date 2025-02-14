import {hotels, apartments, booking} from "../../services/newApi";
import allRequest from "../../utils/allRequest";

/** Функция (начальная) для получения данных для страницы отелей
 * @return {object} - возвращает обьект с данными{hotelsData, bannerData}
 * */
export const getInitialHotelData = async () => {
    const data = {
        hotelsData: null,
        apartmentsData: null
    };

    const request = [
        () => hotels.getMainHotelsData(),
        () => apartments.getAllApartments(),
    ];

    return await allRequest(data, request);
};

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
            result = await booking.getFilterBooking({...params})
        } else {
            result = await apartments.getAllApartments();
        }
        return {apartmentsData: result.data.data, status: result.status}
    } catch (err) {
        console.debug(err);
        throw new Error(err)
    }
};