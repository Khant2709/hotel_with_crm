'use client'

import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {usePathname, useRouter} from "next/navigation";

import ContentDesktop from "./contentDesktop";

import {usePreloaderAdmin} from "../../../hooks/usePreloaderAdmin";
import {notifyShowToast} from "../../../utils/showToast";

import {logout} from "../../../services/authService";
import {singleRequest} from "../../../services/utils/requestUtils";
import {auth} from "../../../services/api";

import {navbarAdmin} from "../../../data/navbarAdmin";


/** Компонент боковой навигации в админке.*/
const NavbarAdmin = ({width, handleToggleNav, isHiddenNav}) => {
    const router = useRouter();
    const pathName = usePathname();
    const {setToggleStatePreloader} = usePreloaderAdmin();

    const [admin, setAdmin] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const result = await singleRequest(() => auth.validateToken());

            if (result.error) {
                notifyShowToast('error', result.error || 'Ваши данные админестратора не получены.');
                return;
            }

            const adminData = result.data?.data;
            setAdmin(adminData);
        };

        fetchData()
    }, []);

    const filteredNavbar = useMemo(() => {
        if (admin && admin?.role && admin.role === 'boss') {
            return navbarAdmin;
        } else {
            return navbarAdmin.filter(el => !el.isBoss)
        }
    }, [admin])

    const currentPath = useMemo(() => {
        const path = pathName.split('/');
        if (path[2] === 'hotel' || path[2] === 'booking') {
            return `${path[2]}/${path[3]}`
        } else {
            return path[2];
        }
    }, [pathName, router]);

    const changePageAdmin = useCallback((link) => {
        if (`/admincrm/${currentPath}` === link) {
            // location.reload();
            return;
        }

        setToggleStatePreloader(true);
        router.push(link);
    }, [setToggleStatePreloader, router, currentPath]);

    return (
        <ContentDesktop
            navbarAdmin={filteredNavbar}
            currentPath={currentPath}
            changePageAdmin={changePageAdmin}
            logout={() => logout(admin.id, router)}
            width={width}
            handleToggleNav={handleToggleNav}
            isHiddenNav={isHiddenNav}
        />
    );
};

export default NavbarAdmin;