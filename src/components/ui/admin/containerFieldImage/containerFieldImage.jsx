import React from 'react';
import Image from "next/image";

import {AdminButton} from "../buttons/buttons";
import {ClassicFieldImage, FileField, InputField} from "../fields/fieldsAdmin";

import {getFullPathImage} from "../../../../utils/getFullPathImage";

import iconQuestion from "../../../../../public/question.png";

import styles from "./containerFieldImage.module.css";
import stylesFontT from "../../../../styles/fonts/timesNewRoman.module.css";
import stylesFontI from "../../../../styles/fonts/inter.module.css";

const IMAGE_TYPE = {
    "banner": "Банер главной страницы",
    "banner2": "Банер страницы отели",
    "territory": "Фото территории",
    "aboutUs": "Фото о нас",
};

// Этот блог должен повторяться в БЛОГ, ОТЕЛЬ[КАРТИНКИ], НОМЕРА[КАРТИНКИ]
const ContainerFieldImage = ({
                                 fields,
                                 fieldsValue,
                                 isEditMode,
                                 handleFieldChange,
                                 handleEdit,
                                 handleSave,
                                 hasDelete,
                                 handleDelete,
                                 indexShowHelp,
                                 handleToggleHelpText
                             }) => {
    const imageTitle = fieldsValue?.image_type ? IMAGE_TYPE[fieldsValue.image_type] : null;

    return (
        <div className={`${stylesFontT.newRoman400} ${styles.containerMain}`}>
            {imageTitle && <p className={styles.title}>{imageTitle}:</p>}
            {fields.map((field, i) => {
                return <div key={`${field.name}_${i}`}
                            className={`${stylesFontT.newRoman400} ${styles.containerData}`}>
                    <div className={`${styles.rowField}`}>
                        <div className={styles.colInfo}>
                            <Image alt={'?'} src={iconQuestion} className={styles.icon}
                                   onClick={() => handleToggleHelpText(i)}
                            />
                            <p className={styles.label}>{field.label}</p>
                        </div>
                        <FieldRenderer field={field} isEditMode={isEditMode} handleFieldChange={handleFieldChange}
                                       fieldsValue={fieldsValue}/>
                    </div>
                    <FieldMessages field={field} isShow={indexShowHelp.includes(i)}/>
                </div>
            })}

            <div className={styles.containerButtons}>
                <AdminButton text={isEditMode ? 'Отмена' : 'Изменить'}
                             handleClick={handleEdit}
                             type={'archive'}/>
                {isEditMode && (
                    <>
                        <AdminButton text={'Сохранить'} type={'save'} handleClick={handleSave}/>
                        {hasDelete && <AdminButton text={'Удалить'} type={'delete'} handleClick={handleDelete}/>}
                    </>
                )}
            </div>
        </div>
    );
};

export default ContainerFieldImage;

const FieldRenderer = ({isEditMode, field, handleFieldChange, fieldsValue}) => {
    switch (field.type) {
        case 'file':
            if (isEditMode) {
                return <FileField field={field} onChange={handleFieldChange}/>
            } else {
                return <ClassicFieldImage
                    field={{value: getFullPathImage(fieldsValue.image_path, fieldsValue.image_name)}}/>
            }
        case 'number':
            if (isEditMode) {
                return <InputField field={field} onChange={handleFieldChange}/>
            } else {
                return <p className={styles.text}>{fieldsValue?.image_priority || fieldsValue.priority}</p>
            }
    }
};

const FieldMessages = ({field, isShow}) => (
    <>
        {field.errorText &&
        <p className={`${stylesFontI.Inter300} ${styles.errorText}`}>{field.errorText || "Ошибка"}</p>}
        {isShow && <p className={`${stylesFontI.Inter300} ${styles.helpText}`}>{field.helpText}</p>}
    </>
);