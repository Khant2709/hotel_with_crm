'use client'

import React from 'react';
import Link from "next/link";
import {usePathname} from "next/navigation";

import {checkAdminPath} from "../../../utils/admin/checkAdminPath";
import {useWindowWidth} from "../../../hooks/UseWidth";

import styles from "./myFooter.module.css";
import stylesFonts from "../../../styles/fonts/timesNewRoman.module.css";

/**  Компонент мини-футера (данные разработчика + полит. конфеденц.). */
const MyFooter = () => {
    const pathname = usePathname();
    const isAdminPage = checkAdminPath(pathname);
    const width = useWindowWidth();
    if (isAdminPage || !width) return null;

    return (
        <section className={`${stylesFonts.newRoman400} ${styles.main}`}>
            <p>&#169; 2023 Профессиональная веб-разработка от:
                <a href={'mailto:Khant2709@gmail.com'}
                   target={'_blank'}
                   rel="noopener noreferrer"
                > @Vladislav
                </a>
            </p>
            <Link href={'/privacy'}>
                политика конфиденциальности
            </Link>
        </section>
    );
};

export default MyFooter;