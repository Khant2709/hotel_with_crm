import React from 'react';
import Image from "next/image";

import toggleIcon from '../../../../public/admin/toggleNav.png';
import logoutIcon from '../../../../public/admin/logout.png';

import styles from './navbarAdmin.module.css';
import stylesFontT from "../../../styles/fonts/timesNewRoman.module.css";


/** Компонент для отображения ссылок на разделы сайта. */
const ContentDesktop = ({navbarAdmin, currentPath, changePageAdmin, logout, width, handleToggleNav, isHiddenNav}) => (
    <div className={`${stylesFontT.newRoman400} ${styles.containerLayout} ${isHiddenNav ? styles.hiddenNav : ''}`}>
      {navbarAdmin.map(el => {
        const pathSplit = el.link.split('/');
        const activePage = currentPath === ((pathSplit[1] === 'hotel' || pathSplit[1] === 'booking')
            ? `${pathSplit[1]}/${pathSplit[2]}`
            : pathSplit[1]);
        return <ContainerNav
            key={el.id}
            text={el.textRu}
            icon={el.icon}
            handleClick={() => changePageAdmin(`/admincrm${el.link}`)}
            isActive={activePage}
            isHiddenNav={isHiddenNav}
        />
      })}
      <ContainerNav text={'Выход'} icon={logoutIcon} handleClick={logout} isHiddenNav={isHiddenNav}/>
      {width > 768 && <Image
          onClick={handleToggleNav}
          src={toggleIcon}
          alt={'toggle'}
          className={`${styles.toggleBar} ${styles.icon}`}
      />}
    </div>
);

export default ContentDesktop;

const ContainerNav = ({text, icon, handleClick, isActive, isHiddenNav}) => (
    <div onClick={handleClick} className={`${styles.containerNavEl} ${isActive ? styles.activePage : ''}`}>
      <Image src={icon} alt={text} className={styles.icon}/>
      {!isHiddenNav && <p>{text}</p>}
    </div>
)