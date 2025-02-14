'use client'

import React from 'react';

import {usePreloaderAdmin} from "../../../hooks/usePreloaderAdmin";

import styles from './preloaderAdmin.module.css';

const PreloaderAdmin = () => {
    const {toggleStatePreloader} = usePreloaderAdmin();

    return (
        <div className={toggleStatePreloader ? styles.window : styles.hiddenWindow}>
            <div className={styles.preloader}/>
        </div>
    );
};

export default PreloaderAdmin;