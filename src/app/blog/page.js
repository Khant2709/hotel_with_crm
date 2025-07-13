import React from "react";

import WrapperArticles from "../../particles/pageBlog/wrapperArticles";

import HeaderLine from "../../components/ui/headerLine/headerLine";
import ErrorResponseData from "../../components/ui/error/errorResponseData/errorResponseData";

import {singleRequest} from "../../services/utils/requestUtils";
import {articlesAPI} from '../../services/api';

import {metaDataBlogPage} from "../../data/metaData";
import {jsonLDBlogPage} from "../../data/seoData";
import {TIME_CASH} from "../../config/envData";


export const metadata = metaDataBlogPage;

async function fetchData() {
  return await singleRequest(() => articlesAPI.getAllArticles(TIME_CASH["60min"]));
}

const BlogPage = async () => {
  const {data, error} = await fetchData();

  if (error) {
    return <ErrorResponseData
        hasHeaderLine={true}
        page={"Blog"}
        error={error}
        text={"Произошла ошибка, не уалось загрузить статьи."}
    />
  }

  const articles = data.data;
  return (
      <>
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLDBlogPage(articles))}}
        />
        <HeaderLine/>
        <WrapperArticles articles={articles}/>
      </>
  );
};

export default BlogPage;

export const revalidate = TIME_CASH["60min"] / 1000;