'use client'

import React, {useState} from 'react';

import {AdminButton} from "../buttons/buttons";

import styles from "./componentAuth.module.css";
import stylesFont from "../../../../styles/fonts/timesNewRoman.module.css";


const ComponentAuth = ({value, setValue, auth}) => {
  const [showField, setShowField] = useState(false);

  return (
      <div className={styles.wrapperLogin}>
        <p>Вы попали на закрытую страницу</p>
        <q onClick={() => setShowField(!showField)}>Молви друг и войди</q>
        {showField && <>
          <input
              className={stylesFont.newRoman400}
              value={value}
              onChange={(e) => setValue(e.target.value)}
          />
          <AdminButton text={'Войти'} type={'light'} handleClick={auth}/>
        </>}
      </div>
  );
}

export default ComponentAuth;