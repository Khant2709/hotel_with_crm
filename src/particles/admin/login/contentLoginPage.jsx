import React from 'react';

import HeaderLine from "../../../components/ui/headerLine/headerLine";
import ButtonGradient from "../../../components/ui/buttons/buttonGradient/buttonGradient";

import styles from "./login.module.css";
import stylesFonts from "../../../styles/fonts/timesNewRoman.module.css";

/** Контент страницы входа в админку
 * @param {object} props - Пропсы компонента.
 * @param {function} auth - Функция отправки
 * @param {object} fields - Поля формы
 * @param {function} handleInputChange - Обработчик изменения полей
 * @param {boolean} statusPassword - Показать/скрыть пароль
 * @param {function} setStatusPassword - Обработчик статуса пароля (показать/скрыть)
 * @returns {JSX.Element} - Контент страницы входа в админку.
 * */
const ContentLoginPage = ({auth, fields, handleInputChange, statusPassword, setStatusPassword}) => {
    return (
        <>
            <HeaderLine/>
            <section className={styles.main}>
                <form onSubmit={auth} className={styles.container}>
                    <input
                        type={'text'}
                        name={'name'}
                        placeholder={'Имя'}
                        value={fields.name}
                        className={stylesFonts.newRoman400}
                        onChange={handleInputChange}
                        autoComplete="username"
                    />
                    <input
                        type={statusPassword ? 'password' : 'text'}
                        name={'password'}
                        placeholder={'Пароль'}
                        value={fields.password}
                        className={stylesFonts.newRoman400}
                        onChange={handleInputChange}
                        autoComplete="current-password"
                    />
                    <p className={styles.text} onClick={() => setStatusPassword(!statusPassword)}>
                        {statusPassword ? 'Показать пароль' : 'Скрыть пароль'}
                    </p>
                    <ButtonGradient text={'Войти'} type="submit"/>
                </form>
            </section>
        </>
    );
};

export default ContentLoginPage;