"use client";

import React, {useCallback, useMemo, useState} from "react";
import {usePathname} from "next/navigation";

import {notifyShowToast} from "../../../utils/showToast";
import {handleFieldChange} from "../../../utils/handleFieldChange";
import {formatPhoneWithoutMask} from "../../../utils/mask/transfomNumber";
import {checkAdminPath} from "../../../utils/admin/checkAdminPath";

import {connection} from '../../../services/api';

import {fieldsData} from "./fieldsData";

import ContentButtonCallBack from "./contentButtonCallBack";

/**
 * Компонент кнопки-формы для обратного звонка.
 * @returns {JSX.Element} - Компонент кнопки-формы.
 */
const ButtonCallBack = () => {
    const pathname = usePathname();
    const isAdminPage = checkAdminPath(pathname);

    const [buttonState, setButtonState] = useState({isButton: true, hiddenButton: false});
    const [fields, setFields] = useState(fieldsData);

    const hasFieldsError = useMemo(() => fields.some(field => !field.isEdit || !!field.errorText), [fields]);

    const handleFieldsChange = (e) => {
        handleFieldChange(e, fields, setFields);
    }

    /** Отправляет данные формы на сервер.
     * @param {Object} data - Данные формы.
     */
    const handleSubmit = async (data) => {
        try {
            const resultCallBack = await connection.callBack(data);
            if (resultCallBack.status === 200) {
                setFields(fieldsData);
                setButtonState({isButton: true, hiddenButton: false});
                notifyShowToast('success', 'Заявка успешно получена.');
            } else {
                notifyShowToast('error', resultCallBack.data.errorText || 'Произошла ошибка, попробуйте повторить позднее.');
            }
        } catch (e) {
            console.debug('e === ', e);
            notifyShowToast('error', e.response.data.message || 'Произошла ошибка, попробуйте повторить позднее.');
        }
    };

    /** Обрабатывает отправку формы. */
    const handleSubmitCallBack = useCallback(async () => {
        if (!hasFieldsError) {
            notifyShowToast('info', 'Заявка отправлена.');
            const data = fields.reduce((acc, field) => {
                if (field.name === 'checkbox') return acc;
                acc[field.name] = field.name === 'phone'
                    ? formatPhoneWithoutMask(field.value)
                    : field.value;
                return acc;
            }, {});
            await handleSubmit(data);
        }
    }, [hasFieldsError, fields]);

    /** Переключает состояние между кнопкой и формой. */
    const toggleCallBackForm = useCallback(() => {
        setButtonState((prev) => ({...prev, isButton: !prev.isButton}));
        setTimeout(() => {
            setButtonState((prev) => ({...prev, hiddenButton: !prev.hiddenButton}));
        }, 300);
    }, []);


    const fieldsMemo = useMemo(() => fields, [fields]);
    const buttonStateMemo = useMemo(() => buttonState, [buttonState]);

    if (isAdminPage) return null;

    return (
        <ContentButtonCallBack
            toggleCallBackForm={toggleCallBackForm}
            buttonState={buttonStateMemo}
            fields={fieldsMemo}
            handleFieldsChange={handleFieldsChange}
            hasFieldsError={hasFieldsError}
            handleSubmitCallBack={handleSubmitCallBack}
        />
    );
};

export default ButtonCallBack;
