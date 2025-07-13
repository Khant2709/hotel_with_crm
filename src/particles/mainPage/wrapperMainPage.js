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

const WrapperMainPage = ({banner, territoryImages, allHotels, faq}) => {
    const width = useWindowWidth();
    if (!width) {
        return <Preloader/>
    }

    return (
        <main className={styles.main}>
            <WrapperBanner hotels={allHotels} width={width} banner={banner}/>
            <div className={styles.wrapperForm}>
                <FormSearchDate/>
            </div>
            <ContentHotelInfo hotels={allHotels} width={width}/>
            <ContentConveniences/>
            <ComponentImages width={width} territoryImages={territoryImages}/>
            {/*<WrapperFaq faq={faq} hasSlice={true}/>*/}
        </main>
    );
};

export default WrapperMainPage;