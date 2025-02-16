import React, {useCallback, useEffect, useState} from 'react';

import ContentHotelAdContacts from "./contentHotelAdContacts/contentHotelAdContacts";

import {notifyShowToast} from "../../../../../utils/showToast";
import {handleFieldsChange} from "../../../../../utils/admin/adminHandleFieldChange";
import {toggleHelpText, updateFields} from "../generalUtils";

import {hotels} from "../../../../../services/api";

import {fieldsContactsData, fieldsHotelData} from "../fields";


const initialData = {
    'hotel_data': {
        fields: fieldsHotelData,
        handle: (data) => hotels.updateHotelData(data),
        titleComponent: 'Данные отеля (редактирование)'
    },
    'hotel_contacts': {
        fields: fieldsContactsData,
        handle: (data) => hotels.updateContactsHotel(data),
        titleComponent: 'Контакты отеля (редактирование)'
    }
};

const ComponentHotelAndContacts = ({hotel, activeCategory, updateData}) => {
    const [fields, setFields] = useState(initialData[activeCategory]?.fields || []);
    const [indexShowHelp, setIndexShowHelp] = useState([]);

    useEffect(() => {
        setFields(updateFields(initialData[activeCategory].fields, hotel));
    }, [activeCategory, hotel]);


    const handleFieldChange = useCallback((e) => {
        handleFieldsChange(e, 'text', fields, setFields);
    }, [fields]);

    const handleToggleHelpText = useCallback((index) => {
        toggleHelpText(indexShowHelp, setIndexShowHelp, index);
    }, [indexShowHelp]);

    const handleUpdateHotelData = async () => {
        const editedFields = fields.filter(field => field.isEdit);

        if (editedFields.length === 0) {
            notifyShowToast('error', 'Нет изменений для сохранения. Проверьте заполнение полей.');
            return;
        }

        const hasValidationErrors = editedFields.find(field => field.validation(field.value).errorText);
        if (hasValidationErrors) {
            notifyShowToast('error', 'Некоторые поля заполнены некорректно.');
            return;
        }

        notifyShowToast('info', 'Заявка на изменение данных отправлена.');

        const data = editedFields.reduce((acc, field) => {
            acc[field.name] = field.value;
            return acc;
        }, {});

        try {
            const sendUpdate = await initialData[activeCategory].handle({...data, idHotel: hotel.id});

            if (sendUpdate.status >= 200 && sendUpdate.status < 300) {
                notifyShowToast('success', 'Данные успешно обновлены.');
                updateData()
            } else {
                throw new Error(sendUpdate?.response?.data?.errorText || 'Произошла ошибка при обновлении данных, попробуйте еще раз.')
            }
        } catch (error) {
            console.error('Ошибка при обновлении данных:', error.message);
            notifyShowToast('error', 'Произошла ошибка при отправке данных.');
        }
    }

    return (
        <ContentHotelAdContacts fields={fields}
                                handleToggleHelpText={handleToggleHelpText}
                                handleFieldChange={handleFieldChange}
                                indexShowHelp={indexShowHelp}
                                handleUpdateHotelData={handleUpdateHotelData}
                                title={initialData[activeCategory]?.titleComponent || 'Ошибка загрузки'}
        />
    );
};

export default ComponentHotelAndContacts;