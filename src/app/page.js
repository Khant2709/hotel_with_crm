import React from "react";

import {jsonLDMainPage} from "../data/seoData";
import {metaDataMainPage} from "../data/metaData";

import WrapperMainPage from "../particles/mainPage/wrapperMainPage";
import ErrorResponseData from "../components/ui/error/errorResponseData/errorResponseData";

import {hotelsAPI, faqAPI} from '../services/api';
import {batchRequest} from "../services/utils/requestUtils";

import {TIME_CASH} from "../config/envData";


export const metadata = metaDataMainPage;

async function fetchData() {
    const data = {
        hotelData: null,
        allHotelsData: null,
        faqData: null,
    };

    const request = [
        () => hotelsAPI.getCurrentHotelData(null, null, TIME_CASH["60min"]),
        () => hotelsAPI.getMainHotelsData(TIME_CASH["60min"]),
        () => faqAPI.getFAQ(null, null, TIME_CASH["60min"])
    ];

    return await batchRequest(data, request);
}

export default async function Home() {
    const {hotelData, allHotelsData, faqData} = await fetchData();

    if (hotelData.status !== 200 || allHotelsData.status !== 200) {
        return <ErrorResponseData
            hasHeaderLine={true}
            page={"Main page"}
            error={hotelData}
            text={"Произошла ошибка, не уалось загрузить информацию."}
        />
    }

    // сделать отображения картинок конкретного отеля в территории после удобств
    const hotel = hotelData.data.data;
    const banner = hotel.images.find(image => image.image_type === "banner");
    const territoryImages = hotel.images.filter(image => image.image_type === "territory");
    const allHotels = allHotelsData.data.data;
    const faq = faqData.data.data;

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLDMainPage)}}
            />
            <WrapperMainPage
                banner={banner}
                territoryImages={territoryImages}
                allHotels={allHotels}
                faq={faq}
            />
        </>
    );
};

export const revalidate = TIME_CASH["60min"] / 1000;