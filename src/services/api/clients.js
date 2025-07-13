import {makeRequest} from "./makeRequest";


/** Получает данные всех клиентов.*/
export const getAllClients = async () => makeRequest('get', '/clients');


/** Получает данные всех клиентов.*/
export const getCurrentClient = async (ph) => makeRequest('post', '/clients', {ph});

/** Скачивает файл с данными клиентов. */
export const clientsDownload = async () => makeRequest('get', '/clients/download', null, null, false, null, {responseType: 'blob'});