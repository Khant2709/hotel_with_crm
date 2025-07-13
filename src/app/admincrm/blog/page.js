'use client'

import React, {useCallback, useEffect, useState} from 'react';

import ArticlesContent from "../../../particles/admin/blog/articlesContent";
import EditModeArticle from "../../../particles/admin/blog/editModeArticle/editModeArticle";

import {AdminButton} from "../../../components/ui/admin/buttons/buttons";
import WrapperAdminPage from "../../../components/ui/admin/wrapperAdminPage/wrapperAdminPage";
import ErrorComponent from "../../../components/ui/admin/errorComponent/errorComponent";

import {useRedirectAdmin} from "../../../hooks/useRedirectAdmin";

import {singleRequest} from "../../../services/utils/requestUtils";
import {articles} from "../../../services/api";


const TITLE = {
  'create_data': 'Создание статьи',
  'create_image': 'Добавление изображения',
  'update_data': 'Обновление статьи',
  'update_images': 'Обновления изображений',
}

/** Компонент страницы редактирования/создания статьи */
const BlogAdminPage = () => {
  useRedirectAdmin();

  const [articlesData, setArticlesData] = useState([]);
  const [currentArticle, setCurrentArticle] = useState(null);
  const [mode, setMode] = useState('');
  const [errorResponse, setErrorResponse] = useState(null);

  /** Функция для загрузки всех статей (при рендере и при обновлении) */
  const loadArticles = useCallback(async () => {
    const response = await singleRequest(() => articles.getAllArticles());

    if (response.error) {
      setErrorResponse(response.error);
      return;
    }

    const articlesRes = response.data?.data;
    if (!articlesRes?.length) {
      setErrorResponse('Произошла ошибка при получении данных статей.');
      return;
    }

    setArticlesData(articlesRes);
  }, []);

  /** Функция для загрузки конкретной статьи */
  const updateDataArticle = useCallback(async (id, mode) => {
    const response = await singleRequest(() => articles.getCurrentArticle(id));

    if (response.error) {
      setErrorResponse(response.error);
      return;
    }

    const articleRes = response.data?.data;
    if (!articleRes) {
      setErrorResponse('Произошла ошибка при получении данных кокретной статьи.');
      return;
    }

    setCurrentArticle(articleRes);
    setMode(mode);
  }, []);

  useEffect(() => {
    loadArticles();
  }, [loadArticles]);

  if (errorResponse) {
    return <ErrorComponent title={TITLE[mode] || 'Статьи'} text={errorResponse}/>
  }

  return (
      <WrapperAdminPage title={TITLE[mode] || 'Статьи'}>
        {!mode
            ? <>
              <AdminButton text={'Создать'} type={'archive'} handleClick={() => setMode('create_data')}/>
              <ArticlesContent articles={articlesData} updateDataArticle={updateDataArticle}/>
            </>
            : <EditModeArticle
                mode={mode}
                currentArticle={currentArticle}
                getUpdateData={loadArticles}
                setMode={setMode}
            />
        }
      </WrapperAdminPage>
  );
};

export default BlogAdminPage;