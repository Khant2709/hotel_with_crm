import React from "react";
import Image from "next/image";

import {
    FileField,
    InputField, SelectField,
    TextAreaField
} from "../../../../../components/ui/admin/fields/fieldsAdmin";

import {AdminButton} from "../../../../../components/ui/admin/buttons/buttons";

import iconQuestion from "../../../../../../public/question.png";

import styles from './contentFields.module.css';
import stylesFontI from "../../../../../styles/fonts/inter.module.css";
import stylesFontT from "../../../../../styles/fonts/timesNewRoman.module.css";

/** Компонент редактирования/создания основной информации статьи.
 * @param {Object} props - Пропсы компонента.
 * @param {array} props.fields - Массив полей.
 * @param {array} props.indexShowHelp - Массив с индексами полей для отображения подсказки.
 * @param {function} props.toggleStateHelpText - Обработчик для показа подсказки поля.
 * @param {function} props.handleFieldChange - Обработчик изменения поля.
 * @param {object} props.currentArticle - Данные статьи.
 * @param {boolean} props.isCreate - Выбран ли режим создания.
 * @param {function} props.handleCancel - Функция для отмены режима редактирования.
 * @param {function} props.handleSave - Функция для сохранения изменений (отправка запроса).
 * @param {function} props.handleDelete - Функция для удаления статьи.
 * @returns {JSX.Element} - Компонент редактирования/создания основной информации статьи.
 */
export const ContentFieldsUpdateOrCreate = ({
                                                fields,
                                                indexShowHelp,
                                                toggleStateHelpText,
                                                handleFieldChange,
                                                currentArticle,
                                                isCreate,
                                                handleCancel,
                                                handleSave,
                                                handleDelete
                                            }) => {
    return (
        <>
            <p className={`${stylesFontT.newRoman700} ${styles.title}`}>{currentArticle?.title || 'Создание статьи'}</p>
            {fields && fields.map((field, i) => {
                return (
                    <div key={i} className={`${stylesFontT.newRoman400} ${styles.wrapperRowField}`}>
                        <div className={styles.rowField}>
                            <div className={styles.boxValue}>
                                <Image alt={'?'} src={iconQuestion}
                                       onClick={() => toggleStateHelpText(i)}
                                       className={styles.icon}/>
                                <p className={styles.label}>{field.label}</p>
                            </div>
                            {field.typeField === 'input' && field.type === 'file' && (
                                <FileField field={field} onChange={handleFieldChange}/>
                            )}
                            {field.typeField === 'input' && field.type !== 'file' && (
                                <InputField field={field} onChange={handleFieldChange}/>
                            )}
                            {field.typeField === 'textarea' && (
                                <TextAreaField field={field} onChange={handleFieldChange}/>
                            )}
                            {field.typeField === 'select' && (
                                <SelectField field={field} onChange={handleFieldChange}/>
                            )}
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
                )
            })}
            <div className={styles.containerBtns}>
                <AdminButton text={'Отмена'} handleClick={handleCancel}/>
                <AdminButton text={'Сохранить'} type={'save'} handleClick={handleSave}/>
                {!isCreate && <AdminButton text={'Удалить'} type={'delete'} handleClick={handleDelete}/>}
            </div>
        </>
    )
};