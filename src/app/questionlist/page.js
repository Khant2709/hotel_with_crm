import React from "react";

import HeaderLine from "../../components/ui/headerLine/headerLine";
import WrapperFaq from "../../components/ui/componentFaq/wrapperFaq/wrapperFaq";
import ErrorResponseData from "../../components/ui/error/errorResponseData/errorResponseData";

import {getDataToPage} from "../../particles/pageFAQ/getDataToPage";

import {metaDataQuestionPage} from "../../data/metaData";
import {jsonLDQuestionPage} from "../../data/seoData";

/** Мета данные страницы faq */
export const metadata = metaDataQuestionPage;

/** Основной (серверный компонент) страницы faq
 * @returns {JSX.Element} - Компонент обернтку страницы faq.
 * */
export default async function QuestionsPage() {
    const {faqData} = await getDataToPage();
    const checkFaqData = faqData && faqData.status === 200 && faqData.data.length > 0;

    if (!checkFaqData) {
        return <ErrorResponseData
            hasHeaderLine={true}
            page={"FAQ"}
            error={faqData}
            text={"Произошла ошибка, не уалось загрузить информацию."}
        />
    }

    const jsonData = jsonLDQuestionPage(faqData?.data || []);

    return (
        <>
            <script type="application/ld+json"
                    dangerouslySetInnerHTML={{__html: JSON.stringify(jsonData)}}
            />
            <div style={{minHeight: '60vh'}}>
                <HeaderLine/>
                <WrapperFaq ssrData={{faqData: faqData.data}} hasSlice={false}/>
            </div>
        </>
    );
}
