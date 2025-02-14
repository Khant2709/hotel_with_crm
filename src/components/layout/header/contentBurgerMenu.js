import React from "react";
import Link from "next/link";
import Image from "next/image";

import {WrapperMail, WrapperPhone} from "../../ui/wrapperPhone/сontactLinks";

import {formatPhoneWithMask} from "../../../utils/mask/transfomNumber";

import {
    HOTEL_ID,
    HOTELS_NAME_AND_LINK,
} from "../../../config/envData";

import burger from "../../../../public/burger.png";
import call from "../../../../public/callMobile.svg";
import close from "../../../../public/close.png";

import styles from "./headerBurger.module.css";
import stylesFontsI from "../../../styles/fonts/inter.module.css";
import stylesFontsT from "../../../styles/fonts/timesNewRoman.module.css";


/**
 * Компонент для отображения мини хедера.
 * @param {Object} props - Пропсы компонента.
 * @param {function} props.toggleBurgerMenu - Функция для отображения меню или чисто шапки.
 * @param {Object} props.contactsData - Контактные данные отеля.
 * @returns {JSX.Element} - Мини хедер.
 */
export const ContentBurgerMenu = ({toggleBurgerMenu, contactsData}) => {
    const {name} = HOTELS_NAME_AND_LINK.find((el) => el.id === HOTEL_ID);
    return (
        <div className={styles.wrapperHeaderMobile}>
            <div className={styles.containerHeaderMobile}>
                <div className={styles.wrapperBurger}>
                    <Image
                        alt={"burger"}
                        src={burger}
                        className={styles.iconBurger}
                        onClick={toggleBurgerMenu}
                    />
                </div>
                <p className={styles.title}>{name}</p>
                <a href={`tel:${contactsData?.phone}`}>
                    <Image alt={"call"} src={call} className={styles.iconCall}/>
                </a>
            </div>
        </div>
    );
};

/**
 * Компонент хедера с полными данными.
 * @param {Object} props - Пропсы компонента.
 * @param {boolean} props.showContainerHeader - Отображать ли контейнер-меню с анимацией.
 * @param {function} props.toggleBurgerMenu - Функция для отображения меню или чисто шапки.
 * @param {string} props.currentPath - Текущий url.
 * @param {array} props.navbar - Список страниц(навигация по сайту).
 * @param {Object} props.contactsData - Контактные данные отеля.
 * @returns {JSX.Element} - Окно хедера.
 */
export const ContainerBurger = ({showContainerHeader, toggleBurgerMenu, currentPath, navbar, contactsData}) => (
    <div className={`${styles.navbar} ${showContainerHeader ? '' : styles.showNavbar}`}>
        <Image alt={'close'} src={close} onClick={toggleBurgerMenu} className={styles.iconClose}/>
        <NavbarContent toggleBurgerMenu={toggleBurgerMenu} currentPath={currentPath} navbar={navbar}/>
        <ContactsContent contactsData={contactsData}/>
        <OtherHotels/>
    </div>
);

/**
 * Контейнер навигации по сайту.
 * @param {Object} props - Пропсы компонента.
 * @param {function} props.toggleBurgerMenu - Функция для отображения меню или чисто шапки.
 * @param {string} props.currentPath - Текущий url.
 * @param {array} props.navbar - Список страниц.
 * @returns {JSX.Element} - Контейнер навигации.
 */
const NavbarContent = ({toggleBurgerMenu, currentPath, navbar}) => (
    <div className={styles.containerNavbar}>
        {navbar.map((el) => {
            return (
                <Link
                    key={el.id}
                    href={el.link}
                    onClick={toggleBurgerMenu}
                    className={`${el.link === currentPath && stylesFontsI.Inter700}
                                                 ${el.link === currentPath && styles.activeLink} 
                                                 ${styles.link}`}
                >
                    {el.textRu}
                </Link>
            );
        })}
    </div>
);

/**
 * Контейнер с контактными данными.
 * @param {Object} props - Пропсы компонента.
 * @param {Object} props.contactsData - Контактные данные отеля.
 * @returns {JSX.Element} - Контейнер с контактными данными.
 */
const ContactsContent = ({contactsData}) => (
    <div className={styles.containerContacts}>
        <div className={`${stylesFontsT.newRoman400} ${styles.rowContainerContacts}`}>
            <p className={styles.subTitle}>Наш номер:</p>
            <WrapperPhone
                phoneNumber={formatPhoneWithMask(contactsData?.phone)}
                whatsAppNumber={contactsData?.phone}
                telegramNumber={contactsData?.phone_tg}
            />
        </div>
        <div className={`${stylesFontsT.newRoman400} ${styles.rowContainerContacts}`}>
            <p className={styles.subTitle}>Наша почта:</p>
            <WrapperMail email={contactsData?.email}/>
        </div>
        <div className={`${stylesFontsT.newRoman400} ${styles.rowContainerContacts}`}>
            <p className={styles.subTitle}>Наш адресс:</p>
            <p>
                {contactsData?.address}
            </p>
        </div>
    </div>
);

/**
 * Контейнер остальными отелями.
 * @returns {JSX.Element} - Контейнер с остальными отелями.
 */
const OtherHotels = () => (
    <div className={`${stylesFontsT.newRoman400} ${styles.containerOtherHotels}`}>
        <p className={styles.titleOtherHotels}>Другие наши отели:</p>
        {HOTELS_NAME_AND_LINK.map((hotel) => {
            if (hotel.id !== HOTEL_ID) {
                return (
                    <Link
                        className={`${stylesFontsT.newRoman400} ${styles.hotelName}`}
                        href={hotel.link}
                        key={hotel.id}
                    >
                        {hotel.name}
                    </Link>
                );
            }
        })}
    </div>
);
