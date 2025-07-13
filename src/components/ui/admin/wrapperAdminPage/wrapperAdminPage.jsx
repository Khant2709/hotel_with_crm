import React from 'react';
import TitleAdmin from "../titleAdmin/titleAdmin";

import styles from './wrapperAdminPage.module.css';

const WrapperAdminPage = ({title, children}) => {
    return (
        <section className={styles.wrapper}>
            {title && <TitleAdmin text={title}/>}
            {children}
        </section>
    );
};

export default WrapperAdminPage;