import React from 'react';
import Image from "next/image";

import {ClassicFieldImage, FileField, InputField} from "../../../../../../../components/ui/admin/fields/fieldsAdmin";
import {AdminButton} from "../../../../../../../components/ui/admin/buttons/buttons";

import {getFullPathImage} from "../../../../../../../utils/getFullPathImage";

import iconQuestion from "../../../../../../../../public/question.png";

import styles from "./contentContainerImages.module.css";
import stylesFontT from "../../../../../../../styles/fonts/timesNewRoman.module.css";
import stylesFontI from "../../../../../../../styles/fonts/inter.module.css";

const ContentContainerImages = ({
                                    isCreate,
                                    setModeEdit,
                                    fields,
                                    handleFieldChange,
                                    setIsCreate,
                                    actionRequest,
                                    indexShowHelp,
                                    toggleStateHelpText,
                                    apartmentImages,
                                    indexEditField,
                                    toggleEditMode,
                                }) => {
    return (
        <>
            <AdminButton text={'Назад в меню'} handleClick={() => setModeEdit('')}/>
            {isCreate
                ? <WrapperField fields={fields}
                                mode={isCreate}
                                handleFieldChange={handleFieldChange}
                                handleEdit={() => setIsCreate(false)}
                                handleSave={() => actionRequest('create')}
                                indexShowHelp={indexShowHelp}
                                toggleStateHelpText={toggleStateHelpText}
                />
                : <AdminButton text={'Добавить фотографию'} type={'archive'} handleClick={() => setIsCreate(true)}/>
            }

            {!isCreate && apartmentImages && apartmentImages.map(images => {
                const modeIsEdit = images.id === indexEditField;
                return (
                    <WrapperField key={images.id}
                                  fields={fields}
                                  dataValues={images}
                                  mode={modeIsEdit}
                                  handleFieldChange={handleFieldChange}
                                  handleEdit={modeIsEdit ? toggleEditMode : () => toggleEditMode(images.id, images)}
                                  handleSave={() => actionRequest('update')}
                                  handleDelete={() => actionRequest('delete')}
                                  hasDelete={true}
                                  indexShowHelp={indexShowHelp}
                                  toggleStateHelpText={toggleStateHelpText}
                    />
                )
            })}
        </>
    );
};

export default ContentContainerImages;

const WrapperField = ({
                          fields,
                          dataValues,
                          mode,
                          handleFieldChange,
                          handleEdit,
                          handleSave,
                          hasDelete,
                          handleDelete,
                          indexShowHelp,
                          toggleStateHelpText
                      }) => (
    <div className={`${stylesFontT.newRoman400} ${styles.wrapperRowField}`}>
        {fields.map((field, i) => {
            return <div key={`${field.name}_${i}`} className={`${stylesFontT.newRoman400} ${styles.wrapperRowField}`}>
                <div className={`${styles.rowField}`}>
                    <div className={styles.boxValue}>
                        <Image alt={'?'} src={iconQuestion} className={styles.icon}
                               onClick={() => toggleStateHelpText(i)}
                        />
                        <p className={styles.label}>{field.label}</p>
                    </div>
                    <Fields field={field} mode={mode} handleFieldChange={handleFieldChange} dataValues={dataValues}/>
                </div>
                {field.errorText &&
                <p className={`${stylesFontI.Inter300} ${styles.errorText}`}>
                    {field.errorText || 'Ошибка'}
                </p>}
                {indexShowHelp.includes(i) &&
                <p className={`${stylesFontI.Inter300} ${styles.helpText}`}>
                    {field.helpText}
                </p>}
            </div>
        })}

        <div className={styles.wrapperBtns}>
            <AdminButton text={mode ? 'Отмена' : 'Изменить'}
                         handleClick={handleEdit}
                         type={'archive'}/>
            {mode && <AdminButton text={'Сохранить'} type={'save'} handleClick={handleSave}/>}
            {mode && hasDelete && <AdminButton text={'Удалить'} type={'delete'} handleClick={handleDelete}/>}
        </div>
    </div>
);

const Fields = ({mode, field, handleFieldChange, dataValues}) => {
    const isFileField = field.type === 'file';
    if (mode) {
        return isFileField
            ? <FileField field={field} onChange={handleFieldChange}/>
            : <InputField field={field} onChange={handleFieldChange}/>
    } else {
        return isFileField
            ? <ClassicFieldImage
                field={{value: getFullPathImage(dataValues.image_path, dataValues.image_name)}}/>
            : <p className={styles.text}>{dataValues.image_priority}</p>
    }
}