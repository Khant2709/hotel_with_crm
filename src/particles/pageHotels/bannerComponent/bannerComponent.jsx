import React from "react";
import Image from "next/image";

import styles from "./bannerComponent.module.css";
import stylesFontsT from "../../../styles/fonts/timesNewRoman.module.css";

/**
 * Компонент отображения банера страницы Hotels.
 * @param {Object} props - Пропсы компонента.
 * @param {string} props.banner - Обьект с данными отеля.
 * @param {string} props.bannerParams - Функция для перехода на отель.
 * @returns {JSX.Element} - Компонент отображения банера.
 */
const BannerComponent = ({banner, bannerParams}) => (
    <section className={styles.main}>
        <Image
            alt="background"
            src={banner}
            priority
            width={bannerParams.width}
            height={bannerParams.height}
            className={styles.background}
            style={{objectFit: "cover"}}
        />

        <h1 className={`${stylesFontsT.newRoman400} ${styles.title}`}>
            Отдых на черноморском <br/> побережье
        </h1>
    </section>
);

export default BannerComponent;
