'use client'

import React, {useCallback} from 'react';
import {useRouter} from "next/navigation";

import ContentArticles from "./contentArticles/contentArticles";

const WrapperArticles = ({articles}) => {
    const router = useRouter();

    const handleClick = useCallback((id) => {
        router.push(`/blog/${id}`)
    }, [router])

    return (
        <ContentArticles articles={articles} handleClick={handleClick}/>
    );
};

export default WrapperArticles;