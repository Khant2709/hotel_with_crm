import React from "react";

import WrapperArticles from "../../particles/pageBlog/wrapperArticles";
import {getDataToPage} from "../../particles/pageBlog/getDataToPage";

import HeaderLine from "../../components/ui/headerLine/headerLine";
import ErrorResponseData from "../../components/ui/error/errorResponseData/errorResponseData";

import {metaDataBlogPage} from "../../data/metaData";
import {jsonLDBlogPage} from "../../data/seoData";


export const metadata = metaDataBlogPage;

const BlogPage = async () => {
    const {response: articlesData, error} = await getDataToPage();

    if (error) {
        return <ErrorResponseData
            hasHeaderLine={true}
            page={"Blog"}
            error={error}
            text={"Произошла ошибка, не уалось загрузить информацию."}
        />
    }

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLDBlogPage)}}
            />
            <HeaderLine/>
            <WrapperArticles ssrData={articlesData}/>
        </>
    );
};

export default BlogPage;
