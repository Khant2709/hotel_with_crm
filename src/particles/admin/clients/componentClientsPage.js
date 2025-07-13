import React from 'react';

import ComponentDesktop from "./contentClientsPage/componentDesctop/componentDesktop";
import ComponentMobile from "./contentClientsPage/componentMobile/componentMobile";
import WrapperAdminPage from "../../../components/ui/admin/wrapperAdminPage/wrapperAdminPage";

import {AdminButton} from "../../../components/ui/admin/buttons/buttons";

import styles from "./componentClientsPage.module.css";
import stylesFont from "../../../styles/fonts/timesNewRoman.module.css";


const ComponentClientsPage = ({clients, width, searchQuery, setSearchQuery, downloadExcel, openClient}) => (
    <WrapperAdminPage title={'Гости'}>
      <div className={styles.filterContainer}>
        <input
            className={stylesFont.newRoman400}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
        />
        <AdminButton text={'Скачать'} type={'archive'} handleClick={downloadExcel}/>
      </div>
      {
        width && width > 600
            ? <ComponentDesktop clients={clients} openClient={openClient}/>
            : <ComponentMobile clients={clients}/>
      }
    </WrapperAdminPage>
);

export default ComponentClientsPage;