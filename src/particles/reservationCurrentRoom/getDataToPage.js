import {apartments, booking} from "../../services/newApi";
import allRequest from "../../utils/allRequest";

export const getDataToPage = async (id, requestType) => {
    let data = {};
    let requests = [];

    switch (requestType) {
        case 'meta':
            data.currentApartmentData = null;
            requests.push(() => apartments.getCurrentApartment(id));
            break;
        case 'booking':
            data.bookingsData = null;
            requests.push(() => booking.getAllBookings());
            break;
        case 'initial':
            data = {
                apartmentsData: null,
                currentApartmentData: null,
                bookingsData: null,
            };
            requests.push(
                () => apartments.getAllApartments(),
                () => apartments.getCurrentApartment(id),
                () => booking.getAllBookings(),
            );
            break;
        default:
            throw new Error(`Unknown request type: ${requestType}`);
    }

    return await allRequest(data, requests);
}