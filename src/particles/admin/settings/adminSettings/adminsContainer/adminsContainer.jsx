import React from 'react';
import Image from "next/image";

import iconEdit from '../../../../../../public/editIcon.png';

import styles from './adminsContainer.module.css';
import stylesFont from '../../../../../styles/fonts/timesNewRoman.module.css';


const ROLE_ADMIN = {
  'admin': 'Администратор',
  'boss': 'Владелец',
}

const AdminsContainer = ({admins, handleClick}) => {
  return (
      <section className={styles.wrapperAdmins}>
        {admins.map(admin => {
          const isDeveloper = admin.id === 1;
          return <div key={admin.id} className={`${stylesFont.newRoman400} ${styles.containerAdmin}`}>
            <p>{admin.adminname}</p>
            <p>{isDeveloper ? 'Разраб' : ROLE_ADMIN[admin.role]}</p>
            {!isDeveloper && <Image src={iconEdit} alt={'edit'} onClick={() => handleClick(admin.id)}/>}
          </div>
        })}
      </section>
  );
};

export default AdminsContainer;