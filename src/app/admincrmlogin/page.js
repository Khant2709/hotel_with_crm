'use client'

import React, {useEffect, useState} from 'react';
import {useRouter} from "next/navigation";

import ContentLoginPage from "../../particles/admin/login/contentLoginPage";

import {checkToken, login} from "../../services/authService";
import {notifyShowToast} from "../../utils/showToast";

/** Компонент страницы входа в админку */
const PageAdminCRMLogin = () => {
    const router = useRouter();
    const [fields, setFields] = useState({name: "", password: ""});
    const [statusPassword, setStatusPassword] = useState(true);

    useEffect(() => {
        checkToken(router, true);
    }, [router])

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFields((prevFields) => ({...prevFields, [name]: value}));
    }

    const auth = async (e) => {
        e.preventDefault(); // Предотвращаем стандартное поведение формы
        notifyShowToast('info', 'Запрос отправлен.');
        await login({username: fields.name, password: fields.password}, router);
    };

    return (
        <ContentLoginPage auth={auth}
                          fields={fields}
                          handleInputChange={handleInputChange}
                          statusPassword={statusPassword}
                          setStatusPassword={setStatusPassword}
        />
    );
};

export default PageAdminCRMLogin;
