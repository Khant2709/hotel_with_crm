'use client'

import React, {useEffect, useState} from 'react';

import {getDataToPage, TYPES_REQUEST} from "../../../../particles/admin/hotels/getDataToPage";
import WrapperHotel from "../../../../particles/admin/hotels/wrapperHotel/wrapperHotel";

import {useRedirectAdmin} from "../../../../hooks/useRedirectAdmin";

import {notifyShowToast} from "../../../../utils/showToast";


const HotelsAdminPage = ({params: {id}}) => {
    useRedirectAdmin();
    const [hotel, setHotel] = useState(null);

    function updateData(controller) {
        getDataToPage(TYPES_REQUEST.HOTEL, id, controller ? {signal: controller.signal} : null)
            .then(res => {
                setHotel(res.data.hotel)
            })
            .catch(error => {
                notifyShowToast(
                    'error',
                    error?.response?.errorText || 'Произошла ошибка при получении отеля, обновите страницу или попробуйте по позже.'
                );
            })
    }

    useEffect(() => {
        const controller = new AbortController();
        updateData(controller)
        return () => controller.abort();
    }, [id]);

    return (
        <WrapperHotel hotel={hotel} updateHotelData={updateData}/>
    );
};

export default HotelsAdminPage;