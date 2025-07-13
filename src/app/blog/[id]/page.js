import React from 'react';

import ContentArticle from "../../../particles/pageCurrentArticle/contentArticle";

import HeaderLine from "../../../components/ui/headerLine/headerLine";
import ErrorResponseData from "../../../components/ui/error/errorResponseData/errorResponseData";

import {singleRequest} from "../../../services/utils/requestUtils";
import {articlesAPI} from "../../../services/api";

import {getFullPathImage} from "../../../utils/getFullPathImage";

import {jsonLDCurrentArticlePage} from "../../../data/seoData";
import {metaDataCurrentArticle} from "../../../data/metaData";
import {TIME_CASH} from "../../../config/envData";


async function fetchData(id) {
    return await singleRequest(() => articlesAPI.getCurrentArticle(id, TIME_CASH["60min"]));
}

export async function generateMetadata({params: {id}}) {
    const result = await fetchData(id);
    const article = result.data.data;
    const urlPreview = getFullPathImage(article.folder_img, article.preview_img_name);
    return metaDataCurrentArticle({
        id,
        title: article.title,
        description: article.short_text,
        urlPreview
    })
}

const CurrentArticlePage = async ({params: {id}}) => {
    const {data, error} = await fetchData(id);

    if (error) {
        return <ErrorResponseData
            hasHeaderLine={true}
            page={"Current Article"}
            error={error}
            text={"Произошла ошибка, не уалось данные статьи."}
        />
    }

    const article = data.data;
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLDCurrentArticlePage(article))}}
            />
            <HeaderLine/>
            <ContentArticle article={article}/>
        </>
    );
};

export default CurrentArticlePage;

export const revalidate = TIME_CASH["60min"] / 1000;