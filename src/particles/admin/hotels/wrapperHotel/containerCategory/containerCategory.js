import React from 'react';
import {categoryEdit} from "../categoryEdit";

import styles from './containerCategory.module.css';
import stylesFont from '../../../../../styles/fonts/timesNewRoman.module.css';
import stylesFontI from '../../../../../styles/fonts/inter.module.css';

const ContainerCategory = ({setActiveCategory}) => {
    return (
        <div className={styles.containerMain}>
            {categoryEdit.map((category, i) => {
                return <div className={`${stylesFont.newRoman400} ${styles.rowCategory}`} key={i}>
                    <p>{category.title}</p>
                    <button className={stylesFontI.Inter300} onClick={() => setActiveCategory(category.category)}>
                        Изменить
                    </button>
                </div>
            })}
        </div>
    );
};

export default ContainerCategory;