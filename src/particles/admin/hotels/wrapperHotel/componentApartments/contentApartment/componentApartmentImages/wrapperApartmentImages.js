'use client'

import React, {useCallback, useState} from 'react';

import ContentContainerImages from "./contentContainerImages";

import {fetchApartmentImage} from "../../apartmentRequests";

import {notifyShowToast} from "../../../../../../../utils/showToast";
import {handleFieldsChange} from "../../../../../../../utils/admin/adminHandleFieldChange";

import {fieldsApartmentImages} from "../../../fields";
import {getUpdatedImageFields} from "../../../../../../../utils/admin/getpupdatedImageFields";


const WrapperApartmentImages = ({
                                    apartmentImages,
                                    setModeEdit,
                                    apartmentId,
                                    setActiveCategory,
                                    indexShowHelp,
                                    handleToggleHelpText
                                }) => {
    const [fields, setFields] = useState(fieldsApartmentImages);
    const [indexEditField, setIndexEditField] = useState(null);
    const [isCreate, setIsCreate] = useState(false);

    const handleFieldChange = useCallback((e, type = 'text') => {
        handleFieldsChange(e, type, fields, setFields);
    }, [fields]);

    const toggleEditMode = (index, dataFields) => {
        if (index && dataFields) {
            const updateFields = getUpdatedImageFields(fieldsApartmentImages, dataFields);
            setFields(updateFields);
            setIndexEditField(index);
        } else {
            setFields(fieldsApartmentImages);
            setIndexEditField(null);
        }
    };

    const actionRequest = async (typeRequest) => {
        notifyShowToast('info', 'Запрос отправлен.');
        fetchApartmentImage(typeRequest, indexEditField, fields, apartmentId)
            .then(res => {
                notifyShowToast('success', res || 'Запрос выполнен успешно.');
                setActiveCategory('');
            })
            .catch(error => {
                notifyShowToast('error', error?.message || 'Произошла ошибка, попробуйте еще раз.');
            })
    };

    return (
        <ContentContainerImages isCreate={isCreate}
                                setModeEdit={setModeEdit}
                                fields={fields}
                                handleFieldChange={handleFieldChange}
                                setIsCreate={setIsCreate}
                                actionRequest={actionRequest}
                                indexShowHelp={indexShowHelp}
                                handleToggleHelpText={handleToggleHelpText}
                                apartmentImages={apartmentImages}
                                indexEditField={indexEditField}
                                toggleEditMode={toggleEditMode}
        />
    );
};

export default WrapperApartmentImages;

