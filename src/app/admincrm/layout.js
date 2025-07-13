'use client'

import React, {useMemo, useState} from 'react';

import {PreloaderAdminProvider} from "../../hooks/usePreloaderAdmin";
import {HotelsAndApartmentsProvider} from "../../hooks/useGetDataHotelsAndApartments";
import {useWindowWidth} from "../../hooks/UseWidth";

import NavbarAdmin from "../../components/layout/navbarAdmin/navbarAdmin";
import PreloaderAdmin from "../../components/ui/preloader/preloaderAdmin";

import styles from '../../styles/pageAdmin/adminLayout.module.css';

export default function AdminLayout({children}) {
  const width = useWindowWidth();
  const [toggleNavbar, setToggleNavbar] = useState(false);

  const handleToggleNav = () => {
    setToggleNavbar(!toggleNavbar)
  }

  const isSmall = useMemo(() => width <= 1250, [width]);
  const isHiddenNav = isSmall || toggleNavbar;

  return (
      <section className={`${styles.wrapperDashboard} ${isHiddenNav ? styles.hiddenNav : ''}`}>
        <HotelsAndApartmentsProvider>
          <PreloaderAdminProvider>
            <PreloaderAdmin/>
            <NavbarAdmin width={width} isHiddenNav={isHiddenNav} handleToggleNav={handleToggleNav}/>
            <div className={styles.wrapperLayout}/>
            {children}

          </PreloaderAdminProvider>
        </HotelsAndApartmentsProvider>
      </section>
  );
};