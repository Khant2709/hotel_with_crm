import React from 'react';

import WrapperAdminPage from "../wrapperAdminPage/wrapperAdminPage";

import styles from './errorComponent.module.css';
import stylesFont from '../../../../styles/fonts/timesNewRoman.module.css';


const ErrorComponent = ({title = null, text, isContainerError = false}) => {
  if (isContainerError) {
    return (
        <section className={styles.containerError}>
          <ContentError text={text}/>
        </section>
    )
  }

  return (
      <WrapperAdminPage title={title}>
        <ContentError text={text}/>
      </WrapperAdminPage>
  );
};

export default ErrorComponent;

const ContentError = ({text}) => (
    <>
      <p className={`${stylesFont.newRoman400} ${styles.errorText}`}>
        ОШИБКА: {text}
      </p>
      <p className={`${stylesFont.newRoman400} ${styles.text}`}>
        Попробуйте перезагрузить страницу, если не ошибка не ушла вернитесь на страницу через 5мин.
      </p>
      <p className={`${stylesFont.newRoman400} ${styles.text}`}>
        Если ошибка осталась, напишите разработчикку с комментариями на какой странице это произошло и какая
        отображалась ошибка.
      </p>
    </>
);