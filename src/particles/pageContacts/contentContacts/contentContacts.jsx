import React from 'react';

import {ComponentHotels} from "./componentHotels/componentHotels";

import Title from "../../../components/ui/title/title";
import HeaderLine from "../../../components/ui/headerLine/headerLine";
import CallBackForm from "../../../components/ui/formCall/callBackForm";
import FormSearchDate from "../../../components/ui/formSerchDate/formSearchDate";

import {HOTEL_TYPE} from "../../../config/envData";

import styles from "./contentContacts.module.css";
import stylesFontsT from "../../../styles/fonts/timesNewRoman.module.css";

const ContentContacts = ({width, hotelsData, textConclusion}) => {
    return (
        <main className={styles.main}>
            <HeaderLine color={"black"}/>

            <div className={`${stylesFontsT.newRoman400} ${styles.mainContainer}`}>
                {width && width > 768 && <FormSearchDate hotelNumber={HOTEL_TYPE}/>}
                <Title Tag={"h1"} text={"Контактная информация и адреса"}/>
                <ComponentHotels hotels={hotelsData}/>

                <p className={styles.finishText}>
                    {textConclusion ||
                    'Тут должен быть заключительный текст, но чтото пошло не так. Попробуйте перезагрузить страницу'}
                </p>

                <div className={styles.wrapperFormCall}>
                    <CallBackForm text={"Заказать звонок"} numberHotel={HOTEL_TYPE}/>
                </div>
            </div>
        </main>
    );
};

export default ContentContacts;