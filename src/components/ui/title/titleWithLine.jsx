import React from "react";
import Image from "next/image";

import styles from "./title.module.css";
import stylesFontsT from "../../../styles/fonts/timesNewRoman.module.css";

import vectorMain from "../../../../public/VectorMain.png";
import VectorBrown from "../../../../public/VectorBrown.png";
import VectorBlue from "../../../../public/VectorBlue.png";
import VectorWave from "../../../../public/VectorWave.png";

const LINE_IMAGES_BY_HOTEL_TYPE = {
    hotel_1: vectorMain,
    hotel_2: VectorBrown,
    hotel_3: VectorBlue,
    hotel_4: VectorWave,
    hotel_5: VectorBlue,
};

const getLineImageByHotelType = (hotelType) => LINE_IMAGES_BY_HOTEL_TYPE[hotelType] || vectorMain;

/**
 * Компонент для отображения заголовка с декоративной линией.
 *
 * @param {string} text - Текст заголовка.
 * @param {boolean} [showTopLine=false] - Флаг для отображения верхней линии.
 * @param {string} [hotelType="hotel_1"] - Тип отеля для выбора изображения линии.
 * @param {boolean} [showHotelPrefix=false] - Флаг для отображения префикса "База отдыха".
 * @returns {JSX.Element} - Элемент заголовка с линией.
 */
const TitleWithLine = ({text, showTopLine, hotelType, showHotelPrefix}) => {
    const shouldShowHotelPrefix = text !== "Сан Марина" && showHotelPrefix;

    return (
        <div className={styles.wrapperTitle}>
            {showTopLine && (
                <Image
                    alt={"line"}
                    src={getLineImageByHotelType(hotelType)}
                    className={styles.line}
                />
            )}
            {shouldShowHotelPrefix && (
                <p className={styles.nameHotel}>База отдыха</p>
            )}
            <p className={stylesFontsT.newRoman400}>{text}</p>
            <Image
                alt={"line"}
                src={getLineImageByHotelType(hotelType)}
                className={styles.line}
            />
        </div>
    );
};

export default TitleWithLine;
