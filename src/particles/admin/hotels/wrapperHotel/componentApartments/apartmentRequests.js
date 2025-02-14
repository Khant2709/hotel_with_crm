import {apartments} from "../../../../../services/newApi";

export const fetchApartment = async ({hotelId, isImageFetch = false, apartmentId, signal = null}) => {
    try {
        const response = isImageFetch
            ? await apartments.getApartmentImages(apartmentId)
            : await apartments.getApartmentByHotel(hotelId, signal)

        if (response.status >= 200 && response.status < 300) {
            return response?.data?.data
        } else {
            throw new Error('Произошла ошибка при получении данных')
        }
    } catch (error) {
        throw new Error(error?.response?.errorText || 'Произошла ошибка при получении данных')
    }
}

export const updateApartmentDetails = async (filterFields, apartmentId) => {
    const formData = new FormData();
    formData.append('apartmentId', apartmentId);

    filterFields.forEach(field => {
        if (field.type === 'file' && field.file) {
            formData.append(field.name, field.file);
        }
        if (field.type !== 'file') {
            formData.append(field.name, field.value);
        }
    });

    console.log(filterFields)

    return await apartments.updateApartmentData(formData);
};

export const updateApartmentPriceData = async (filterFields, apartmentId) => {
    const data = filterFields.reduce((acc, field) => {
        if (field.isEdit) {
            acc[field.name] = field.value;
        }
        return acc;
    }, {});

    if (Object.keys(data).length === 0) throw new Error('Вы не изменили ни одно поле.')


    return await apartments.updateApartmentPrice({...data, apartmentId});
};


const requestImage = {
    "create": (data) => apartments.createApartmentImage(data),
    "update": (data) => apartments.updateApartmentImage(data),
    "delete": (id) => apartments.deleteApartmentImage(id),
}

export const fetchApartmentImage = async (type, id, fields, apartmentId) => {
    console.log({type, id, fields, apartmentId})
    try {
        let data;

        if (type === 'create' || type === 'update') {
            data = new FormData();
            fields.forEach(field => {
                if (field.type === 'file') {
                    if (field.file) {
                        data.append(field.name, field.file);
                    }
                } else {
                    data.append(field.name, field.value);
                }
            });
            data.append('apartmentId', apartmentId)

            if (type === 'update') {
                data.append('id', id)
            }
        } else {
            data = id;
        }


        const response = await requestImage[type](data);

        console.log({response})
        if (response.status >= 200 && response.status < 300) {
            console.log(response?.data?.message)
            return response?.data?.message
        } else {
            throw new Error('Произошла ошибка при выполнении запроса.')
        }
    } catch (error) {
        throw new Error(error?.response?.errorText || 'Произошла ошибка при запросе.')
    }
}