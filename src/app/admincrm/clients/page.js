'use client';

import React, {useCallback, useMemo, useState} from 'react';

import ComponentAuth from "../../../particles/admin/clients/contentClientsPage/authClientPage/componentAuth";
import ComponentClientsPage from "../../../particles/admin/clients/componentClientsPage";

import {useRedirectAdmin} from "../../../hooks/useRedirectAdmin";
import {useWindowWidth} from "../../../hooks/UseWidth";

import {notifyShowToast} from "../../../utils/showToast";

import {downloadClients} from "../../../particles/admin/clients/downloadClients";

import {clients} from "../../../services/api";


const ClientsPage = () => {
    useRedirectAdmin();
    const width = useWindowWidth();

    const [initialClients, setInitialClients] = useState([]);
    const [password, setPassword] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const loginClientsPage = useCallback(async () => {
        notifyShowToast('info', 'Идет проверка данных.');
        try {
            const clientsResponse = await clients.getAllClients({pass: password});

            if (clientsResponse.status < 300) {
                notifyShowToast('success', 'Успешно, сейчас отобразятся данные гостей.');
                const result = clientsResponse?.data?.data;
                setInitialClients(result);
                setIsAuthenticated(true);
            } else {
                notifyShowToast(
                    'error',
                    clientsResponse?.response?.errorText || 'Произошла ошибка, обновите страницу или попробуйте позже.'
                );
            }
        } catch (error) {
            console.error('Ошибка при входе:', error);
            notifyShowToast('error', 'Произошла ошибка при входе.');
        }
    }, [password]);

    const filteredClients = useMemo(() => {
        if (!searchQuery) return initialClients;
        return initialClients.filter(client =>
            client.fio.toLowerCase().includes(searchQuery.toLowerCase()) ||
            client.phone.includes(searchQuery) ||
            client.email.toLowerCase().includes(searchQuery.toLowerCase())
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


    if (!isAuthenticated) {
        return (
            <ComponentAuth password={password} setPassword={setPassword} loginClientsPage={loginClientsPage}/>
        );
    }

    return (
        <ComponentClientsPage clients={filteredClients}
                              width={width}
                              searchQuery={searchQuery}
                              setSearchQuery={setSearchQuery}
                              downloadExcel={downloadExcel}
        />
    );
};

export default ClientsPage;