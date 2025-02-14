import React from "react";
import Image from "next/image";

import wt from "../../../../public/wtBurger.svg";
import tg from "../../../../public/tgBurger.svg";

import styles from "./сontactLinks.module.css";

const SocialIcon = ({ alt, src, href }) => (
    <a href={href} style={{ display: "flex" }}>
        <Image alt={alt} src={src} />
    </a>
);

/**
 * Компонент для отображения ссылок на телефон, WhatsApp и Telegram.
 *
 * @param {string} whatsAppNumber - Номер телефона для WhatsApp.
 * @param {string} phoneNumber - Номер телефона для звонка.
 * @param {string} telegramNumber - Имя пользователя Telegram.
 * @returns {JSX.Element} - Элемент с ссылками.
 */
export const WrapperPhone = ({ whatsAppNumber, phoneNumber, telegramNumber }) => (
    <div className={styles.wrapperLink}>
        <a href={`tel:${whatsAppNumber}`}>{phoneNumber}</a>
        <SocialIcon alt="wt" src={wt} href={`https://api.whatsapp.com/send?phone=${whatsAppNumber}`} />
        <SocialIcon alt="tg" src={tg} href={`https://t.me/${telegramNumber}`} />
    </div>
);

/**
 * Компонент для отображения ссылки на почту.
 *
 * @param {string} email - Адрес электронной почты.
 * @returns {JSX.Element} - Элемент с ссылкой на почту.
 */
export const WrapperMail = ({email}) => (
    <div className={styles.wrapperLink}>
        <a href={`mailto:${email}`} target={"_blank"} rel={"noopener noreferrer"}>
            {email}
        </a>
    </div>
);
