import React from 'react';
import Image from "next/image";

import {AdminButton} from "../../../../../components/ui/admin/buttons/buttons";
import {ClassicFieldImage, FileField, InputField} from "../../../../../components/ui/admin/fields/fieldsAdmin";

import {getFullPathImage} from "../../../../../utils/getFullPathImage";

import iconQuestion from "../../../../../../public/question.png";

import styles from './contentFieldsImages.module.css';
import stylesFontT from "../../../../../styles/fonts/timesNewRoman.module.css";
import stylesFontI from "../../../../../styles/fonts/inter.module.css";

/** Компонент редактирования/создания фотографий статьи.
 * @param {Object} props - Пропсы компонента.
 * @param {array || null} props.fields - Массив полей.
 * @param {array} props.images - Массив изображений.
 * @param {number} props.selectedImageId - ID выбранного изображения.
 * @param {function} props.setSelectedImageId - Обработчик изменения изображения(id).
 * @param {array} props.indexShowHelp - Массив с индексами полей для отображения подсказки.
 * @param {function} props.toggleStateHelpText - Обработчик для показа подсказки поля.
 * @param {function} props.handleFieldChange - Обработчик изменения поля.
 * @param {function} props.setMode - Обработчик изменения режима редактирования.
 * @param {string} props.mode - Режим реактирования.
 * @param {function} props.handleRequest - Функция для удаления статьи.
 * @returns {JSX.Element} - Компонент редактирования/создания фотографий статьи.
 */
const ContentFieldsImages = ({
                                 fields,
                                 images,
                                 selectedImageId,
                                 setSelectedImageId,
                                 handleFieldChange,
                                 indexShowHelp,
                                 toggleStateHelpText,
                                 setMode,
                                 mode,
                                 handleRequest
                             }) => {

    const toggleMode = (type) => {
        switch (type) {
            case 'create':
                setMode('create_image');
                break;
            case 'back':
                setMode('update_images');
                break;
            default:
                setMode('');
                break;
        }
    };

    return (
        <>
            <AdminButton text={'Назад в меню'} handleClick={() => toggleMode()}/>
            {mode === 'create_image'
                ? <WrapperField fields={fields}
                                mode={mode === 'create_image'}
                                handleFieldChange={handleFieldChange}
                                handleCancel={() => toggleMode('back')}
                                handleSave={() => handleRequest()}
                                indexShowHelp={indexShowHelp}
                                toggleStateHelpText={toggleStateHelpText}
                />
                : <AdminButton text={'Добавить фотографию'} type={'archive'} handleClick={() => toggleMode('create')}/>
            }

            {mode === 'update_images' && images.map(image => {
                const editImage = image.id === selectedImageId;
                return (
                    <WrapperField key={image.id}
                                  fields={fields}
                                  dataValues={image}
                                  mode={editImage}
                                  handleFieldChange={handleFieldChange}
                                  handleCancel={editImage ? () => setSelectedImageId(null) : () => setSelectedImageId(image.id)}
                                  handleSave={() => handleRequest()}
                                  handleDelete={() => handleRequest(true, 'image')}
                                  hasDelete={true}
                                  indexShowHelp={indexShowHelp}
                                  toggleStateHelpText={toggleStateHelpText}
                    />
                )
            })}
        </>
    );
};

export default ContentFieldsImages;

/** Компонент для отображения полей для редактирования/создания изображения статьи
 *  @returns {JSX.Element} - Компонент с полями для изображения статьи
 *  */
const WrapperField = ({
                          fields,
                          dataValues,
                          mode,
                          handleFieldChange,
                          handleCancel,
                          handleSave,
                          hasDelete,
                          handleDelete,
                          indexShowHelp,
                          toggleStateHelpText
                      }) => (
    <div className={`${stylesFontT.newRoman400} ${styles.wrapperRowField}`}>
        {fields && fields.map((field, i) => {
            return <div key={`${field.name}_${i}`} className={`${stylesFontT.newRoman400} ${styles.wrapperRowField}`}>
                <div className={`${styles.rowField}`}>
                    <div className={styles.boxValue}>
                        <Image alt={'?'} src={iconQuestion}
                               onClick={() => toggleStateHelpText(dataValues ? `${dataValues.id}_${i}` : i)}
                               className={styles.icon}/>
                        <p className={styles.label}>{field.label}</p>
                    </div>
                    {mode
                        ? field.type === 'file'
                            ? <FileField field={field} onChange={handleFieldChange}/>
                            : <InputField field={field} onChange={handleFieldChange}/>
                        : field.type === 'file'
                            ? <ClassicFieldImage
                                field={{value: getFullPathImage(dataValues.image_path, dataValues.image_name)}}/>
                            : <p className={styles.text}>{dataValues.image_priority}</p>
                    }
                </div>
                {mode && field.errorText &&
                <p className={`${stylesFontI.Inter300} ${styles.errorText}`}>
                    {field.errorText || 'Ошибка'}
                </p>}
                {indexShowHelp.includes(dataValues ? `${dataValues.id}_${i}` : i) &&
                <p className={`${stylesFontI.Inter300} ${styles.helpText}`}>
                    {field.helpText}
                </p>}
            </div>
        })}

        <div className={styles.wrapperBtns}>
            <AdminButton text={mode ? 'Отмена' : 'Изменить'} handleClick={handleCancel} type={'archive'}/>
            {mode && <AdminButton text={'Сохранить'} type={'save'} handleClick={handleSave}/>}
            {mode && hasDelete && <AdminButton text={'Удалить'} type={'delete'} handleClick={handleDelete}/>}
        </div>
    </div>
);