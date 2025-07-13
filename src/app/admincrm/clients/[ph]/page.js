import React from 'react';

import WrapperCurrentClient from "../../../../particles/admin/currentClient/wrapper";
import ErrorComponent from "../../../../components/ui/admin/errorComponent/errorComponent";

import {batchRequest} from "../../../../services/utils/requestUtils";
import {hotelsAPI, apartmentsAPI} from '../../../../services/api';

import {TIME_CASH} from "../../../../config/envData";

const fetchData = async () => {
    const data = {
        hotelsData: null,
        apartmentsData: null
    };

    const request = [
        () => hotelsAPI.getMainHotelsData(TIME_CASH["60min"]),
        () => apartmentsAPI.getAllApartments(TIME_CASH["60min"]),
    ];

    return await batchRequest(data, request);
}

const CurrentClientPage = async ({params: {ph}}) => {
    const {hotelsData, apartmentsData} = await fetchData();

    if (hotelsData?.error || apartmentsData?.error) {
        return <ErrorComponent title={'Данные гостя'}
                               text={hotelsData?.error || apartmentsData?.error || 'Не известная ошибка'}
        />
    }

    /** Преобразуем данные отелей и номеров в обьекты чтобы было проще обращаться*/
    const hotels = hotelsData.data.data;
    const transformHotels = hotels.reduce((acc, hotel) => {
        acc[hotel.id] = hotel.name;
        return acc;
    }, {});

    const apartments = apartmentsData.data.data;
    const transformApartments = apartments.reduce((acc, apartment) => {
        acc[apartment.id] = apartment.apartment_name;
        return acc;
    }, {});

    return (
        <WrapperCurrentClient ph={ph} hotels={transformHotels} apartments={transformApartments}/>
    );
};

export default CurrentClientPage;