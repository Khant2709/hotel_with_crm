'use client'

import React from 'react';

import WrapperBanner from "./banerComponent/wrapperBanner";
import ContentHotelInfo from "./hotelsInformationComponent/contentHotelInfo";
import ComponentImages from "./imagesComponent/componentImages";
import ContentConveniences from "./conveniencesComponent/contentConveniences";

import Preloader from "../../components/ui/preloader/preloader";
import FormSearchDate from "../../components/ui/formSerchDate/formSearchDate";
import WrapperFaq from "../../components/ui/componentFaq/wrapperFaq/wrapperFaq";

import {useWindowWidth} from "../../hooks/UseWidth";

import styles from "./wrapperMainPage.module.css";

const WrapperMainPage = ({ssrData}) => {
    const width = useWindowWidth();

    const hotels = ssrData.hotelsData;

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
            <WrapperFaq ssrData={{faqData: ssrData.faqData}} hasSlice={true}/>
        </main>
    );
};

export default WrapperMainPage;