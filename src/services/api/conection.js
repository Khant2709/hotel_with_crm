import { makeRequest } from "./makeRequest";

/** Отправляет сообщение админам (заявка обратный звонок).
 @param {Object} data - Данные (например, имя и номер).
 */
export const callBack = async (data) => makeRequest('post', '/connection/callback', data);