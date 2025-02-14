'use client'

import React, {useCallback, useMemo} from 'react';
import {usePathname, useRouter} from "next/navigation";

import ContentDesktop from "./contentDesktop";

import {usePreloaderAdmin} from "../../../hooks/usePreloaderAdmin";

import {logout} from "../../../services/authService";

import {navbarAdmin} from "../../../data/navbarAdmin";

/**
 * Компонент боковой навигации в админке.
 * @returns {JSX.Element} - Футер сайта.
 */
const NavbarAdmin = () => {
    const router = useRouter();
    const pathName = usePathname();
    const {setToggleStatePreloader} = usePreloaderAdmin();

    const currentPath = useMemo(() => {
        const splitPath = pathName.split('/');
        switch (splitPath[2]) {
            case 'hotel':
            case 'booking':
                return `/${splitPath[2]}/${splitPath[3]}`;
            default:
                return `/${splitPath[2]}`;
        }
    }, [pathName]);


    const changePageAdmin = useCallback((link) => {
        setToggleStatePreloader(true);
        router.push(link);
    }, [setToggleStatePreloader, router]);

    return (
        <ContentDesktop navbarAdmin={navbarAdmin}
                        currentPath={currentPath}
                        changePageAdmin={changePageAdmin}
                        logout={() => logout(1, router)}
        />
    );
};

export default NavbarAdmin;