import React from 'react';

import {fieldsFilter} from "../fieldsFilter";

import styles from './containerFilters.module.css';
import stylesFont from '../../../../../styles/fonts/timesNewRoman.module.css';

/**
 * Глупый компонент для отображения фильтров.
 * @param {Object} props - Пропсы компонента.
 * @param {Object} props.fieldsValue - Значения фильтров.
 * @param {Function} props.handleInputChange - Обработчик изменения значений фильтров.
 * @param {Object} props.optionsValues - Опции для фильтров.
 * @param {Function} props.clearFilter - Функция для сброса фильтров.
 * @returns {JSX.Element} - Компонент фильтров.
 */
const ContainerFilters = ({fieldsValue, handleInputChange, optionsValues, clearFilter}) => {
    return (
        <div className={styles.containerSearcher}>
            {fieldsFilter.map((field, i) => {
                return <div key={`${field.typeField}_${i}`} className={`${styles.boxField} ${stylesFont.newRoman400}`}>
                    <p>{field.label}</p>
                    {field.typeField === 'input' ? (
                        <input
                            type={field.type}
                            name={field.name}
                            className={stylesFont.newRoman400}
                            placeholder={field.placeholder}
                            onChange={handleInputChange}
                            value={fieldsValue[field.name]}
                        />
                    ) : (
                        <select
                            name={field.name}
                            value={fieldsValue[field.name]}
                            onChange={handleInputChange}
                            className={stylesFont.newRoman400}
                        >
                            <option value={''}>Выбрать</option>
                            {optionsValues[field.optionalType].map(el => {
                                return <option key={el.id} value={el.id}>
                                    {el?.name || el.apartment_name}
                                </option>
                            })}
                        </select>
                    )}
                </div>
            })}
            <button className={styles.btn} onClick={clearFilter}>
                Сбросить фильтры
            </button>
        </div>
    )
        ;
};

export default ContainerFilters;