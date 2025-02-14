'use client'

import React from 'react';
import {usePathname} from "next/navigation";

import HeaderBurger from "./headerBurger";
import HeaderMain from "./headerMain";

import {checkAdminPath} from "../../../utils/admin/checkAdminPath";

import navbar from "../../../data/navbar";

import styles from './header.module.css';

/**
 * Компонент хедера.
 * @returns {JSX.Element} - Футер сайта.
 */
const Header = () => {
    const pathname = usePathname();
    const isAdminPage = checkAdminPath(pathname);
    if (isAdminPage) return null;

    return (
        <>
            <section className={styles.wrapperHeader}>
                <div className={styles.wrapperHeaderMain}>
                    <HeaderMain navbar={navbar}/>
                </div>
                <div className={styles.wrapperHeaderBurger}>
                    <HeaderBurger navbar={navbar}/>
                </div>
            </section>
        </>
    );
};

export default Header;