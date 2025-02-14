"use client";

import React, {useEffect, useState, useCallback} from "react";
import {useRouter} from "next/navigation";

import SearchDateForm from "./SearchDateForm";
import {getFormFields} from "./fields";

import {
    getNextDay,
    getToday,
    getDayStartSeason,
    checkDateCorrectness,
} from "../../../utils/getDay";
import {validateDataReservation} from "../../../utils/validate/vaidateFormReservation";

/**
 * Устанавливает начальные данные для формы или использует данные из searchParams.
 *
 * @param {URLSearchParams} [searchParams] - Параметры поиска из URL.
 * @returns {Object} - Начальные данные для формы.
 */
const getInitialReservationData = (searchParams) => {
    const {checkInDate, checkOutDate} = getDayStartSeason();
    const dataCorrectness = checkDateCorrectness();

    return {
        startDate: searchParams?.get("startReservation") || (dataCorrectness ? getToday() : checkInDate),
        endDate: searchParams?.get("endReservation") || (dataCorrectness ? getNextDay() : checkOutDate),
        countAdults: searchParams?.get("countAdults") || 1,
        countChildren: searchParams?.get("countChildren") || 0,
    };
};

/**
 * Умный компонент для управления формой поиска апартаментов.
 *
 * @param {string} [color="black"] - Цвет текста в форме.
 * @param {URLSearchParams} [searchParams] - Параметры поиска из URL.
 * @returns {JSX.Element} - Форма поиска апартаментов.
 */
const FormSearchDate = ({color, searchParams}) => {
    const router = useRouter();
    const colorLabel = color || "black";

    const [dataReservation, setDataReservation] = useState(getInitialReservationData(searchParams));
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        const today = new Date(getToday()).getTime();
        const startDate = new Date(dataReservation.startDate).getTime();
        const endDate = new Date(dataReservation.endDate).getTime();

        if (!isNaN(startDate) && !isNaN(endDate)) {
            const {error, text} = validateDataReservation({today, startDate, endDate});
            setErrorMessage(error ? text : null);
        }
    }, [dataReservation]);

    const searchApartments = () => {
        const {startDate, endDate, countAdults, countChildren} = dataReservation;
        const searchParams = new URLSearchParams();

        searchParams.set("startReservation", startDate);
        searchParams.set("endReservation", endDate);
        searchParams.set("countAdults", countAdults);
        searchParams.set("countChildren", countChildren);
        router.push(`/reservation?${searchParams.toString()}`);
    };

    const handleChange = useCallback((e) => {
        const {name, value} = e.target;
        setDataReservation((prevData) => ({...prevData, [name]: value}));
    }, []);

    const formFields = getFormFields(dataReservation, handleChange, colorLabel);

    return (
        <SearchDateForm
            formFields={formFields}
            onSearch={searchApartments}
            errorMessage={errorMessage}
        />
    );
};

export default FormSearchDate;