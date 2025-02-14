import React from "react";

import {jsonLDMainPage} from "../data/seoData";
import {metaDataMainPage} from "../data/metaData";

import {getDataToPage} from "../particles/mainPage/getDataToPage";
import WrapperMainPage from "../particles/mainPage/wrapperMainPage";
import ErrorResponseData from "../components/ui/error/errorResponseData/errorResponseData";


export const metadata = metaDataMainPage;

export default async function Home() {
    const {hotelsData, faqData} = await getDataToPage();

    const checkHotelData = hotelsData && hotelsData.status === 200 && hotelsData.data.length > 0;

    if (!checkHotelData) {
        return <ErrorResponseData
            hasHeaderLine={true}
            page={"Main page"}
            error={hotelsData}
            text={"Произошла ошибка, не уалось загрузить информацию."}
        />
    }

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLDMainPage)}}
            />
            <WrapperMainPage ssrData={{hotelsData: hotelsData.data, faqData: faqData.data}}/>
        </>
    );
}
