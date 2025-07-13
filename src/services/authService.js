import {auth} from './api.js';
import {notifyShowToast} from "../utils/showToast";
import {singleRequest} from "./utils/requestUtils";


/** Выполняет вход пользователя. */
export const login = async (data, router) => {
  try {
    const result = await auth.login(data);

    if (result.status === 200) {
      notifyShowToast('success', result?.data?.message || 'Успешная авторизация.');
      router.push('/admincrm/booking/unconfirmed'); // Перенаправление после успешной авторизации
    } else {
      notifyShowToast('error', 'Ошибка при авторизации, попробуйте еще раз.');
    }
  } catch (error) {
    console.error("Ошибка при авторизации", error.response?.data || error.message);
    notifyShowToast('error', error.response?.data?.message || 'Ошибка сервера');
  }
};

/** Проверяет валидность токена и выполняет автоматическую авторизацию. */
export const checkToken = async (router, isLoginPage = false) => {
  if (isLoginPage) {
    notifyShowToast('info', 'Попытка автоматической авторизации.');
  }

  const result = await singleRequest(() => auth.validateToken());

  if (result.status === 200) {
    handleSuccessfulTokenCheck(result, router, isLoginPage);
  } else {
    handleFailedTokenCheck(result, router);
  }
};

/** Обрабатывает успешную проверку токена.*/
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

/** Обрабатывает неудачную проверку токена.*/
const handleFailedTokenCheck = (result, router) => {
  const errorMessage = result?.error || 'Проблема с токеном, пожалуйста, пройдите авторизацию.';
  notifyShowToast('error', errorMessage);
  console.debug(errorMessage);
  router.push('/admincrmlogin');
};

/** Выполняет вход пользователя. */
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

