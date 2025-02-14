import React from 'react';

import {PreloaderAdminProvider} from "../../hooks/usePreloaderAdmin";

import NavbarAdmin from "../../components/layout/navbarAdmin/navbarAdmin";
import PreloaderAdmin from "../../components/ui/preloader/preloaderAdmin";

import styles from '../../styles/pageAdmin/adminLayout.module.css';
import {HotelsAndApartmentsProvider} from "../../hooks/useGetDataHotelsAndApartments";

export default function AdminLayout({children}) {
    return (
        <section className={styles.wrapperDashboard}>
            <HotelsAndApartmentsProvider>
                <PreloaderAdminProvider>
                    <PreloaderAdmin/>
                    <div className={styles.wrapperLayout}/>
                    <NavbarAdmin/>
                    {children}

                </PreloaderAdminProvider>
            </HotelsAndApartmentsProvider>
        </section>
    );
};