import {makeRequest} from "./makeRequest";


/** Получает данные всех статей. */
export const getAllArticles = async (cacheAge) => makeRequest(
    'get',
    '/blog',
    null,
    null,
    false,
    cacheAge = null
);

/** Получает данные конкретной статьи. */
export const getCurrentArticle = async (id, cacheAge) => makeRequest(
    'get',
    `/blog/${id}`,
    null,
    null,
    false,
    cacheAge = null
);

/** Создает новую статью (запрос FORM DATA).
 @param {Object} data - Данные для создания статьи.
 */
export const createArticle = async (data) => makeRequest('post', '/blog/create', data, null, true);

/** Обновляет данные статьи (запрос FORM DATA).
 @param {Object} data - Новые данные статьи.
 */
export const updateArticleData = async (data) => makeRequest('patch', '/blog/article', data, null, true);

/** Удаляет статью.
 @param {string} id - ID статьи.
 */
export const deleteArticle = async (id) => makeRequest('delete', `/blog/delete/${id}`);

/** Создает изображение для статьи (запрос FORM DATA).
 @param {Object} data - Данные изображения.
 */
export const createArticleImage = async (data) => makeRequest('post', '/blog/create/image', data, null, true);

/** Обновляет изображение статьи (запрос FORM DATA).
 @param {Object} data - Новые данные изображения.
 */
export const updateArticleImage = async (data) => makeRequest('patch', '/blog/update/image', data, null, true);

/** Удаляет изображение статьи.
 @param {string} id - ID изображения.
 */
export const deleteArticleImage = async (id) => makeRequest('delete', `/blog/delete/image/${id}`);