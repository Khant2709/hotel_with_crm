import React from 'react';

import WrapperAdminsPages from "../../../../components/layout/wrapperAdminsPages/wrapperAdminsPages";

import {CATEGORY_GROUP, navbarDoc} from "../navbarDoc";

import styles from "./contentDocPage.module.css";
import stylesFont from "../../../../styles/fonts/timesNewRoman.module.css";

const ContentDocPage = ({openPage}) => {
    return (
        <WrapperAdminsPages title={'Документация'}>
            {
                Object.keys(CATEGORY_GROUP).map((group, groupIndex) => {
                    return (
                        <React.Fragment key={`${group}_${groupIndex}`}>
                            <p className={`${stylesFont.newRoman700} ${styles.subTitle}`}>{CATEGORY_GROUP[group].title}:</p>
                            <ul className={styles.list}>
                                {navbarDoc.map((el, i) => {
                                    if (el.group === group) {
                                        return <li key={i} onClick={() => openPage(el.link)}>
                                            {el.title}
                                        </li>
                                    }
                                })}
                            </ul>
                        </React.Fragment>
                    )
                })
            }
            {/*</div>*/}
        </WrapperAdminsPages>
    );
};

export default ContentDocPage;