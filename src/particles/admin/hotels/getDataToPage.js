import {hotels, faq} from "../../../services/api";

export const TYPES_REQUEST = {
    HOTEL: "hotelData",
    IMAGES: "hotelImages",
    FAQ: "faqData",
};

const request = {
    "hotelData": (id, signal) => hotels.getCurrentHotelData(id, signal),
    "faqData": (id, signal) => faq.getFAQ(id, signal),
    "hotelImages": (id) => hotels.getImagesCurrentHotel(id)
};

export const getDataToPage = async (type, id, signal = null) => {
    try {
        const resultRequest = await request[type](id, signal)

        if (resultRequest.status === 200 && resultRequest?.data?.data?.length !== 0) {
            return {data: resultRequest.data.data}
        } else {
            throw new Error('Произошла ошибка в получении данных.')
        }
    } catch (err) {
        return {error: err};
    }
}