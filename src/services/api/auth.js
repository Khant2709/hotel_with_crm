import {makeRequest} from "./makeRequest";


/** Выполняет вход админа.
 @param {Object} data - Данные для входа (например, логин и пароль).
 */
export const login = async (data) => makeRequest('post', '/login', data);

/** Проверяет валидность токена пользователя. */
export const validateToken = async () => makeRequest('post', '/login/validate', {});

/** Выполняет выход пользователя.
 @param {Object} data - Данные id админа.
 */
export const logout = async (data) => makeRequest('post', '/login/logout', data);

/** Выполняет вход на закрытые страницы. */
export const loginPage = async (data) => makeRequest('post', '/login/loginPage', data);