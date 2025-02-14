'use client'

import React, {useEffect, useState} from 'react';

import WrapperBanner from "./banerComponent/wrapperBanner";
import ContentHotelInfo from "./hotelsInformationComponent/contentHotelInfo";
import ComponentImages from "./imagesComponent/componentImages";
import ContentConveniences from "./conveniencesComponent/contentConveniences";

import Preloader from "../../components/ui/preloader/preloader";
import FormSearchDate from "../../components/ui/formSerchDate/formSearchDate";
import WrapperFaq from "../../components/ui/componentFaq/wrapperFaq/wrapperFaq";

import {getDataToPage} from "./getDataToPage";

import {notifyShowToast} from "../../utils/showToast";

import {useWindowWidth} from "../../hooks/UseWidth";

import styles from "./wrapperMainPage.module.css";

const checkData = (response) => {
    return !response || response.length === 0
}

const WrapperMainPage = ({ssrData}) => {
    const width = useWindowWidth();

    const [data, setData] = useState(ssrData)

    useEffect(() => {
        getDataToPage()
            .then(res => {
                const {hotelsData, faqData} = res;

                const checkHotelData = checkData(hotelsData?.data);
                const checkFaqData = checkData(faqData?.data);

                if (!checkHotelData || !checkFaqData) {
                    setData({hotelsData: hotelsData.data, faqData: faqData.data})
                } else {
                    throw new Error('Произоша ошибка в обновлении данных');
                }
            })
            .catch(err => {
                console.debug('!Main page: something error: ', err);
                notifyShowToast('error', 'Произошла ошибка при обновлении данных, пожалуйста перезагрузите страницу или зайдите позднее.');
            })
    }, [])

    const hotels = data.hotelsData;

    if (!width) {
        return <Preloader/>
    }

    return (
        <main className={styles.main}>
            <WrapperBanner hotels={hotels} width={width}/>
            <div className={styles.wrapperForm}>
                <FormSearchDate/>
            </div>
            <ContentHotelInfo hotels={hotels} width={width}/>
            <ContentConveniences/>
            <ComponentImages width={width}/>
            <WrapperFaq ssrData={{faqData: data.faqData}} hasSlice={true}/>
        </main>
    );
};

export default WrapperMainPage;