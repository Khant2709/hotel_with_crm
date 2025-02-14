'use client'

import React, {useCallback, useEffect, useState} from 'react';
import {getDataToPage} from "./getDataToPage";
import {notifyShowToast} from "../../utils/showToast";
import ContentArticles from "./contentArticles/contentArticles";
import {useRouter} from "next/navigation";

const WrapperArticles = ({ssrData}) => {
    const router = useRouter();
    const [articles, setArticles] = useState(ssrData);


    useEffect(() => {
        getDataToPage()
            .then((res) => {
                setArticles(res.response)
            })
            .catch(err => {
                console.debug(`! Error in page: WRAPPER_ARTICLE. Some error: ${err}`);
                notifyShowToast('error', 'Произошла ошибка при обновлении данных, пожалуйста перезагрузите страницу или зайдите позднее.');
            })
    }, [])

    const handleClick = useCallback((id) => {
        router.push(`/blog/${id}`)
    }, [router])

    return (
        <ContentArticles articles={articles} handleClick={handleClick}/>
    );
};

export default WrapperArticles;