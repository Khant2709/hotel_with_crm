import React from "react";
import Link from "next/link";
import Image from "next/image";

import {WrapperMail, WrapperPhone} from "../../ui/wrapperPhone/сontactLinks";

import {formatPhoneWithMask} from "../../../utils/mask/transfomNumber";

import navbar from "../../../data/navbar";
import {
    DEFAULT_CONTACTS,
    HOTEL_ID,
    HOTELS_NAME_AND_LINK,
} from "../../../config/envData";

import iconTg from "../../../../public/iconTgFooter.svg";
import iconWt from "../../../../public/iconWtFooter.svg";
import iconInst from "../../../../public/iconInstFooter.svg";

import styles from "./footer.module.css";
import stylesFontsI from "../../../styles/fonts/inter.module.css";
import {filterHotels} from "../../../utils/filterHotels";

/**
 * Компонент для отображения ссылки в футере.
 * @param {Object} props - Пропсы компонента.
 * @param {string} props.href - Ссылка.
 * @param {boolean} props.isActive - Активна ли ссылка.
 * @param {string} props.text - Текст ссылки.
 * @returns {JSX.Element} - Ссылка.
 */
const FooterLink = ({href, isActive, text}) => (
    <Link
        href={href}
        className={`${isActive ? stylesFontsI.Inter700 : stylesFontsI.Inter300} ${styles.text}`}
    >
        {text}
    </Link>
);

/**
 * Компонент для отображения ссылок на разделы сайта.
 * @param {Object} props - Пропсы компонента.
 * @param {string} props.currentPath - Текущий путь.
 * @returns {JSX.Element} - Список ссылок страниц.
 */
export const Catalog = ({currentPath}) => (
    <div className={styles.column}>
        <p className={`${stylesFontsI.Inter700} ${styles.title}`}>Каталог</p>
        {navbar.map((el) => (
            <FooterLink
                key={el.id}
                href={el.link}
                isActive={el.link === currentPath}
                text={el.textRu}
            />
        ))}
    </div>
);

/**
 * Компонент для отображения ссылок на отели.
 * @returns {JSX.Element} - Список ссылок на отели.
 */
export const AllHotels = () => {
    const hotels = filterHotels(HOTELS_NAME_AND_LINK);
    return (
        <div className={styles.column}>
            <p className={`${stylesFontsI.Inter700} ${styles.title}`}>Базы отдыха</p>
            {hotels.map((hotel) => (
                <FooterLink
                    key={hotel.id}
                    href={hotel.link}
                    isActive={hotel.id === HOTEL_ID}
                    text={hotel.name}
                />
            ))}
        </div>
    );
};

/**
 * Компонент для отображения контактов.
 * @param {Object} props - Пропсы компонента.
 * @param {Object} props.contactsData - Данные контактов.
 * @returns {JSX.Element} - Блок контактов.
 */
export const Contacts = ({contactsData}) => (
    <div className={styles.column}>
        <p className={`${stylesFontsI.Inter700} ${styles.title}`}>Контакты</p>

        {[
            {label: 'Телефон',
                component: <WrapperPhone phoneNumber={formatPhoneWithMask(contactsData.phone)}
                                         whatsAppNumber={contactsData.phone}
                                         telegramNumber={contactsData.phone_tg}/>
            },
            {label: 'Почта', component: <WrapperMail email={contactsData.email}/>},
            {label: 'Адрес', component: <p className={styles.address}>{contactsData?.address}</p>},
        ].map(({label, component}) => (
            <div key={label} className={styles.columnsContacts}>
                <p className={styles.subTitleContacts}>{label}:</p>
                {component}
            </div>
        ))}
    </div>
);

/**
 * Компонент для отображения информации о компании и социальных сетях.
 * @param {Object} props - Пропсы компонента.
 * @param {Object} props.contactsData - Данные контактов.
 * @returns {JSX.Element} - Блок информации о компании.
 */
export const CompanyInfoAndSocial = ({contactsData}) => (
    <div className={styles.wrapperSecondContainer}>
        <div className={styles.secondContainer}>
            <div className={styles.columnsSecondContainer}>
                <p>ОГРН: 315231200002780</p>
                <p>ИНН: 231200791910</p>
            </div>

            <div className={styles.columnsSecondContainer}>
                <a href={`https://t.me/${contactsData?.phone_tg}`}>
                    <Image alt={"tg"} src={iconTg}/>
                </a>
                <a href={`https://api.whatsapp.com/send?phone=${contactsData?.phone}`}>
                    <Image alt={"wt"} src={iconWt}/>
                </a>
                <Image alt={"inst"} src={iconInst}/>
            </div>
        </div>
    </div>
);
