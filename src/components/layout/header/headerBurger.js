'use client'

import React, {useEffect, useMemo, useState} from 'react';
import {usePathname} from "next/navigation";

import {ContainerBurger, ContentBurgerMenu} from "./contentBurgerMenu";

import {getContactsHotel} from "../../../utils/getContactsHotel";

/**
 * Компонент хедера в мобильной версии.
 *  @param {Object} props - Пропсы компонента.
 * @param {array} props.navbar - Список навигации по страницам.
 * @returns {JSX.Element} - Хедер мобильная версия.
 */
const HeaderBurger = ({navbar}) => {
    const pathname = usePathname();
    const currentPath = useMemo(() => {
        const splitPath = pathname.split('/');
        return splitPath.length > 2 ? `/${splitPath[1]}` : pathname;
    }, [pathname]);

    const [showBurgerMenu, setShowBurgerMenu] = useState(true);
    const [showContainerHeader, setShowContainerHeader] = useState(true);
    const [contactsData, setContactsData] = useState(null);

    useEffect(() => {
        getContactsHotel(setContactsData);
    }, [])

    const toggleBurgerMenu = () => {
        setShowContainerHeader(!showContainerHeader);
        setTimeout(() => {
            setShowBurgerMenu(!showBurgerMenu);
        }, 500)
    }

    if (!contactsData) return null;

    if (showBurgerMenu) {
        return <ContentBurgerMenu toggleBurgerMenu={toggleBurgerMenu} contactsData={contactsData}/>
    }

    return (
        <ContainerBurger showContainerHeader={showContainerHeader}
                         toggleBurgerMenu={toggleBurgerMenu}
                         currentPath={currentPath}
                         navbar={navbar}
                         contactsData={contactsData}
        />
    );
};

export default HeaderBurger;
