import React from 'react';
import styles from "./titleAdmin.module.css";
import stylesFont from "../../../../styles/fonts/timesNewRoman.module.css";


const SubTitleAdmin = ({text}) => {
  return (
      <h2 className={`${styles.subtitle} ${stylesFont.newRoman400}`}>{text}</h2>
  );
};

export default SubTitleAdmin;