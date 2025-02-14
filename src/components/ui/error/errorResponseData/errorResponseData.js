'use client'

import React, {useEffect} from 'react';
import {usePreloader} from "../../../../hooks/usePreloader";
import HeaderLine from "../../headerLine/headerLine";

import styles from './errorResponseData.module.css';
import stylesFontT from '../../../../styles/fonts/timesNewRoman.module.css';

/**
 * Компонент для отображения сообщения об ошибке при загрузке данных c сервера.
 *
 * @param {Object} props - Пропсы компонента.
 * @param {string} props.page - Название страницы, на которой произошла ошибка.
 * @param {Error | null} props.error - Объект ошибки. Может быть null или undefined.
 * @param {string} props.text - Текст сообщения об ошибке. Обязательное поле.
 * @param {boolean} props.hasHeaderLine - Нужно ли отображать линию для хедера.
 * @param {string} props.hasHeaderLine - Если нужно задать свой стиль окна ошибки.
 * @returns {JSX.Element} - Компонент сообщения об ошибке.
 */
const ErrorResponseData = ({page, error, text, hasHeaderLine, customStyle}) => {
    const {setIsLoading} = usePreloader();

    useEffect(() => {
        if (error) {
            setIsLoading(false);
            console.debug(`! Error in page: ${page}. Some error: ${error}`);
        }
    }, [page, error, setIsLoading]);

    return (
        <div className={`${stylesFontT.newRoman400} ${styles.window} ${customStyle}`}>
            {hasHeaderLine && <HeaderLine color={"black"}/>}
            <div className={styles.containerError}>
                <p>{text}</p>
                <p>Попробуйте перезагрузить страницу позже.</p>
            </div>
        </div>
    );
};

export default ErrorResponseData;