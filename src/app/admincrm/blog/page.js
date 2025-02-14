'use client'

import React, {useCallback, useEffect, useState} from 'react';

import ArticlesContent from "../../../particles/admin/blog/articlesContent";
import EditModeArticle from "../../../particles/admin/blog/editModeArticle/editModeArticle";

import {AdminButton} from "../../../components/ui/admin/buttons/buttons";
import TitleAdmin from "../../../components/ui/admin/titleAdmin/titleAdmin";

import {fetchingArticleData} from "../../../services/fetchingData";
import {useRedirectAdmin} from "../../../hooks/useRedirectAdmin";
import {notifyShowToast} from "../../../utils/showToast";

import styles from '../../../styles/pageAdmin/blogPage/blogAdminPage.module.css';


const TITLE = {
    'create_data': 'Создание статьи',
    'create_image': 'Добавление изображения',
    'update_data': 'Обновление статьи',
    'update_images': 'Обновления изображений',
}

/** Компонент страницы редактирования/создания статьи
 * @return {JSX.Element} - основной компонент статей (админский)
 * */
const BlogAdminPage = () => {
    useRedirectAdmin();
    const [articles, setArticles] = useState([]);
    const [currentArticle, setCurrentArticle] = useState(null);
    const [mode, setMode] = useState('');


    /** Функция для загрузки всех статей (при рендере и при обновлении) */
    const loadArticles = useCallback(async () => {
        try {
            const res = await fetchingArticleData();
            setArticles(Array.isArray(res) ? res : []);
        } catch (error) {
            notifyShowToast('error', error.message || 'Ошибка при загрузке статей.');
        }
    }, []);

    /** Функция для загрузки конкретной статьи */
    const updateDataArticle = useCallback(async (id, mode) => {
        try {
            const res = await fetchingArticleData(id);
            setCurrentArticle(res || null);
            setMode(mode);
        } catch (error) {
            notifyShowToast('error', error.message || 'Ошибка при загрузке статьи.');
        }
    }, []);

    useEffect(() => {
        loadArticles();
    }, [loadArticles]);

    return (
        <div className={styles.wrapperMain}>
            <TitleAdmin text={TITLE[mode] || 'Статьи'}/>
            {!mode
                ? <>
                    <AdminButton text={'Создать'} type={'archive'} handleClick={() => setMode('create_data')}/>
                    <ArticlesContent articles={articles} updateDataArticle={updateDataArticle}/>
                </>
                : <EditModeArticle mode={mode}
                                   currentArticle={currentArticle}
                                   getUpdateData={loadArticles}
                                   setMode={setMode}/>
            }
        </div>
    );
};

export default BlogAdminPage;