'use client'

import React, {useEffect, useState} from 'react';

import ContentContacts from "./contentContacts/contentContacts";

import {getDataToPage} from "./getDataToPage";
import {notifyShowToast} from "../../utils/showToast";

import {useWindowWidth} from "../../hooks/UseWidth";

/** Функция для получения данных для страницы
 * @param {function} setCurrentData - обработчик данных
 * */
const getFreshData = async (setCurrentData) => {
    const {hotelsData, currentHotelData} = await getDataToPage();

    if ((hotelsData && hotelsData.status === 200) && (currentHotelData && currentHotelData.status === 200)) {
        setCurrentData({hotelsData: hotelsData.data, currentHotelData: currentHotelData.data});
    } else {
        notifyShowToast('error', 'Произошла ошибка при обновлении данных, пожалуйста перезагрузите страницу или зайдите позднее.');
    }
};

/** Компонент обертка для страницы контактов
 * @param {object} props - Пропсы компонента.
 * @param {object} props.ssrData - Начальные данные полученные при серверном рендере.
 * @returns {JSX.Element} - Компонент страницы контактов.
 * */
const WrapperContactsPage = ({ssrData}) => {
    const width = useWindowWidth();
    const [currentData, setCurrentData] = useState(ssrData);
    const {hotelsData, currentHotelData} = currentData;

    /** Обновляем данные (вдруг были изменения в админке)*/
    useEffect(() => {
        getFreshData(setCurrentData);
    }, [])

    return (
        <ContentContacts width={width} textConclusion={currentHotelData?.hotel?.text_conclusion} hotelsData={hotelsData}/>
    );
};

export default WrapperContactsPage;