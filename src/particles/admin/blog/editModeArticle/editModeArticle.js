'use client'

import React, {useEffect, useMemo, useState} from 'react';

import ContentFieldsImages from "./contentFieldsImages/contentFieldsImages";
import {ContentFieldsUpdateOrCreate} from "./contentFieldsData/contentFields";

import {getFullPathImage} from "../../../../utils/getFullPathImage";
import {handleFieldsChange} from "../../../../utils/admin/adminHandleFieldChange";
import {notifyShowToast} from "../../../../utils/showToast";

import {
    createArticle,
    createArticleImage, deleteArticle,
    deleteArticleImage,
    updateArticleData,
    updateArticleImage
} from "../../../../services/api";

import {fieldsArticleData, fieldsArticleImages} from "../fields";

const MODES = {
    CREATE_DATA: 'create_data',
    UPDATE_DATA: 'update_data',
    CREATE_IMAGE: 'create_image',
    UPDATE_IMAGES: 'update_images'
};

/** Компонент редактирования/создания статьи.
 * @param {Object} props - Пропсы компонента.
 * @param {object} props.currentArticle - Данные статьи.
 * @param {function} props.getUpdateData - Массив статей.
 * @param {string} props.mode - Режим редактирования.
 * @param {function} props.setMode - Обработчик на изменение режима редактирования
 * @returns {JSX.Element} - Компонент всех статей.
 */
const EditModeArticle = ({currentArticle, getUpdateData, mode, setMode}) => {
    const [fields, setFields] = useState(null);
    const [selectedImageId, setSelectedImageId] = useState(null);
    const [indexShowHelp, setIndexShowHelp] = useState([]);

    const isCreateMode = mode === MODES.CREATE_DATA || mode === MODES.CREATE_IMAGE;
    // const isUpdateMode = mode === MODES.UPDATE_DATA || mode === MODES.UPDATE_IMAGES;

    /** Получаем поля в зависимости от режима */
    const updateFields = useMemo(() => {
        if (!mode) return null;

        if (mode === MODES.CREATE_DATA) return fieldsArticleData;
        if (mode === MODES.CREATE_IMAGE || mode === MODES.UPDATE_IMAGES) return fieldsArticleImages;

        if (mode === MODES.UPDATE_DATA) {
            return fieldsArticleData.map(field => ({
                ...field,
                value: field.type === 'file'
                    ? getFullPathImage(currentArticle.folder_img, currentArticle.preview_img_name) || field.value
                    : currentArticle[field.name] || field.value
            }));
        }

        if (mode === MODES.UPDATE_IMAGES && selectedImageId) {
            const currentImage = currentArticle.images.find(img => img.id === selectedImageId);
            return currentImage ? fieldsArticleImages.map(field => ({
                ...field,
                value: field.type === 'file'
                    ? getFullPathImage(currentImage.image_path, currentImage.image_name) || field.value
                    : currentImage[field.name] || field.value
            })) : null;
        }

        return null;
    }, [mode, currentArticle, selectedImageId]);

    useEffect(() => {
        setFields(updateFields);
        setIndexShowHelp([]);
    }, [updateFields]);

    const handleFieldChange = (e, type = 'text') => {
        handleFieldsChange(e, type, fields, setFields);
    };

    /** Функция для показа подсказок на полях */
    const toggleStateHelpText = (index) => {
        setIndexShowHelp(prev =>
            prev.includes(index) ? prev.filter(el => el !== index) : [...prev, index]
        );
    };

    /** Функция для отправки запроса на бек */
    const sendRequest = async (isDelete = false, modeDelete) => {
        try {
            notifyShowToast('info', isDelete ? 'Заявка на удаление отправлена.' : 'Заявка отправлена.');

            let result;
            if (isDelete) {
                result = modeDelete === 'article'
                    ? await deleteArticle(currentArticle.id)
                    : await deleteArticleImage(selectedImageId);
            } else {
                result = await createOrUpdate();
            }

            if (result?.status >= 200 && result?.status < 300) {
                notifyShowToast('success', result?.data?.message || 'Данные успешно обновлены.');
                getUpdateData();
                setMode('');
            } else {
                notifyShowToast('error', result?.response?.data?.errorText || 'Произошла ошибка.');
            }
        } catch (error) {
            notifyShowToast('error', 'Произошла ошибка при отправке данных.');
            console.error('Ошибка при отправке данных:', error);
        }
    };

    /** Функция для отправки post & patch запросов */
    const createOrUpdate = async () => {
        if (!fields) return;

        const filterFields = isCreateMode ? fields : fields.filter(field => field.isEdit);
        if (!filterFields.length) {
            notifyShowToast('error', 'Нет изменений для сохранения.');
            return;
        }

        const hasValidationErrors = filterFields.some(field =>
            field.type === 'file' ? field.validation(field.file).errorText : field.validation(field.value).errorText
        );

        if (hasValidationErrors) {
            notifyShowToast('error', 'Некоторые поля заполнены некорректно.');
            return;
        }

        const formData = new FormData();
        filterFields.forEach(field => {
            if (field.type === 'file' && field.file) {
                formData.append(field.name, field.file);
            } else if (field.type !== 'file') {
                formData.append(field.name, field.value);
            }
        });

        switch (mode) {
            case MODES.CREATE_DATA:
                return await createArticle(formData);
            case MODES.UPDATE_DATA:
                formData.append('id', currentArticle.id);
                return await updateArticleData(formData);
            case MODES.CREATE_IMAGE:
                formData.append('id_article', currentArticle.id);
                return await createArticleImage(formData);
            case MODES.UPDATE_IMAGES:
                formData.append('id', selectedImageId);
                return await updateArticleImage(formData);
            default:
                return;
        }
    };

    return (
        <>
            {(mode === 'create_data' || mode === 'update_data') &&
            <ContentFieldsUpdateOrCreate fields={fields}
                                         indexShowHelp={indexShowHelp}
                                         toggleStateHelpText={toggleStateHelpText}
                                         handleFieldChange={handleFieldChange}
                                         currentArticle={currentArticle}
                                         isCreate={mode === MODES.CREATE_DATA}
                                         handleCancel={() => setMode('')}
                                         handleSave={() => sendRequest()}
                                         handleDelete={() => sendRequest(true, 'article')}

            />}
            {(mode === 'create_image' || mode === 'update_images') &&
            <ContentFieldsImages fields={fields}
                                 images={currentArticle.images}
                                 selectedImageId={selectedImageId}
                                 handleFieldChange={handleFieldChange}
                                 indexShowHelp={indexShowHelp}
                                 toggleStateHelpText={toggleStateHelpText}
                                 setMode={setMode}
                                 mode={mode}
                                 handleRequest={sendRequest}
                                 setSelectedImageId={setSelectedImageId}
            />}

        </>
    );
};

export default EditModeArticle;