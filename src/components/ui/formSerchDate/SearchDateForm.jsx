import React from "react";

import Button from "../../ui/buttons/button/button";

import {HOTEL_TYPE} from "../../../config/envData";

import styles from "./formSerchDate.module.css";
import stylesFontsT from "../../../styles/fonts/timesNewRoman.module.css";

/**
 * Глупый компонент для отображения формы поиска апартаментов.
 *
 * @param {Array} formFields - Поля формы.
 * @param {Function} onSearch - Обработчик поиска.
 * @param {string} [errorMessage] - Сообщение об ошибке.
 * @returns {JSX.Element} - Форма поиска апартаментов.
 */
const SearchDateForm = ({
                            formFields,
                            onSearch,
                            errorMessage,
                        }) => {
    return (
        <div className={styles.containerReservation}>
            <div className={styles.wrapperFilter}>
                {formFields.map((field, index) => {
                    return (
                        <div className={styles.wrapper} key={index}>
                            {field.type === "date" && <ComponentDate field={field}/>}

                            {field.type === "select" && <ComponentSelect field={field}/>}
                        </div>
                    );
                })}
            </div>
            <Button
                text={"Поиск"}
                hotel={HOTEL_TYPE}
                handleClick={onSearch}
                disabled={errorMessage}
            />
            <p className={`${stylesFontsT.newRoman400} ${styles.error}`}>
                {errorMessage}
            </p>
        </div>
    );
};

export default React.memo(SearchDateForm);


/**
 * Компонент для отображения поля ввода даты.
 * @param {Object} props - Пропсы компонента.
 * @param {Object} props.field - Данные поля.
 * @returns {JSX.Element} - Поле ввода даты.
 */
const ComponentDate = ({field}) => (
    <>
        <label
            htmlFor={field.name}
            className={stylesFontsT.newRoman400}
            style={{color: `${field.colorLabel}`}}
        >
            {field.label}
        </label>
        <input
            name={field.name}
            type={field.type}
            value={field.value}
            onChange={field.onChange}
            style={field.colorBorder}
            className={`${stylesFontsT.newRoman400} ${styles.testInp}`}
        />
    </>
);

/**
 * Компонент для отображения выпадающего списка.
 * @param {Object} props - Пропсы компонента.
 * @param {Object} props.field - Данные поля.
 * @returns {JSX.Element} - Выпадающий список.
 */
const ComponentSelect = ({field}) => (
    <>
        <label
            htmlFor={field.name}
            className={stylesFontsT.newRoman400}
            style={{color: `${field.colorLabel}`}}
        >
            {field.label}
        </label>
        <select
            name={field.name}
            value={field.value}
            onChange={field.onChange}
            style={field.colorBorder}
            className={stylesFontsT.newRoman400}
        >
            <option value={0}>Выбрать</option>
            {[...Array(field.maxValue)].map((_, index) => (
                <option key={index + 1} value={index + 1}>
                    {index + 1}
                </option>
            ))}
        </select>
    </>
);