'use client'

import React, {useEffect, useState} from 'react';

import ContentCurrentClient from "./content";
import ErrorComponent from "../../../components/ui/admin/errorComponent/errorComponent";

import {useRedirectAdmin} from "../../../hooks/useRedirectAdmin";

import {singleRequest} from "../../../services/utils/requestUtils";
import {clientsAPI} from "../../../services/api";
import PreloaderAdminComponent from "../../../components/ui/preloader/preloaderAdminComponent";


const fetchData = async (ph) => {
    const response = await singleRequest(() => clientsAPI.getCurrentClient(ph));
    if (response?.error) {
        return null
    } else {
        const {client, history} = response.data.data;
        return {client: client[0], history};
    }
}

const WrapperCurrentClient = ({ph, hotels, apartments}) => {
    useRedirectAdmin();
    const [isLoading, setIsLoading] = useState(true);
    const [clientData, setClientData] = useState(null);

    useEffect(() => {
        fetchData(ph)
            .then(res => {
                setClientData(res)
            })
            .finally(() => setIsLoading(false))
    }, [])

    if (isLoading) return <PreloaderAdminComponent/>;

    if (clientData === null) {
        return <ErrorComponent title={'Данные гостя'} text={'Произошла ошибка в получении данных гостя'}/>
    }

    return (
        <ContentCurrentClient client={clientData.client}
                              history={clientData.history}
                              hotels={hotels}
                              apartments={apartments}
        />
    );
};

export default WrapperCurrentClient;