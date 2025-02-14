import React from 'react';

import {InputField, InputFieldCheckbox} from "../../ui/fields/fields";

import styles from "./ButtonCallBack.module.css";
import stylesFont from "../../../styles/fonts/timesNewRoman.module.css";

/**
 * Компонент для отображения кнопки или формы для обратного звонка.
 * @param {Object} props - Пропсы компонента.
 * @param {Function} props.toggleCallBackForm - Функция для переключения между кнопкой и формой.
 * @param {Object} props.buttonState - Состояние кнопки/формы.
 * @param {Array} props.fields - Список полей.
 * @param {Function} props.handleFieldsChange - Функция для изменения поля.
 * @param {Boolean} props.hasFieldsError - Есть ли ошибки в полях.
 * @param {Function} props.handleSubmitCallBack - Функция для отправки формы.
 * @returns {JSX.Element} - Компонент кнопки/формы.
 */
const ContentButtonCallBack = ({
                                   toggleCallBackForm,
                                   buttonState,
                                   fields,
                                   handleFieldsChange,
                                   hasFieldsError,
                                   handleSubmitCallBack
                               }) => {
    return (
        <>
            <div
                onClick={toggleCallBackForm}
                className={`${stylesFont.newRoman400} ${styles.startBtn} 
                    ${buttonState.isButton ? styles.startBtnExpanded : ""} 
                    ${buttonState.hiddenButton ? styles.hidden : ""}`}
            >
                Заказать звонок
            </div>

            <div
                className={`${stylesFont.newRoman400} ${styles.formStart} 
                    ${!buttonState.isButton && buttonState.hiddenButton ? styles.startFormExpanded : ""} 
                    ${!buttonState.hiddenButton ? styles.hidden : ""}`}
            >
                <p className={styles.title}>Заявка на обратный звонок</p>

                {fields.map((field, i) => {
                    if (field.type !== 'checkbox') {
                        return (
                            <InputField
                                key={i}
                                field={field}
                                onChange={handleFieldsChange}
                                styleCustom={styles.iptText}
                            />
                        );
                    } else {
                        return (
                            <InputFieldCheckbox
                                key={i}
                                field={field}
                                onChange={handleFieldsChange}
                                styleCustom={styles.label}
                            />
                        );
                    }
                })}
                <button onClick={toggleCallBackForm}>Передумал(a)</button>
                <button disabled={hasFieldsError} onClick={handleSubmitCallBack}>
                    Отправить
                </button>
            </div>
        </>
    );
};

export default React.memo(ContentButtonCallBack);