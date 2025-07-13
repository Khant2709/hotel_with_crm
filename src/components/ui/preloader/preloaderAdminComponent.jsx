import React from 'react';
import styles from './preloaderAdminComponent.module.css';

const PreloaderAdminComponent = () => {
    return (
        <div className={styles.text}>
           Подождите идет загрузка данных...
        </div>
    );
};

export default PreloaderAdminComponent;