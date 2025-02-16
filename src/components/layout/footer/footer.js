"use client";

import React, {useEffect, useMemo, useState} from "react";
import {usePathname} from "next/navigation";

import {
    AllHotels,
    Catalog,
    CompanyInfoAndSocial,
    Contacts,
} from "./footerContent.jsx";

import {hotels} from '../../../services/api.js';

import {checkAdminPath} from "../../../utils/admin/checkAdminPath";

import {DEFAULT_CONTACTS} from "../../../config/envData";

import styles from "./footer.module.css";
import {getContactsHotel} from "../../../utils/getContactsHotel";

/**
 * Компонент футера.
 * @returns {JSX.Element} - Футер сайта.
 */
const Footer = () => {
    const pathname = usePathname();
    const isAdminPage = checkAdminPath(pathname);

    const currentPath = useMemo(() => {
        const parts = pathname.split('/');
        return parts.length > 2 ? `/${parts[1]}` : pathname;
    }, [pathname]);

    const [contactsData, setContactsData] = useState(null);

    useEffect(() => {
        getContactsHotel(setContactsData);
    }, []);

    if (isAdminPage) return null;

    if (!contactsData) return null;

    return (
        <section className={styles.main}>
            <div className={styles.firstContainer}>
                <Catalog currentPath={currentPath}/>
                <AllHotels/>
                <Contacts contactsData={contactsData}/>
            </div>

            <CompanyInfoAndSocial contactsData={contactsData}/>
        </section>
    );
};

export default Footer;
