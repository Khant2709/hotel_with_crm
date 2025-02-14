'use client'

import React, {useMemo} from 'react';
import Link from "next/link";
import {usePathname} from "next/navigation";

import styles from "./headerMain.module.css";
import stylesFontsI from "../../../styles/fonts/inter.module.css";

/**
 * Компонент хедера в десктопной версии.
 *  @param {Object} props - Пропсы компонента.
 * @param {array} props.navbar - Список навигации по страницам.
 * @returns {JSX.Element} - Хедер десктоп версия.
 */
const HeaderMain = ({navbar}) => {
    const pathname = usePathname();
    const currentPath = useMemo(() => {
        const splitPath = pathname.split('/');
        return splitPath.length > 2 ? `/${splitPath[1]}` : pathname;
    }, [pathname]);

    return (
        <div className={`${stylesFontsI.Inter300} ${styles.containerHeader}`}>
            {navbar.map(el => {
                return <Link key={el.id}
                             href={el.link}
                             className={`${el.link === currentPath && stylesFontsI.Inter700} ${styles.link}`}>
                    {el.textRu}
                </Link>
            })}
        </div>
    );
};

export default HeaderMain;