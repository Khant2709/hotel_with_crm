import React from "react";

import {AdminButton} from "../../../../../../../components/ui/admin/buttons/buttons";

import styles from "./containerApartment.module.css";
import stylesFontT from "../../../../../../../styles/fonts/timesNewRoman.module.css";

export const ContainerApartment = ({apartment, isActive, editCategory, showSetting, setModeEdit}) => (
    <div className={`${stylesFontT.newRoman400} ${styles.wrapperRowField}`}>
        <div className={styles.rowField}>
            <p className={styles.label}>{apartment.apartment_name}</p>
            <AdminButton text={isActive ? 'Отмена' : 'Изменить'}
                         type={'archive'}
                         handleClick={isActive ? showSetting : () => showSetting(apartment.id)}/>
        </div>
        {isActive && editCategory.map((category, i) => {
            return <div className={styles.rowField} key={`${category.category}_${i}`}>
                <p className={styles.sublabel}>{category.label}</p>
                <AdminButton text={'Изменить'} type={'light'}
                             handleClick={() => setModeEdit(category.category)}/>
            </div>
        })}
    </div>
);