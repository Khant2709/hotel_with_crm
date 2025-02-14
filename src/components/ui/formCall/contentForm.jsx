import React from 'react';

import Button from "../buttons/button/button";

import {formatPhoneNumber} from "../../../utils/mask/transfomNumber";

import styles from "./formCall.module.css";
import stylesFontsT from "../../../styles/fonts/timesNewRoman.module.css";

/**
 * (Глупый) Компонент для отображения формы обратного звонка.
 * @param {Object} props - Пропсы компонента.
 * @param {Array} props.fields - Массив полей формы.
 * @param {Function} props.onInputChange - Обработчик изменения значений в полях.
 * @param {string} props.numberHotel - Номер отеля.
 * @param {Function} props.onCallBackRequest - Обработчик отправки формы.
 * @param {boolean} props.checkFields - Флаг, указывающий на наличие ошибок в полях.
 * @param {string} props.textBtn - Текст кнопки отправки формы.
 * @returns {JSX.Element} - Возвращает JSX элемент формы.
 */
const ContentForm = ({
                         fields,
                         onInputChange,
                         numberHotel,
                         onCallBackRequest,
                         checkFields,
                         textBtn
                     }) => (
    <>
        <p className={styles.title}>Обратный звонок</p>
        {fields.map((field) => (
            <React.Fragment key={field.name}>
                {field.type !== "checkbox" ? (
                    <input
                        name={field.name}
                        placeholder={field.placeholder}
                        value={field.name === 'phone' ? formatPhoneNumber(field.value) : field.value}
                        onChange={onInputChange}
                        className={`${stylesFontsT.newRoman400} ${styles.inp}`}
                    />
                ) : (
                    <div className={styles.containerCheckbox}>
                        <input
                            name={field.name}
                            type="checkbox"
                            checked={field.value}
                            onChange={onInputChange}
                        />
                        <p>
                            Соглашаюсь с правилами <span>политики конфиденциальности</span>
                        </p>
                    </div>
                )}
                {field?.errorText && <p className={styles.errorText}>{field.errorText}</p>}
            </React.Fragment>
        ))}
        <Button
            text={textBtn}
            hotel={numberHotel}
            disabled={checkFields}
            handleClick={onCallBackRequest}
        />
    </>
);

export default React.memo(ContentForm);