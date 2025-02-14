import {hotels} from "../services/newApi";
import {DEFAULT_CONTACTS} from "../config/envData";

export const getContactsHotel = async (setContactsData) => {
    const {data, status} = await hotels.getContactsCurrentHotel();
    if (status === 200 && data?.data) {
        setContactsData(data.data);
    } else {
        console.debug('HEADER: Произошла ошибка при получении данных контактов.')
        const {address, phone, phoneTG, email} = DEFAULT_CONTACTS;
        setContactsData({address, email, phone, phone_tg: phoneTG})
    }
};