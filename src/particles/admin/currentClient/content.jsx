import React from 'react';

import WrapperAdminPage from "../../../components/ui/admin/wrapperAdminPage/wrapperAdminPage";
import TitleAdmin from "../../../components/ui/admin/titleAdmin/titleAdmin";

import {transformDateFormat} from "../../../utils/getDay";
import transformPrice from "../../../utils/mask/transformPrice";

import {RESERVATION_STATUS} from "../../../config/envData";

import styles from './content.module.css';
import stylesFont from '../../../styles/fonts/timesNewRoman.module.css';
import {formatPhoneWithMask} from "../../../utils/mask/transfomNumber";

const ContentCurrentClient = ({client, history, hotels, apartments}) => {
    const clientData = [
        {label: 'Id', value: client.id},
        {label: 'ФИО', value: client.fio},
        {label: 'Телефон', value: client.phone},
        {label: 'Почта', value: client.email},
        {label: 'Бронирований', value: client.visits},
    ];

    return (
        <WrapperAdminPage title={'Данные гостя'}>
            <div className={`${stylesFont.newRoman400} ${styles.containerClientData}`}>
                {clientData.map((client, index) => {
                    const text = client?.value
                        ? client.label === 'Телефон' ? formatPhoneWithMask(client.value) : client.value
                        : '--'
                    return <div key={index} className={styles.rowClientData}>
                        <p>{client.label}</p>
                        <p>{text}</p>
                    </div>
                })}
            </div>

            <TitleAdmin text={'История'}/>
            {history.map((event, i) => {
                return <EventCard key={i} event={event} hotels={hotels} apartments={apartments}/>
            })}
        </WrapperAdminPage>
    );
};

export default ContentCurrentClient;

const EventCard = ({event, hotels, apartments}) => {
    const STATUS_STYLE = {
        'WAITING': styles.eventWaiting,
        'CONFIRM': styles.eventConfirm,
        'COMPLETED': styles.eventCompleted,
        'CANCELLED': styles.eventCancelled,
        'REMOVED': styles.eventRemoved,
    };

    return (
        <div className={`${styles.eventCard} ${STATUS_STYLE[event.status]}`}>
            <RowCard label={'Статус'} value={RESERVATION_STATUS[event.status]}/>
            <RowCard label={'Дата заезда'} value={transformDateFormat(event.start_date_local.split('T')[0])}/>
            <RowCard label={'Дата выезда'} value={transformDateFormat(event.end_date_local.split('T')[0])}/>
            <RowCard label={'Отель'} value={hotels[event.hotel_id]}/>
            <RowCard label={'Номер'} value={apartments[event.apartment_id]}/>
            <RowCard label={'Итоговая сумма'} value={transformPrice(event.total_price)}/>
            <RowCard label={'Кол. взрослых'} value={event.count_adults}/>
            <RowCard label={'Кол. детей'} value={event.count_children}/>
            <RowCard label={'Админ'} value={event.confirmedBy}/>
        </div>
    );
}

const RowCard = ({label, value}) => (
    <div className={`${stylesFont.newRoman400} ${styles.rowClientData}`}>
        <p>{label}</p>
        <p>{value || '--'}</p>
    </div>
);