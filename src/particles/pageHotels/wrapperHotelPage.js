'use client'

import React, {useCallback, useEffect, useState} from 'react';
import {useRouter} from "next/navigation";

import BannerComponent from "./bannerComponent/bannerComponent";
import AllHotelsContent from "../../components/ui/componentHotels/componentsHotels";

import {getDataToPage} from "./getDataToPage";
import {useWindowWidth} from "../../hooks/UseWidth";
import {notifyShowToast} from "../../utils/showToast";

import {BASE_URL_IMAGES} from "../../config/envData";

import defaultBanner from "../../../public/bannerHotels.webp";

import styles from "./wrapperHotelPage.module.css";

/** Функция для получения данных для страницы
 * @param {function} setCurrentData - обработчик данных
 * */
const getFreshData = async (setCurrentData) => {
    const {hotelsData, bannerData} = await getDataToPage();

    if ((hotelsData && hotelsData.status === 200) && (bannerData && bannerData.status === 200)) {
        setCurrentData({hotelsData: hotelsData.data, bannerData: bannerData.data[0]});
    } else {
        notifyShowToast('error', 'Произошла ошибка при обновлении данных, пожалуйста перезагрузите страницу или зайдите позднее.');
    }
};


/**
 * Компонент обертка страницы Отели.
 * @param {Object} props - Пропсы компонента.
 * @param {Object} props.ssrData - Данные отелей и банера полученные с сервера.
 * @returns {JSX.Element} - Компонент страницы Отели.
 */
const WrapperHotelPage = ({ssrData}) => {
    const width = useWindowWidth();
    const router = useRouter();

    const [currentData, setCurrentData] = useState(ssrData);
    const [bannerParams, setBannerParams] = useState({width: "1920", height: "960"});

    /** Обновляем данные (вдруг были изменения в админке)*/
    useEffect(() => {
        getFreshData(setCurrentData);

    }, [])

    /** Изменение разрешения картинки для компонента Image (width, height - обязательные поля)*/
    useEffect(() => {
        if (width) {
            switch (width) {
                case width <= 1100 && width >= 600:
                    setBannerParams({width: "768", height: "640"});
                    break;
                case width < 600:
                    setBannerParams({width: "480", height: "480"});
                    break;
                default:
                    setBannerParams({width: "1920", height: "960"});
                    break;

            }
        }
    }, [width]);


    const banner = currentData?.bannerData
        ? `${BASE_URL_IMAGES}${currentData.bannerData?.image_path}/${currentData.bannerData?.image_name}`
        : defaultBanner
    ;

    /** Функция перенаправляет на выбранный отель*/
    const redirectToHotel = useCallback((link) => router.push(link), [router]);

    return (
        <main className={styles.main}>
            <BannerComponent banner={banner} bannerParams={bannerParams}/>
            {width &&
            <AllHotelsContent allHotel={currentData.hotelsData} redirectToHotel={redirectToHotel} width={width}/>}
        </main>
    );
};

export default WrapperHotelPage;