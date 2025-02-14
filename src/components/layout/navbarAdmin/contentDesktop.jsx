import React from 'react';

import styles from './navbarAdmin.module.css';
import stylesFontT from "../../../styles/fonts/timesNewRoman.module.css";

/**
 * Компонент для отображения ссылок на разделы сайта.
 * @param {Object} props - Пропсы компонента.
 * @param {array} props.navbarAdmin - Список меню навигации.
 * @param {string} props.currentPath - Текущий путь.
 * @param {function} props.changePageAdmin - Обработчик для перехода по страницам админки.
 * @param {function} props.logout - Виход из админки в меню авторизации.
 * @returns {JSX.Element} - Список ссылок страниц.
 */
const ContentDesktop = ({navbarAdmin, currentPath, changePageAdmin, logout}) => (
    <div className={`${stylesFontT.newRoman400} ${styles.containerLayout}`}>
        <div className={styles.containerNavbar}>
            {navbarAdmin.map(el => {
                const activePage = currentPath === el.link;
                return (
                    <p key={el.id}
                       className={`${styles.elNavbar} ${activePage && styles.activePage}`}
                       onClick={() => changePageAdmin(`/admincrm${el.link}`)}
                    >
                        {el.textRu}
                    </p>
                );
            })}
        </div>
        <p onClick={logout}>Выход</p>
    </div>
);

export default ContentDesktop;