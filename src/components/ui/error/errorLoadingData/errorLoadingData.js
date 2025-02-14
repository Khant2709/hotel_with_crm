"use client";

import React, {useEffect} from "react";

import {usePreloader} from "../../../../hooks/usePreloader";

import styles from "./errorLoadingData.module.css";
import stylesFont from "../../../../styles/fonts/timesNewRoman.module.css";

/**
 * Компонент для отображения сообщения об ошибке при загрузке данных.
 *
 * @param {Object} props - Пропсы компонента.
 * @param {string} props.page - Название страницы, на которой произошла ошибка.
 * @param {Error | null} props.error - Объект ошибки. Может быть null или undefined.
 * @param {string} props.text - Текст сообщения об ошибке. Обязательное поле.
 * @returns {JSX.Element} - Компонент сообщения об ошибке.
 */
const ErrorLoadingData = ({page, error, text}) => {
    const {setIsLoading} = usePreloader();

    useEffect(() => {
        if (error) {
            setIsLoading(false);
            console.debug(`Ошибка на странице: ${page}`);
            console.debug("Детали ошибки:", error);
        }
    }, [page, error, setIsLoading]);

    return (
        <div className={`${stylesFont.newRoman700} ${styles.errorLoadingData}`}>
            <p>{text}</p>
            <p>Попробуйте перезагрузить страницу позже.</p>
        </div>
    );
};

export default ErrorLoadingData;