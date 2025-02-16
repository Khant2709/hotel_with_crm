'use client'

import React, {useCallback, useEffect, useState} from 'react';

import ContentFaq from "./contentFAQ/contentFAQ";

import {notifyShowToast} from "../../../../../utils/showToast";
import {handleFieldsChange} from "../../../../../utils/admin/adminHandleFieldChange";

import {faq} from "../../../../../services/api";

import {fieldsFAQData} from "../fields";

import {getDataToPage, TYPES_REQUEST} from "../../getDataToPage";

const ComponentFAQ = ({hotelId, setActiveCategory}) => {
    const [faqList, setFaqList] = useState([]);
    const [fields, setFields] = useState(fieldsFAQData);
    const [indexEditField, setIndexEditField] = useState(null);
    const [isCreate, setIsCreate] = useState(false);

    useEffect(() => {
        const controller = new AbortController();
        getDataToPage(TYPES_REQUEST.FAQ, hotelId, {signal: controller.signal})
            .then(res => {
                setFaqList(res.data)
            })
            .catch(error => {
                notifyShowToast(
                    'error',
                    error?.response?.errorText || 'Произошла ошибка при получении отеля, обновите страницу или попробуйте по позже.'
                );
            })
        return () => controller.abort(); // Отмена запроса при размонтировании
    }, [hotelId]);

    const handleFieldChange = (e) => {
        handleFieldsChange(e, 'text', fields, setFields);
    };

    const toggleEditMode = useCallback((index, dataFields, modeCreate) => {
        if (index && dataFields) {
            setFields(prevFields => prevFields.map(field => ({
                ...field,
                value: dataFields[field.name] ?? field.value
            })));
            setIndexEditField(index);
            isCreate && setIsCreate(false);
        } else {
            modeCreate && setIsCreate(prev => !prev);
            setFields(fieldsFAQData);
            setIndexEditField(null);
        }
    }, []);

    const sendEditor = async (type) => {
        let response;

        try {
            if (type === 'create' || type === 'update') {
                response = await createOrUpdateFaq();
            }

            if (type === 'delete') {
                response = await deleteFaq();
            }

            if (response && response.status >= 200 && response.status < 300) {
                const toastTextSuc = isCreate ? 'FAQ успешно создан.' : 'FAQ успешно обновлен.';
                notifyShowToast('success', response?.data?.message || toastTextSuc);
                setActiveCategory('');
            } else {
                notifyShowToast('error', response?.errorFront || response?.response?.data?.errorText || 'Произошла ошибка, попробуйте еще раз.');
            }
        } catch (error) {
            notifyShowToast('error', 'Произошла ошибка при выполнении операции.');
            console.error(`Ошибка при выполнении операции "${type}":`, error);
        }
    };


    const createOrUpdateFaq = async () => {
        const filterFields = isCreate ? fields : fields.filter(field => field.isEdit);
        if (!filterFields.length) return {status: 404, errorFront: 'Нет изменений.'};

        const hasValidationErrors = filterFields.find(field => field.validation(field.value).errorText);
        if (hasValidationErrors) return {status: 409, errorFront: 'Некоторые поля заполнены некорректно.'};


        notifyShowToast('info', 'Изменения отправлены.');

        const data = filterFields.reduce((acc, field) => {
            acc[field.name] = field.value;
            return acc;
        }, {});

        try {
            return isCreate
                ? await faq.createCurrentFAQ({...data, idHotel: hotelId})
                : await faq.updateCurrentFAQ(indexEditField, {...data, idFAQ: indexEditField});
        } catch (error) {
            console.error('Ошибка:', error);
            return {status: 500, errorFront: 'Произошла ошибка при отправке данных.'};
        }
    };

    const deleteFaq = async () => {
        notifyShowToast('info', 'Запрос на удаление отправлен.');

        try {
            return await faq.deleteCurrentFAQ(indexEditField);
        } catch (error) {
            console.error(`Ошибка при удалении FAQ с ID ${indexEditField}:`, error);
            return {status: 500, errorFront: 'Произошла ошибка при удалении.'};
        }
    };

    return (
        <ContentFaq isCreate={isCreate}
                    fields={fields}
                    handleFieldChange={handleFieldChange}
                    sendEditor={sendEditor}
                    faqList={faqList}
                    indexEditField={indexEditField}
                    toggleEditMode={toggleEditMode}
        />
    );
};

export default ComponentFAQ;

