'use client'

import React, {useState} from 'react';
import {AdminButton} from "../../../components/ui/admin/buttons/buttons";

import styles from './articlesContent.module.css';
import stylesFont from '../../../styles/fonts/timesNewRoman.module.css';

/**
 * Компонент всех статей.
 * @param {Object} props - Пропсы компонента.
 * @param {array} props.articles - Массив статей.
 * @param {function} props.updateDataArticle - Функция для получения конкретной статьи и перехода в режим редактирования.
 * @returns {JSX.Element} - Компонент всех статей.
 */
const ArticlesContent = ({articles, updateDataArticle}) => {
    const [editMode, setEditMode] = useState(null);
    const showEdit = (id) => id ? setEditMode(id) : setEditMode(null);

    return (
        <>
            {articles.map(article => {
                const isEdit = editMode && editMode === article.id;
                return <div key={article.id} className={`${stylesFont.newRoman400} ${styles.wrapperArticle}`}>
                    <div className={styles.containerArticle}>
                        <p className={stylesFont.newRoman700}>{article.title}</p>
                        <AdminButton text={isEdit ? 'Отмена' : 'Изменить'} type={'archive'}
                                     handleClick={isEdit ? () => showEdit() : () => showEdit(article.id)}/>
                    </div>
                    {isEdit && <>
                        <div className={styles.containerArticle}>
                            <p className={styles.subTitle}>Данные статьи</p>
                            <AdminButton text={'Редактировать'} type={'light'}
                                         handleClick={() => updateDataArticle(article.id, 'update_data')}/>
                        </div>
                        <div className={styles.containerArticle}>
                            <p className={styles.subTitle}>Изображения статьи</p>
                            <AdminButton text={'Редактировать'} type={'light'}
                                         handleClick={() => updateDataArticle(article.id, 'update_images')}/>
                        </div>
                    </>}
                </div>
            })}
        </>
    );
};

export default ArticlesContent;