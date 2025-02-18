import React from "react";

import {jsonLDMainPage} from "../data/seoData";
import {metaDataMainPage} from "../data/metaData";

import {getDataToPage} from "../particles/mainPage/getDataToPage";
import WrapperMainPage from "../particles/mainPage/wrapperMainPage";
import ErrorResponseData from "../components/ui/error/errorResponseData/errorResponseData";


export const metadata = metaDataMainPage;

async function fetchData() {
    try {
        const {hotelsData, faqData} = await getDataToPage();
        if (!hotelsData || hotelsData.status !== 200 || hotelsData.data.length === 0) throw new Error('Произошла ошибка, не уалось загрузить информацию.');

        return {
            hotelsData: hotelsData || [],
            faqData: faqData || [],
            error: false
        };
    } catch (error) {
        console.error("Ошибка загрузки данных:", error);

        return {
            hotelsData: [],
            faqData: [],
            error: true
        };
    }
}

export default async function Home() {
    const {hotelsData, faqData, error} = await fetchData();

    if (error) {
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
};

export const revalidate = 60;