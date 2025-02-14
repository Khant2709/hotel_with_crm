import React from "react";

import {generateApartmentDescription} from "./fieldDescription";

import {ShortDescriptionContainer, FullDescriptionContainer} from "./contentDescription";

import {mainColorHotel} from "../../../config/colorConfig";
import {HOTEL_TYPE} from "../../../config/envData";

import styles from "./contentDescription.module.css";
import stylesFontsT from "../../../styles/fonts/timesNewRoman.module.css";

/** Компонент описания номера
 * @param {object} props - Пропсы компонента.
 * @param {object} props.currentApartment - Данные конкретного номера.
 * @return {JSX.Element} - Компонент описания номера.
 */
const WrapperContentDescription = ({currentApartment}) => {
    const shortDescription = generateApartmentDescription(currentApartment, 'short');
    const fullDescription = generateApartmentDescription(currentApartment, 'full');
    const borderStyle = {borderBottom: `2px solid ${mainColorHotel[HOTEL_TYPE]}`};

    return (
        <>
            <div className={stylesFontsT.newRoman400} style={borderStyle}>
                <h1 className={styles.title}>{currentApartment.apartment_name}</h1>
                <ShortDescriptionContainer shortDescription={shortDescription}/>
            </div>

            <FullDescriptionContainer fullDescription={fullDescription} borderStyle={borderStyle}/>
        </>
    );
};

export default WrapperContentDescription;
