'use client'

import React from 'react';
import {useRouter} from "next/navigation";

import ContentDocPage from "../../../particles/admin/doc/contentDocPage/contentDocPage";

import {useRedirectAdmin} from "../../../hooks/useRedirectAdmin";

const DocAdminPage = () => {
    useRedirectAdmin();
    const router = useRouter();

    const openPage = (link) => {
        router.push(`doc/${link}`)
    }

    return (
        <ContentDocPage openPage={openPage}/>
    );
};

export default DocAdminPage;