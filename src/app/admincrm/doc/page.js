'use client'

import React from 'react';
import {useRedirectAdmin} from "../../../hooks/useRedirectAdmin";

import styles from '../../../styles/pageAdmin/doc/mainPage.module.css';
import stylesFont from '../../../styles/fonts/timesNewRoman.module.css';
import TitleAdmin from "../../../components/ui/admin/titleAdmin/titleAdmin";
import {useRouter} from "next/navigation";

const category = [
    {
        name: 'markdown',
        nameRu: 'Шаблонизатор Markdown',
        group: 'main'
    },
    {
        name: 'images',
        nameRu: 'Работа с изображениями',
        group: 'main'
    },

    {
        name: 'hotel_data',
        nameRu: 'Основные данные',
        group: 'hotel'
    },
    {
        name: 'hotel_ya_data',
        nameRu: 'Данные карт яндекс',
        group: 'hotel'
    },
    {
        name: 'hotel_coordinates',
        nameRu: 'Координаты отеля',
        group: 'hotel'
    },
    {
        name: 'hotel_contacts',
        nameRu: 'Контакты отеля',
        group: 'hotel'
    },
    {
        name: 'hotel_images',
        nameRu: 'Изображения отеля',
        group: 'hotel'
    },

    {
        name: 'apartment_data',
        nameRu: 'Основные номера',
        group: 'apartment'
    },
    {
        name: 'apartment_data',
        nameRu: 'Удобства номера',
        group: 'apartment'
    },
    {
        name: 'apartment_data',
        nameRu: 'Фотографии номера',
        group: 'apartment'
    },

    {
        name: 'filter',
        nameRu: 'Работа с фильтром',
        group: 'reservation'
    },
    {
        name: 'edit',
        nameRu: 'Редактирование брони',
        group: 'reservation'
    },
    {
        name: 'handle',
        nameRu: 'Действия с бронированием',
        group: 'reservation'
    },
];

const groups = [
    {
        title: 'Основные:',
        name: 'main'
    },
    {
        title: 'По отелю:',
        name: 'hotel'
    },
    {
        title: 'По номеру:',
        name: 'apartment'
    },
    {
        title: 'По бронированию:',
        name: 'reservation'
    },
];

const DocAdminPage = () => {
    useRedirectAdmin();
    const router = useRouter();

    const openPage = (link) => {
        router.push(`doc/${link}`)
    }

    return (
        <div className={`${stylesFont.newRoman400} ${styles.mainWrapper}`}>
            <TitleAdmin text={'Документация'}/>
            {
                groups.map((group, groupIndex) => {
                    return (
                        <React.Fragment key={`${group.name}_${groupIndex}`}>
                            {group?.title && <p className={styles.subTitle}>{group.title}</p>}
                            <ul className={styles.list}>
                                {category.map((el, i) => {
                                    if (el.group === group.name) {
                                        return <li key={i} onClick={() => openPage(el.name)}>
                                            {el.nameRu}
                                        </li>
                                    }
                                })}
                            </ul>
                        </React.Fragment>
                    )
                })
            }
        </div>
    );
};

export default DocAdminPage;