import React from 'react';

import TitleAdmin from "../../ui/admin/titleAdmin/titleAdmin";

import styles from './wrapperAdminsPages.module.css';
import stylesFont from '../../../styles/fonts/timesNewRoman.module.css';

const WrapperAdminsPages = ({title, children}) => {
    return (
        <section className={`${stylesFont.newRoman400} ${styles.wrapper}`}>
            <TitleAdmin text={title}/>
            {children}
        </section>
    );
};

export default WrapperAdminsPages;