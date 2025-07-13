import React from "react";

import HeaderLine from "../../components/ui/headerLine/headerLine";
import WrapperFaq from "../../components/ui/componentFaq/wrapperFaq/wrapperFaq";
import ErrorResponseData from "../../components/ui/error/errorResponseData/errorResponseData";

import {singleRequest} from "../../services/utils/requestUtils";
import {faqAPI} from "../../services/api";

import {metaDataQuestionPage} from "../../data/metaData";
import {jsonLDQuestionPage} from "../../data/seoData";
import {TIME_CASH} from "../../config/envData";

export const metadata = metaDataQuestionPage;


/** Основной (серверный компонент) страницы faq */
async function fetchData() {
    return await singleRequest(() => faqAPI.getFAQ(null, null, TIME_CASH["60min"]));
}

export default async function QuestionsPage() {
    const {data, error} = await fetchData();

    if (error) {
        return <ErrorResponseData
            hasHeaderLine={true}
            page={"FAQ"}
            error={error}
            text={"Произошла ошибка, не уалось загрузить информацию."}
        />
    }

    const faq = data?.data;
    const jsonData = jsonLDQuestionPage(faq);

    return (
        <>
            <script type="application/ld+json"
                    dangerouslySetInnerHTML={{__html: JSON.stringify(jsonData)}}
            />
            <div style={{minHeight: '60vh'}}>
                <HeaderLine/>
                <WrapperFaq faq={faq} hasSlice={false}/>
            </div>
        </>
    );
}

export const revalidate = TIME_CASH["60min"] / 1000;
