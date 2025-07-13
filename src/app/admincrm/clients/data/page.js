'use client';

import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {useRouter} from "next/navigation";

import ComponentClientsPage from "../../../../particles/admin/clients/componentClientsPage";
import ErrorComponent from "../../../../components/ui/admin/errorComponent/errorComponent";

import {useRedirectAdmin} from "../../../../hooks/useRedirectAdmin";
import {useWindowWidth} from "../../../../hooks/UseWidth";

import {notifyShowToast} from "../../../../utils/showToast";

import {downloadClients} from "../../../../particles/admin/clients/downloadClients";

import {clients} from "../../../../services/api";
import {singleRequest} from "../../../../services/utils/requestUtils";
import {usePreloaderAdmin} from "../../../../hooks/usePreloaderAdmin";


const ClientsPage = () => {
    useRedirectAdmin();
    const {setToggleStatePreloader} = usePreloaderAdmin();
    const width = useWindowWidth();
    const router = useRouter();

    const [initialClients, setInitialClients] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [errorResponse, setErrorResponse] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await singleRequest(() => clients.getAllClients());
            if (response.error) {
                setErrorResponse(response.error);
                return;
            }
            const clientsResponse = response.data?.data;
            if (!clientsResponse?.length) {
                setErrorResponse('Произошла ошибка при получении данных клиентов.');
                return;
            }

            setInitialClients(clientsResponse);
        };

        fetchData();
    }, []);

    const filteredClients = useMemo(() => {
        if (!searchQuery) return initialClients;
        return initialClients.filter(client => {
                const checkFIO = client?.fio && client.fio.toLowerCase()
                    .includes(searchQuery.toLowerCase());
                const checkPhone = client?.phone && client.phone.includes(searchQuery);
                const checkEmail = client?.email && client.email.toLowerCase()
                    .includes(searchQuery.toLowerCase());

                return checkFIO || checkPhone || checkEmail;
            }
        );
    }, [searchQuery, initialClients]);

    /** Функция для скачиватия всех клиентов exel */
    const downloadExcel = useCallback(async () => {
        notifyShowToast('info', 'Запрос отправлен.');

        try {
            const res = await downloadClients();
            notifyShowToast('success', res || 'Файл успешно скачан.');
        } catch (error) {
            notifyShowToast('error', error.message || 'Произошла ошибка, попробуйте снова.');
        }
    }, []);

    const openClient = async (ph) => {
        setToggleStatePreloader(true);
        router.push(`/admincrm/clients/${ph}`);
    }

    if (errorResponse) {
        return <ErrorComponent title={'Гости'} text={errorResponse}/>
    }

    return (
        <ComponentClientsPage
            clients={filteredClients}
            width={width}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            downloadExcel={downloadExcel}
            openClient={openClient}
        />
    );
};

export default ClientsPage;