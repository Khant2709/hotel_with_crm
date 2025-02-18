'use client'

import React, {useCallback, useEffect, useState} from 'react';

import ContainerFieldImage from "../../../../../components/ui/admin/containerFieldImage/containerFieldImage";

import {getDataToPage, TYPES_REQUEST} from "../../getDataToPage";

import {toggleHelpText} from "../generalUtils";
import {notifyShowToast} from "../../../../../utils/showToast";
import {handleFieldsChange} from "../../../../../utils/admin/adminHandleFieldChange";
import {getUpdatedImageFields} from "../../../../../utils/admin/getpupdatedImageFields";

import {hotels} from '../../../../../services/api';

import {fieldsApartmentImages} from "../fields";

import styles from "./componentImages.module.css";
import stylesFontT from "../../../../../styles/fonts/timesNewRoman.module.css";


const ComponentImages = ({hotelId, setActiveCategory}) => {
    const [images, setImages] = useState([]);
    const [fields, setFields] = useState(fieldsApartmentImages);
    const [indexShowHelp, setIndexShowHelp] = useState([]);
    const [indexEditField, setIndexEditField] = useState(null);

    useEffect(() => {
        getDataToPage(TYPES_REQUEST.IMAGES, hotelId)
            .then(res => {
                setImages(res.data)
            })
    }, [])

    const handleFieldChange = useCallback((e, type = 'text') => {
        handleFieldsChange(e, type, fields, setFields);
    }, [fields]);

    const handleToggleHelpText = useCallback((index) => {
        toggleHelpText(indexShowHelp, setIndexShowHelp, index);
    }, [indexShowHelp]);

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

    const updateHotelImage = async () => {
        const hasEdit = fields.some(field => field.isEdit);

        if (!hasEdit) {
            notifyShowToast('error', 'Нет полей для обновления!');
            return;
        }

        const hasError = fields.some(field => field.isEdit && field.errorText);

        if (hasError) {
            notifyShowToast('error', 'Поля заполнены не корректно!');
            return;
        }

        const data = new FormData();
        fields.forEach(field => {
            if (field.type === 'file') {
                if (field.file) {
                    data.append(field.name, field.file);
                }
            } else {
                data.append(field.name, field.value);
            }
        });
        data.append('idImg', indexEditField)

        const response = await hotels.updateImageHotel(data);

        if (response.status >= 200 && response.status < 300) {
            notifyShowToast('success', response?.data?.message || 'Запрос выполнен успешно.');
            setActiveCategory('');
        } else {
            notifyShowToast('error', response?.response?.data?.errorText || 'Произошла ошибка при обновлении данных.');
        }
    }

    return (
        <div className={styles.wrapperMain}>
            <p className={`${stylesFontT.newRoman700} ${styles.title}`}>Номера (редактирование)</p>
            {images.map(image => {
                const isEditMode = image.id === indexEditField;
                const handleEdit = isEditMode ? toggleEditMode : () => toggleEditMode(image.id, image)
                return (
                    <ContainerFieldImage key={image.id}
                                         fields={fields}
                                         fieldsValue={image}
                                         isEditMode={isEditMode}
                                         handleFieldChange={handleFieldChange}
                                         handleEdit={handleEdit}
                                         handleSave={updateHotelImage}
                                         hasDelete={false}
                                         indexShowHelp={indexShowHelp}
                                         handleToggleHelpText={handleToggleHelpText}
                    />
                )
            })}
        </div>
    );
};

export default ComponentImages;