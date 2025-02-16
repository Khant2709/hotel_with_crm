import {auth} from './api.js';
import {notifyShowToast} from "../utils/showToast";

/**
 * Выполняет вход пользователя.
 * @param {Object} data - Данные для входа (логин и пароль).
 * @param {Object} router - Объект маршрутизатора.
 */
export const login = async (data, router) => {
    try {
        const result = await auth.login(data);

        if (result.status === 200) {
            notifyShowToast('success', result?.data?.message || 'Успешная авторизация.');
            router.push('/admincrm/bookingunconfirmed'); // Перенаправление после успешной авторизации
        } else {
            notifyShowToast('error', 'Ошибка при авторизации, попробуйте еще раз.');
        }
    } catch (error) {
        console.error("Ошибка при авторизации", error.response?.data || error.message);
        notifyShowToast('error', error.response?.data?.message || 'Ошибка сервера');
    }
};

/**
 * Проверяет валидность токена и выполняет автоматическую авторизацию.
 * @param {Object} router - Объект маршрутизатора (например, из Next.js).
 * @param {boolean} isLoginPage - Флаг, указывающий, что пользователь находится на странице входа.
 */
export const checkToken = async (router, isLoginPage = false) => {
    if (isLoginPage) {
        notifyShowToast('info', 'Попытка автоматической авторизации.');
    }

    const result = await auth.validateToken();

    if (result.status === 200) {
        handleSuccessfulTokenCheck(result, router, isLoginPage);
    } else {
        handleFailedTokenCheck(result, router);
    }
};

/**
 * Обрабатывает успешную проверку токена.
 * @param {Object} result - Результат запроса.
 * @param {Object} router - Объект маршрутизатора.
 * @param {boolean} isLoginPage - Флаг, указывающий, что пользователь находится на странице входа.
 */
const handleSuccessfulTokenCheck = (result, router, isLoginPage) => {
    if (isLoginPage) {
        notifyShowToast('success', 'Авторизация прошла успешно.');
        router.push('/admincrm/booking/unconfirmed');
    } else {
        if (result?.data?.refresh) {
            notifyShowToast('success', result?.data?.message || 'Токен успешно обновлен.');
            console.debug(result?.data?.message || 'Токен успешно обновлен.');
        }
    }
};

/**
 * Обрабатывает неудачную проверку токена.
 * @param {Object} result - Результат запроса.
 * @param {Object} router - Объект маршрутизатора.
 */
const handleFailedTokenCheck = (result, router) => {
    const errorMessage = result?.response?.data?.message || 'Проблема с токеном, пожалуйста, пройдите авторизацию.';
    notifyShowToast('error', errorMessage);
    console.debug(errorMessage);
    router.push('/admincrmlogin');
};

/** Выполняет вход пользователя.
 * @param {Object} id - Данные id админа.
 * @param {Object} router - Объект маршрутизатора.
 */
export const logout = async (id, router) => {
    try {
        const result = await auth.logout({id});

        if (result.status === 200) {
            notifyShowToast('success', result?.data?.message || 'Успешный выход.');
            router.push('/admincrmlogin'); // Перенаправление после успешной авторизации
        } else {
            notifyShowToast('error', 'Ошибка при выходе, попробуйте еще раз.');
        }
    } catch (error) {
        console.error("Ошибка при выходе", error.response?.data || error.message);
        notifyShowToast('error', error.response?.data?.message || 'Ошибка сервера');
    }
};

