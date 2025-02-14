'use client'

import React, {useCallback, useEffect, useMemo, useState} from 'react';

import {notifyShowToast} from "../../../../../utils/showToast";
import {getFullPathImage} from "../../../../../utils/getFullPathImage";
import {handleFieldsChange} from "../../../../../utils/admin/adminHandleFieldChange";

import {fieldsApartmentData, fieldsApartmentPrice} from "../fields";

import {fetchApartment, updateApartmentDetails, updateApartmentPriceData} from "./apartmentRequests";
import {toggleHelpText} from "../generalUtils";
import ContentApartment from "./contentApartment/contentApartment";

const editCategory = [
    {
        label: 'Данные номера',
        category: 'apartment_data',
    },
    {
        label: 'Фото номера',
        category: 'apartment_photo',
    },
    {
        label: 'Ценны номера',
        category: 'apartment_price',
    },

];

const ComponentApartments = ({hotelId, setActiveCategory}) => {
    const [apartments, setApartments] = useState([]);
    const [fields, setFields] = useState(null);
    const [modeEdit, setModeEdit] = useState('');
    const [activeIndex, setActiveIndex] = useState(null);
    const [indexShowHelp, setIndexShowHelp] = useState([]);

    useEffect(() => {
        const controller = new AbortController();
        fetchApartment({hotelId, signal: controller.signal})
            .then(res => {
                setApartments(res)
            })
            .catch(error => {
                console.error('!Something error: ', error.message);
                notifyShowToast('error', error.message || 'Произошла ошибка при получении данных.');
            })
        return () => controller.abort(); // Отмена запроса при размонтировании
    }, [hotelId]);

    // Данные текущего номера
    const currentApartment = useMemo(() => {
        return apartments.find(apartment => apartment.id === activeIndex) || null;
    }, [activeIndex, apartments])

    useEffect(() => {
        if (!modeEdit) {
            setFields(null);
            return;
        }

        if (modeEdit === 'apartment_photo') {
            fetchApartment({hotelId, isImageFetch: true, apartmentId: currentApartment.id})
                .then(res => setFields(res))
                .catch(error => {
                    console.error('Ошибка загрузки фото:', error.message);
                    notifyShowToast('error', error.message || 'Ошибка загрузки изображений.');
                });
            return;
        }

        const mapFields = (fieldsList, dataSource) =>
            fieldsList.map(field => ({
                ...field,
                value: field.type === 'file'
                    ? getFullPathImage(dataSource.apartment_folder_img, dataSource.apartment_preview_img_name) || field.value
                    : dataSource[field.name] || field.value
            }));

        if (modeEdit === 'apartment_data') {
            setFields(mapFields(fieldsApartmentData, currentApartment));
        }

        if (modeEdit === 'apartment_price') {
            setFields(mapFields(fieldsApartmentPrice, currentApartment.prices || {}));
        }
    }, [modeEdit, currentApartment, hotelId]);

    // Показывает категории номера для изменений (данные, фото, прайс)
    const showSetting = (id) => {
        setActiveIndex(id || null)
    }

    // FN для изменения полей
    const handleFieldChange = useCallback((e, type = 'text') => {
        handleFieldsChange(e, type, fields, setFields);
    }, [fields]);

    // FN для отображения подсказки у поля
    const handleToggleHelpText = useCallback((index) => {
        toggleHelpText(indexShowHelp, setIndexShowHelp, index);
    }, [indexShowHelp]);

    // FN для отправки данных
    const sendEditor = async () => {
        const filterFields = fields.filter(field => field.isEdit);
        if (filterFields.length === 0) {
            notifyShowToast('error', 'Нет изменений для сохранения.');
            return;
        }

        if (filterFields.some(field => field.validation(field.value).errorText)) {
            notifyShowToast('error', 'Некоторые поля заполнены некорректно.');
            return;
        }

        notifyShowToast('info', 'Заявка на изменение данных отправлена.');

        let result;
        try {
            if (modeEdit === 'apartment_data') {
                result = await updateApartmentDetails(filterFields, currentApartment.id);
            }

            if (modeEdit === 'apartment_price') {
                result = await updateApartmentPriceData(filterFields, currentApartment.id);
            }

            if (result.status >= 200 && result.status < 300) {
                notifyShowToast('success', result?.data?.message || 'Данные успешно обновлены.');
                setActiveCategory('');
            } else {
                notifyShowToast('error', result?.response?.data?.errorText || 'Произошла ошибка при обновлении данных.');
            }
        } catch (error) {
            console.error('Ошибка при отправке данных:', error);
            notifyShowToast('error', error?.message || 'Произошла ошибка при отправке данных.');
        }
    };


    return (
        <ContentApartment modeEdit={modeEdit}
                          apartments={apartments}
                          activeIndex={activeIndex}
                          editCategory={editCategory}
                          showSetting={showSetting}
                          setModeEdit={setModeEdit}
                          currentApartment={currentApartment}
                          fields={fields}
                          handleTogglHelpText={handleToggleHelpText}
                          handleFieldChange={handleFieldChange}
                          indexShowHelp={indexShowHelp}
                          sendEditor={sendEditor}
                          setActiveCategory={setActiveCategory}

        />
    );
};

export default ComponentApartments;