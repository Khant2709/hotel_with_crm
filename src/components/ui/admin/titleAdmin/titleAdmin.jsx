import React from 'react';

import styles from "./titleAdmin.module.css";
import stylesFont from '../../../../styles/fonts/timesNewRoman.module.css'


const TitleAdmin = ({text}) => {
  return (
      <h2 className={`${styles.title} ${stylesFont.newRoman400}`}>{text}</h2>
  );
};

export default TitleAdmin;