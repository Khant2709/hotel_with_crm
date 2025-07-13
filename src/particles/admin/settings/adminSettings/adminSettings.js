import React, {useEffect, useState, useCallback} from 'react';

import AdminsContainer from "./adminsContainer/adminsContainer";
import ModeContainer from "./modeContainer/modeContainer";
import TitleAdmin from "../../../../components/ui/admin/titleAdmin/titleAdmin";
import {AdminButton} from "../../../../components/ui/admin/buttons/buttons";
import ErrorComponent from "../../../../components/ui/admin/errorComponent/errorComponent";

import {singleRequest} from "../../../../services/utils/requestUtils";
import {adminAPI} from '../../../../services/api';

import {notifyShowToast} from "../../../../utils/showToast";
import PreloaderAdminComponent from "../../../../components/ui/preloader/preloaderAdminComponent";


const MODE_TYPE = {
    CREATE: 'create',
    EDIT: 'edit'
};


const AdminSettings = ({setActiveType}) => {
    const [admins, setAdmins] = useState([]);
    const [currentAdmin, setCurrentAdmin] = useState(null);
    const [mode, setMode] = useState('');
    const [errorResponse, setErrorResponse] = useState(null);
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        const fetchAdmins = async () => {
            setIsLoading(true)
            const response = await singleRequest(() => adminAPI.getAdmins());
            if (response.error || !response.data?.data?.length) {
                setErrorResponse(response.error || 'Ошибка получения данных администраторов');
                return;
            }
            setAdmins(response.data.data);
        };

        fetchAdmins().finally(() => setIsLoading(false));
    }, []);

    const editAdmin = useCallback((id) => {
        setCurrentAdmin(admins.find(admin => admin.id === id));
        setMode(MODE_TYPE.EDIT);
    }, [admins]);

    const createAdmin = useCallback(async (data) => {
        notifyShowToast('info', 'Запрос отправлен.');
        const result = await singleRequest(() => adminAPI.createAdmin(data));
        handleApiResponse(result, 'Администратор создан', 'Ошибка создания админа', () => setActiveType(''));
    }, [setActiveType]);

    const updateAdmin = useCallback(async (data) => {
        notifyShowToast('info', 'Запрос отправлен.');
        const result = await singleRequest(() => adminAPI.updateAdmin(data));
        handleApiResponse(result, 'Администратор обновлен', 'Ошибка обновления админа', () => setActiveType(''));
    }, [setActiveType]);

    const deleteAdmin = useCallback(async (id) => {
        notifyShowToast('info', 'Запрос отправлен.');
        const result = await singleRequest(() => adminAPI.deleteAdmin(id));
        handleApiResponse(result, 'Администратор удален', 'Ошибка удаления админа', () => setActiveType(''));
    }, [setActiveType]);


    if (isLoading) return <PreloaderAdminComponent/>

    if (errorResponse) {
        return <ErrorComponent text={errorResponse} isContainerError/>;
    }

    return (
        <>
            <TitleAdmin text="Настройка администраторов"/>
            {mode ? (
                <ModeContainer
                    admin={currentAdmin}
                    setMode={setMode}
                    mode={mode}
                    createAdmin={createAdmin}
                    updateAdmin={updateAdmin}
                    deleteAdmin={deleteAdmin}
                />
            ) : (
                <>
                    <AdminButton text={'Создать'} type={'archive'} handleClick={() => setMode(MODE_TYPE.CREATE)}/>
                    <AdminsContainer admins={admins} handleClick={editAdmin}/>
                </>
            )}
        </>
    );
};

export default AdminSettings;


const handleApiResponse = (result, successMessage, errorMessage, callback) => {
    if (result.error) {
        notifyShowToast('error', result.error || errorMessage);
        return false;
    }

    if (result.status >= 200 && result.status < 300) {
        notifyShowToast('success', result.data?.message || successMessage);
        callback?.();
        return true;
    }

    notifyShowToast('error', result.error || errorMessage);
    return false;
};