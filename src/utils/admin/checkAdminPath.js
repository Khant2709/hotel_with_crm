/** Функция для проверки url на наличие админски
 *  @param {string} pathname - Полный url адрес.
 *  @returns {boolean} - Результат проверки, является ли страница админской.
 * */
export const checkAdminPath = (pathname) => {
    const [, path] = pathname.split('/');
    return path === 'admincrm';
};