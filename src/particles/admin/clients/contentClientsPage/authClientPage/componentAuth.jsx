import React from 'react';

import {AdminButton} from "../../../../../components/ui/admin/buttons/buttons";

import styles from "./componentAuth.module.css";
import stylesFont from "../../../../../styles/fonts/timesNewRoman.module.css";

const ComponentAuth = ({password, setPassword, loginClientsPage}) => (
    <div className={styles.wrapperLogin}>
        <p>Введите пароль</p>
        <input
            className={stylesFont.newRoman400}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
        />
        <AdminButton text={'Войти'} type={'light'} handleClick={loginClientsPage}/>
    </div>
);

export default ComponentAuth;